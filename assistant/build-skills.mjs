// Builds assistant/skills-<version>.json from the skill files (assistant/skills/*.md) and checks them, including
// every worked example against the editor catalog it names. The .md files are the source; the JSON is what
// ai-codegen-service and webblock-web-ui pin (like puck/catalog-<version>.json). No dependencies: plain Node 20+.
//
//   node assistant/build-skills.mjs           check, then write the index
//   node assistant/build-skills.mjs --check   check, and compare with the index on disk; exit 1 if different
//
// Frontmatter is YAML restricted so every value is one line of JSON (`key: "text"`, `key: ["a", "b"]`,
// `key: {"name": "language"}`), which any YAML reader and this script both read the same way.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SKILLS_VERSION = "0.1.0";
/** The editor catalog the worked examples are checked against. */
const CATALOG = "puck/catalog-0.2.0.json";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "assistant", "skills");
const OUT = path.join(ROOT, "assistant", `skills-${SKILLS_VERSION}.json`);
const GROUPS = ["design", "content", "utility"];
/**
 * The props whose catalog `default` is starter text the owner should replace ("Block.prop", or "Block.list.field"
 * for every item of a list). Their texts come from the catalog, never typed here: /check and /fill read them from
 * the index's `placeholders`, and the editor's pre-Deploy warning checks the same props.
 */
const PLACEHOLDER_PROPS = [
  "Hero.heading", "Hero.description", "Text.heading", "Text.body", "About.body",
  "Testimonials.items.quote", "Testimonials.items.name", "Stats.items.value", "Stats.items.label",
  "Services.items.title", "Services.items.text", "FAQ.items.answer", "CallToAction.body",
];
const MODES = ["change", "reply", "client"];
const FIELDS = {
  name: "string", title: "string", skill: "string", group: "string", order: "number", command: "string",
  aliases: "array", args: "object|null", blocks: "array", triggers: "array", mode: "string", maxTokens: "number|null",
  summary: "string", summary_km: "string", example: "string", example_km: "string", km_reviewed: "boolean",
};

const catalog = JSON.parse(readFileSync(path.join(ROOT, CATALOG), "utf8"));
const problems = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);
const kind = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);

function parse(file, text) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!match) return fail(file, "no frontmatter between --- lines"), null;
  const front = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const at = line.indexOf(": ");
    if (at < 1) { fail(file, `frontmatter line is not "key: <JSON>": ${line}`); continue; }
    try {
      front[line.slice(0, at)] = JSON.parse(line.slice(at + 2));
    } catch {
      fail(file, `frontmatter value of ${line.slice(0, at)} is not one line of JSON`);
    }
  }
  return { front, body: match[2] };
}

/** The section under "## <title>" up to the next "## ". */
const section = (body, title) => {
  const start = body.indexOf(`\n## ${title}\n`);
  if (start === -1 && !body.startsWith(`## ${title}\n`)) return null;
  const from = start === -1 ? `## ${title}\n`.length : start + `\n## ${title}\n`.length;
  const next = body.indexOf("\n## ", from);
  return body.slice(from, next === -1 ? undefined : next).trim();
};

/** The JSON Schema subset the catalog uses: type, enum, lengths, items, properties, required, pattern, anyOf. */
function valid(schema, value) {
  if (schema.anyOf) return schema.anyOf.some((s) => valid(s, value));
  const types = [schema.type].flat().filter(Boolean);
  const t = value === null ? "null" : Array.isArray(value) ? "array" : Number.isInteger(value) ? "integer" : typeof value;
  if (types.length && !types.includes(t) && !(t === "integer" && types.includes("number"))) return false;
  if (schema.enum && !schema.enum.includes(value)) return false;
  if (typeof value === "string") {
    if (schema.maxLength !== undefined && [...value].length > schema.maxLength) return false;
    if (schema.minLength !== undefined && [...value].length < schema.minLength) return false;
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) return false;
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) return false;
    if (schema.maximum !== undefined && value > schema.maximum) return false;
  }
  if (Array.isArray(value)) {
    if (schema.maxItems !== undefined && value.length > schema.maxItems) return false;
    if (schema.minItems !== undefined && value.length < schema.minItems) return false;
    if (schema.items && !value.every((v) => valid(schema.items, v))) return false;
  }
  if (t === "object" && schema.properties) {
    if ((schema.required ?? []).some((k) => !(k in value))) return false;
    for (const [k, v] of Object.entries(value)) {
      if (!schema.properties[k]) return schema.additionalProperties !== false;
      if (!valid(schema.properties[k], v)) return false;
    }
  }
  return true;
}

function checkExample(file, skill, example, n) {
  const where = `${file} example ${n}`;
  if (typeof example.message !== "string" || !example.output || typeof example.output.reply !== "string") {
    return fail(where, 'needs "message" and "output": {"reply", "operations"}');
  }
  const page = example.page ?? { root: { props: {} }, content: [] };
  const ops = example.output.operations ?? [];
  if (!Array.isArray(ops)) return fail(where, "operations must be a list");
  if (skill.mode !== "change" && ops.length > 0) fail(where, `a ${skill.mode} skill proposes no operations`);
  const refs = (example.refs ?? []).map((r) => r.id);
  for (const ref of example.refs ?? []) {
    if (!page.content.some((b) => b.props.id === ref.id && b.type === ref.type)) fail(where, `ref ${ref.id} is not on the example page`);
  }
  const typeOf = (id) => page.content.find((b) => b.props.id === id)?.type;
  for (const op of ops) {
    const id = op.component_id;
    if (refs.length && id && id !== "root" && !refs.includes(id) && !example.touchesMore) {
      fail(where, `${op.op} touches ${id}, which is not an @ block (set "touchesMore": true when the request asks for more)`);
    }
    if (op.op === "UPDATE") {
      const component = id === "root" ? catalog.root : catalog.components[typeOf(id)];
      if (!component) { fail(where, `UPDATE of ${id}, which is not on the example page`); continue; }
      if (id !== "root" && !catalog.components[typeOf(id)].aiOperations.includes("UPDATE")) fail(where, `UPDATE is not allowed on ${typeOf(id)}`);
      for (const [prop, value] of Object.entries(op.props ?? {})) {
        const spec = component.props[prop];
        if (!spec) fail(where, `${id}.${prop} is not a prop`);
        else if (spec.ai === "none") fail(where, `${id}.${prop} is ai "none" (${spec.flag}): the assistant never writes it`);
        else if (!valid(spec.schema, value)) fail(where, `${id}.${prop} breaks its rule: ${JSON.stringify(value)}`);
      }
    } else if (op.op === "ADD") {
      const component = catalog.components[op.component_type];
      if (!component) { fail(where, `ADD of unknown type ${op.component_type}`); continue; }
      if (!component.aiOperations.includes("ADD")) fail(where, `the assistant may not ADD ${op.component_type}`);
      for (const [prop, spec] of Object.entries(component.props)) {
        const value = op.props?.[prop];
        if (value === undefined) { if (spec.required) fail(where, `ADD ${op.component_type} lacks ${prop}`); continue; }
        if (!valid(spec.schema, value)) fail(where, `ADD ${op.component_type}.${prop} breaks its rule: ${JSON.stringify(value)}`);
      }
      for (const prop of Object.keys(op.props ?? {})) if (!component.props[prop]) fail(where, `ADD ${op.component_type}.${prop} is not a prop`);
    } else if (op.op === "REMOVE" || op.op === "MOVE") {
      const type = typeOf(id);
      if (!type) fail(where, `${op.op} of ${id}, which is not on the example page`);
      else if (!catalog.components[type].aiOperations.includes(op.op)) fail(where, `${op.op} is not allowed on ${type}`);
    } else {
      fail(where, `unknown op ${op.op}`);
    }
  }
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".md")).sort();
const skills = [];
for (const name of files) {
  const file = `assistant/skills/${name}`;
  const parsed = parse(file, readFileSync(path.join(DIR, name), "utf8"));
  if (!parsed) continue;
  const { front, body } = parsed;
  for (const [key, type] of Object.entries(FIELDS)) {
    if (!(key in front)) fail(file, `missing ${key}`);
    else if (!type.split("|").includes(kind(front[key]))) fail(file, `${key} must be ${type}`);
  }
  for (const key of Object.keys(front)) if (!(key in FIELDS)) fail(file, `unknown field ${key}`);
  if (front.name !== name.replace(/\.md$/, "")) fail(file, "name must match the file name");
  if (!/^[a-z][a-z0-9-]{0,29}$/.test(front.name ?? "")) fail(file, "name: lowercase letters, digits, -");
  if (front.command !== `/${front.name}`) fail(file, `command must be /${front.name}`);
  if (!GROUPS.includes(front.group)) fail(file, `group is one of ${GROUPS.join(", ")}`);
  if (!MODES.includes(front.mode)) fail(file, `mode is one of ${MODES.join(", ")}`);
  if ([...(front.summary ?? "")].length > 80) fail(file, "summary is longer than 80 characters");
  if ([...(front.summary_km ?? "")].length > 120) fail(file, "summary_km is longer than 120 characters");
  if (front.mode === "client" ? front.maxTokens !== null : !(front.maxTokens >= 300 && front.maxTokens <= 800)) {
    fail(file, "maxTokens is 300–800 (null for a client skill)");
  }
  if (front.args && !(typeof front.args.name === "string" && typeof front.args.hint === "string" && typeof front.args.required === "boolean")) {
    fail(file, 'args is null or {"name", "hint", "hint_km", "required"}');
  }
  for (const type of front.blocks ?? []) if (type !== "*" && !catalog.components[type]) fail(file, `blocks: unknown type ${type}`);
  const rules = section(body, "Rules");
  if (!rules) fail(file, 'no "## Rules" section');
  const examplesText = section(body, "Examples") ?? "";
  const examples = [...examplesText.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m, i) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      fail(file, `example ${i + 1} is not valid JSON`);
      return null;
    }
  }).filter(Boolean);
  if (front.mode !== "client" && examples.length < 1) fail(file, "needs at least one worked example");
  examples.forEach((example, i) => checkExample(file, front, example, i + 1));
  skills.push({ ...front, rules: rules ?? "", examples });
}

const seen = new Map();
for (const skill of skills) {
  for (const command of [skill.command, ...(skill.aliases ?? [])]) {
    if (seen.has(command)) fail(`assistant/skills/${skill.name}.md`, `${command} is also ${seen.get(command)}`);
    seen.set(command, skill.name);
  }
}

// The starter texts, from the catalog's defaults: a listed prop without a starter text there fails the build.
const placeholders = [];
for (const where of PLACEHOLDER_PROPS) {
  const [block, prop, field] = where.split(".");
  const value = catalog.components[block]?.props[prop]?.default;
  const texts = field ? (Array.isArray(value) ? value.map((item) => item?.[field]) : []) : [value];
  const found = [...new Set(texts.filter((t) => typeof t === "string" && t.trim()))];
  if (found.length === 0) fail(CATALOG, `${where} has no starter text in its default (PLACEHOLDER_PROPS in assistant/build-skills.mjs)`);
  for (const text of found) placeholders.push({ prop: where, text });
}

// A skill's rules point at the placeholders list instead of quoting starter texts, so they can't drift.
for (const skill of skills) {
  for (const { text } of placeholders) {
    if (text.length > 6 && skill.rules.includes(text)) fail(`assistant/skills/${skill.name}.md`, `its rules quote the starter text "${text}"; refer to the index's placeholders instead`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s) in the skill files.`);
  process.exit(1);
}

skills.sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.order - b.order || a.name.localeCompare(b.name));
const index = {
  version: SKILLS_VERSION,
  catalog: CATALOG,
  base: readFileSync(path.join(ROOT, "assistant", "rules.md"), "utf8").trim(),
  groups: [
    { name: "design", title: "Design", title_km: "រចនា" },
    { name: "content", title: "Content", title_km: "ខ្លឹមសារ" },
    { name: "utility", title: "Utility", title_km: "ជំនួយ" },
  ],
  labels: JSON.parse(readFileSync(path.join(ROOT, "assistant", "labels.json"), "utf8")),
  placeholders,
  skills,
};
const json = `${JSON.stringify(index, null, 2)}\n`;
const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : null;
if (process.argv.includes("--check")) {
  if (current === json) console.log(`OK: ${path.relative(ROOT, OUT)} matches the ${skills.length} skill files.`);
  else { console.error(current === null ? `Missing: ${path.relative(ROOT, OUT)}` : `Different: ${path.relative(ROOT, OUT)}; run node assistant/build-skills.mjs`); process.exit(1); }
} else {
  writeFileSync(OUT, json);
  console.log(`Wrote ${path.relative(ROOT, OUT)}: ${skills.length} skills.`);
}
