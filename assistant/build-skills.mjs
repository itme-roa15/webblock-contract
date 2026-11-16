// Builds assistant/skills-<version>.json from the skill files (assistant/skills/*.md) and checks them, including
// every worked example against the editor catalog it names. The .md files are the source; the JSON is what
// ai-codegen-service and webblock-web-ui pin (like puck/catalog-<version>.json). No dependencies: plain Node 20+.
//
//   node assistant/build-skills.mjs           check, then write the index
//   node assistant/build-skills.mjs --check   check, and compare with the index on disk; exit 1 if different
//   ... --skills <dir>                        read the skill files from <dir> instead of assistant/skills (drafts,
//                                             checked before they are installed); the index is the same either way
//
// Frontmatter is YAML restricted so every value is one line of JSON (`key: "text"`, `key: ["a", "b"]`,
// `key: {"name": "language"}`), which any YAML reader and this script both read the same way.
//
// A released index never changes: skills-0.1.0.json (catalog 0.2.0) and skills-0.2.0.json (catalog 0.3.0) stay as
// they were released, and this script now builds skills-0.3.0.json against catalog 0.4.0, whose root palette has ten
// more values (README "Editor component catalog", 0.4.0).
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SKILLS_VERSION = "0.3.0";
/** The editor catalog the worked examples are checked against. */
const CATALOG = "puck/catalog-0.4.0.json";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_ARG = process.argv.indexOf("--skills");
const DIR = SKILLS_ARG === -1 ? path.join(ROOT, "assistant", "skills") : path.resolve(process.argv[SKILLS_ARG + 1] ?? "");
const OUT = path.join(ROOT, "assistant", `skills-${SKILLS_VERSION}.json`);
const GROUPS = ["design", "content", "utility"];
/**
 * The props whose catalog `default` is starter text the owner should replace ("Block.prop", or "Block.list.field"
 * for every item of a list). Their texts come from the catalog, never typed here: /check and /fill read them from
 * the index's `placeholders`, and the editor's pre-Deploy warning checks the same props. A rich text default
 * (RichText.body) gives one entry per text run of its doc.
 */
const PLACEHOLDER_PROPS = [
  "Hero.heading", "Hero.description", "Text.heading", "Text.body", "About.body",
  "Testimonials.items.quote", "Testimonials.items.name", "Stats.items.value", "Stats.items.label",
  "Services.items.title", "Services.items.text", "FAQ.items.answer", "CallToAction.body",
  "Heading.text", "RichText.body", "ImageBanner.heading", "ImageBanner.body", "Quote.quote", "Quote.author",
];
const MODES = ["change", "reply", "client"];
const FIELDS = {
  name: "string", title: "string", skill: "string", group: "string", order: "number", command: "string",
  aliases: "array", args: "object|null", blocks: "array", triggers: "array", mode: "string", maxTokens: "number|null",
  summary: "string", summary_km: "string", example: "string", example_km: "string", km_reviewed: "boolean",
};
/** The keys of an example, and of each operation in its output (AI Codegen's assistant answer). */
const EXAMPLE_KEYS = ["message", "refs", "page", "catalog", "touchesMore", "output"];
const OP_KEYS = {
  ADD: ["op", "component_type", "ref", "position", "index", "props"],
  UPDATE: ["op", "component_id", "props"],
  MOVE: ["op", "component_id", "position", "index"],
  REMOVE: ["op", "component_id"],
};
/** A name the model gives a block it adds, for later positions' parentId (README 0.3.0, nested operations). */
const REF = /^[a-z][a-z0-9-]{0,39}$/;
const PRODUCT_BLOCKS = ["ProductCards", "AllProducts"];

const catalog = JSON.parse(readFileSync(path.join(ROOT, CATALOG), "utf8"));
const { components } = catalog;
const problems = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);
const kind = (v) => (v === null ? "null" : Array.isArray(v) ? "array" : typeof v);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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

/**
 * The JSON Schema subset the catalog uses: type, const, enum, lengths, pattern, minimum/maximum, items, item counts,
 * uniqueItems, properties, required, additionalProperties, anyOf. Lengths count UTF-16 code units, as the editor and
 * AI Codegen do (README "Patterns", Lengths); a pattern matches the whole string (the catalog's are anchored).
 */
function valid(schema, value) {
  if (schema.anyOf && !schema.anyOf.some((s) => valid(s, value))) return false;
  const types = [schema.type].flat().filter(Boolean);
  const t = value === null ? "null" : Array.isArray(value) ? "array" : Number.isInteger(value) ? "integer" : typeof value;
  if (types.length && !types.includes(t) && !(t === "integer" && types.includes("number"))) return false;
  if ("const" in schema && !same(schema.const, value)) return false;
  if (schema.enum && !schema.enum.some((e) => same(e, value))) return false;
  if (typeof value === "string") {
    if (schema.maxLength !== undefined && value.length > schema.maxLength) return false;
    if (schema.minLength !== undefined && value.length < schema.minLength) return false;
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) return false;
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) return false;
    if (schema.maximum !== undefined && value > schema.maximum) return false;
  }
  if (Array.isArray(value)) {
    if (schema.maxItems !== undefined && value.length > schema.maxItems) return false;
    if (schema.minItems !== undefined && value.length < schema.minItems) return false;
    if (schema.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) return false;
    if (schema.items && !value.every((v) => valid(schema.items, v))) return false;
  }
  if (t === "object") {
    if ((schema.required ?? []).some((k) => !(k in value))) return false;
    for (const [k, v] of Object.entries(value)) {
      const spec = schema.properties?.[k];
      if (spec) { if (!valid(spec, v)) return false; }
      else if (schema.additionalProperties === false) return false;
      else if (typeof schema.additionalProperties === "object" && !valid(schema.additionalProperties, v)) return false;
    }
  }
  return true;
}

// ---- The page tree (catalog 0.3.0): containers hold blocks in their slot props, at any depth. ----

const slotsOf = (type) => components[type]?.slots ?? {};
/** Every block of a list and of its containers' slots: {block, list, index, depth, parent, slot}. */
function* blocksIn(list, depth = 1, parent = null, slot = null) {
  for (const [index, block] of (Array.isArray(list) ? list : []).entries()) {
    yield { block, list, index, depth, parent, slot };
    for (const name of Object.keys(slotsOf(block?.type))) yield* blocksIn(block.props?.[name], depth + 1, block, name);
  }
}
const find = (page, id) => [...blocksIn(page.content)].find((at) => at.block.props?.id === id) ?? null;
/** The ids of a block's descendants. */
const descendants = (block) => [...blocksIn(Object.keys(slotsOf(block.type)).flatMap((s) => block.props?.[s] ?? []))]
  .map((at) => at.block.props?.id);
/** The block types a slot takes: its `allow` list, or "any" (every type that is not topLevelOnly) minus `disallow`. */
const allows = (rule) => (rule.allow === "any"
  ? Object.keys(components).filter((t) => !components[t].topLevelOnly && !(rule.disallow ?? []).includes(t))
  : rule.allow);

/** The text runs of a rich text node, at any depth. */
const textRuns = (node) => (node?.type === "text" ? [node] : (Array.isArray(node?.content) ? node.content.flatMap(textRuns) : []));
const isDoc = (value) => value !== null && typeof value === "object" && value.type === "doc";

/**
 * The links a written value holds (page.links.appliesTo): Buttons items, the ImageBanner button, rich text hrefs, and
 * the root's links that appliesTo names (telegramUrl, and the 0.2.0 social links facebookUrl and instagramUrl).
 */
function linksOf(type, prop, value) {
  if (type === "Buttons" && prop === "items" && Array.isArray(value)) return value.map((item) => item?.link);
  if (type === "ImageBanner" && prop === "buttonLink") return [value];
  if (type === "RichText" && prop === "body") {
    return textRuns(value).flatMap((run) => (run.marks ?? []).filter((m) => m?.type === "link").map((m) => m.attrs?.href));
  }
  if (type === "root" && catalog.page.links.appliesTo.includes(`root.${prop}`)) return [value];
  return [];
}
/** The authority of an https:// link: the text up to the first "/", "?" or "#" (a backslash does not end it). */
const authorityOf = (link) => (typeof link === "string" && link.startsWith("https://") ? /^https:\/\/([^/?#]*)/.exec(link)[1] : null);
/**
 * Whether a link's host is blocked (page.links.blockedHosts, suffix match). The host is cut by hand, as every reader
 * cuts it (README "No WhatsApp"): the text between https:// and the first ":", "/", "?" or "#", lower-case, without a
 * trailing dot. Never a URL parser's host: a social link whose authority could read differently is refused first.
 */
const blocked = (link) => {
  const authority = authorityOf(link);
  if (authority === null) return false;
  const host = authority.split(":")[0].toLowerCase().replace(/\.$/, "");
  return catalog.page.links.blockedHosts.some((entry) => host === entry || host.endsWith(`.${entry}`));
};
/** The root's 0.2.0 social links, whose looser pattern lets userinfo, "%", a backslash and non-ASCII through. */
const SOCIAL_LINKS = ["facebookUrl", "instagramUrl"];
/** The social links' host rule (README "No WhatsApp"): every reader refuses an authority holding @, %, a backslash or
 * a non-ASCII character, so no URL parser decides which host it is. */
const unclearAuthority = (link) => /[@%\\]|[^\x00-\x7f]/.test(authorityOf(link) ?? "");
/** The whole https:// addresses a text holds (a trailing full stop, comma or the like is not part of one). */
const addressesIn = (text) => (String(text).match(/https:\/\/[^\s"'<>()[\]{}]+/g) ?? []).map((a) => a.replace(/[.,;:!?]+$/, ""));
/** Every string of a JSON value, at any depth. */
const stringsIn = (value) => (typeof value === "string" ? [value]
  : value && typeof value === "object" ? Object.values(value).flatMap(stringsIn) : []);

/** Checks on a value the example writes, beyond its schema: links, rich text rules, the products binding. */
function checkWritten(where, example, type, prop, value, current) {
  const said = new Set([example.message, ...stringsIn(example.page ?? {})].flatMap(addressesIn));
  const links = linksOf(type, prop, value);
  if ([...links, ...(/Action$/.test(prop) ? [value] : [])].includes("telegram") && !example.page?.root?.props?.telegramUrl) {
    fail(where, `${type}.${prop} uses the telegram action on a page without root.telegramUrl (ask the owner for their Telegram link)`);
  }
  for (const link of links) {
    if (type === "root" && SOCIAL_LINKS.includes(prop) && unclearAuthority(link)) {
      fail(where, `root.${prop}: its address holds @, %, a backslash or a non-ASCII character before its first /, ? or # (the social links' host rule): ${link}`);
    } else if (blocked(link)) fail(where, `${type}.${prop} links to a blocked host (page.links.blockedHosts): ${link}`);
    else if (typeof link === "string" && link.startsWith("https://") && !said.has(link)) {
      fail(where, `${type}.${prop} links to ${link}, which neither the message nor the page holds (never invent an address)`);
    }
  }
  if (type === "RichText" && prop === "body" && isDoc(value)) {
    const runs = textRuns(value);
    const units = runs.reduce((sum, run) => sum + (typeof run.text === "string" ? run.text.length : 0), 0);
    if (units > catalog.richText.maxTextLength) fail(where, `RichText.body holds ${units} UTF-16 units of text (at most ${catalog.richText.maxTextLength})`);
    if (catalog.richText.marksOncePerRun && runs.some((run) => new Set((run.marks ?? []).map((m) => m?.type)).size !== (run.marks ?? []).length)) {
      fail(where, "RichText.body has a run that carries a mark type twice (richText.marksOncePerRun)");
    }
  }
  if (PRODUCT_BLOCKS.includes(type)) {
    if (prop === "source" && value === "picked" && !(current.productIds ?? []).length) {
      fail(where, `${type}.source "picked" needs the owner's picks first (productIds is empty): send the owner to the editor's picker`);
    }
    if ((prop === "category" || prop === "defaultCategory") && value) {
      const known = websiteCategories(example);
      if (known && !known.has(String(value).toLowerCase())) fail(where, `${type}.${prop} "${value}" is not a category of the website's catalog`);
      if (!known && String(value).toLowerCase() !== String(current[prop] ?? "").toLowerCase()) {
        fail(where, `${type}.${prop} "${value}": without the website's categories (catalog.categories) only the block's own current value is allowed, never a copy from another block or a sample category`);
      }
    }
  }
}

/** The website's categories, lower-cased (names match ignoring case): the example's `catalog.categories`, what AI
 * Codegen gives with the page. null when it gives none (README "Where AI Codegen gets the category names"). */
function websiteCategories(example) {
  return Array.isArray(example.catalog?.categories) ? new Set(example.catalog.categories.map((c) => String(c).toLowerCase())) : null;
}

/** A product block after an UPDATE that sets what it shows: it must still show products (README "Products to show"). */
function checkShows(where, example, id, type, current, written) {
  if (current.source === "category") {
    const known = websiteCategories(example);
    if (!current.category) fail(where, `${id} would show no products: source "category" needs a category`);
    else if (known && !known.has(String(current.category).toLowerCase())) {
      fail(where, `${id} would show no products: its category "${current.category}" is not a category of the website's catalog`);
    }
    if (type === "AllProducts" && "defaultCategory" in written && written.defaultCategory) {
      fail(where, `${id}: with source "category" All products shows no tabs and ignores defaultCategory`);
    }
  }
  const gone = example.catalog?.goneProductIds;
  if (current.source === "picked" && Array.isArray(gone) && (current.productIds ?? []).every((pid) => gone.includes(pid))) {
    fail(where, `${id} would show no products: every pick is in catalog.goneProductIds (send the owner to the picker)`);
  }
}

/** The catalog's tree rules on a page (README 0.3.0: checked once, on the final tree of a change set). */
function checkTree(where, page) {
  const all = [...blocksIn(page.content)];
  const rules = catalog.page;
  if (page.content.length > rules.topLevelLimit) fail(where, `${page.content.length} blocks at the top level (at most ${rules.topLevelLimit})`);
  if (all.length > rules.blockLimit) fail(where, `${all.length} blocks in all (at most ${rules.blockLimit})`);
  if (page.zones !== undefined && !same(page.zones, {})) fail(where, "zones must be absent or {}");
  const counts = {};
  const ids = new Set();
  for (const { block, depth, parent, slot } of all) {
    const component = components[block?.type];
    if (!component) { fail(where, `unknown block type ${block?.type}`); continue; }
    counts[block.type] = (counts[block.type] ?? 0) + 1;
    const id = block.props?.id;
    if (!valid(rules.blockId.schema, id)) fail(where, `a ${block.type} has no valid props.id`);
    else if (ids.has(id)) fail(where, `block id ${id} is used twice`);
    ids.add(id);
    if (depth > rules.maxDepth) fail(where, `${id} sits at depth ${depth} (at most ${rules.maxDepth})`);
    if (component.topLevelOnly && depth > 1) fail(where, `${block.type} stays at the top level`);
    if (parent && !allows(slotsOf(parent.type)[slot]).includes(block.type)) fail(where, `${parent.type}.${slot} doesn't take ${block.type}`);
    for (const [name, rule] of Object.entries(slotsOf(block.type))) {
      const children = block.props?.[name] ?? [];
      if (!Array.isArray(children)) { fail(where, `${id}.${name} is a slot: a list of blocks`); continue; }
      if (children.length < rule.minItems || children.length > rule.maxItems) fail(where, `${id}.${name} holds ${children.length} blocks (${rule.minItems}–${rule.maxItems})`);
      const when = rule.activeWhen;
      const value = block.props?.[when?.prop] ?? component.props[when?.prop]?.default;
      if (when && children.length && !when.in.includes(value)) fail(where, `${id}.${name} is not in use with ${when.prop} ${value}: empty it first`);
    }
    if (block.type === "Image" && block.props?.imageUrl && !block.props?.decorative && !block.props?.alt) {
      fail(where, `${id}: a set picture needs its alt (or decorative true)`);
    }
    if (block.type === "LogoStrip" && (block.props?.logos ?? []).some((l) => l?.imageUrl && !l?.alt)) fail(where, `${id}: every logo needs its alt`);
  }
  for (const [type, n] of Object.entries(counts)) {
    if (n > components[type].maxPerPage) fail(where, `${n} ${type} blocks (at most ${components[type].maxPerPage} a page, at every depth)`);
  }
  const last = page.content.findIndex((b) => b?.type === rules.lastBlock);
  if (last !== -1 && last !== page.content.length - 1) fail(where, `the ${rules.lastBlock} is not the last top-level block`);
  const anchors = all.filter(({ block }) => block.type === rules.anchors.block && block.props?.[rules.anchors.prop]).map(({ block }) => block.props[rules.anchors.prop]);
  if (new Set(anchors).size !== anchors.length || anchors.some((a) => rules.anchors.reserved.includes(a))) fail(where, "anchorIds must be unique and not reserved");
}

/**
 * Where an ADD or MOVE puts its block: the target list and index (README 0.3.0, nested operations). With "@" blocks
 * (and no touchesMore) the target is an "@" block or one inside it, or a block added earlier in the set: never the
 * top level or another container. A MOVE may also keep its block in the list it came from (`from`: its original
 * parent id, null at the top level, and slot), as a reorder of an "@" block in its own list or in its own parent does.
 */
function target(where, op, work, refs, moving, scope, example, from = null) {
  if (op.position !== undefined && op.index !== undefined) return fail(where, `${op.op}: give the index inside "position", not both`), null;
  const position = op.position ?? (op.index !== undefined ? { index: op.index } : op.op === "ADD" ? {} : null);
  if (!position || typeof position !== "object" || Object.keys(position).some((k) => !["parentId", "slot", "index"].includes(k))) {
    return fail(where, `${op.op}: position is {parentId, slot, index}`), null;
  }
  let list = work.content;
  const parentId = position.parentId ?? null;
  const resolved = parentId === null ? null : refs.get(parentId) ?? parentId;
  // A MOVE back into its own list stays where the request put it: in scope whatever that list is.
  const staysInItsList = from !== null && from.parentId === resolved && from.slot === (position.slot ?? null);
  const outOfScope = scope.size > 0 && !example.touchesMore && !staysInItsList;
  if (parentId === null) {
    if (position.slot != null) return fail(where, `${op.op}: a top-level position has no slot`), null;
    if (outOfScope) fail(where, `${op.op} puts a block at the top level, outside the @ blocks (set "touchesMore": true when the request asks for more)`);
  } else {
    const id = resolved;
    // Into an "@" container or a block inside one (so a block moved inside its own "@" container stays in scope), or
    // into a block added earlier in the set.
    if (outOfScope && !scope.has(id) && ![...refs.values()].includes(id)) {
      fail(where, `${op.op} puts a block into ${parentId}, which is not an @ block or inside one (set "touchesMore": true when the request asks for more)`);
    }
    if (moving && (id === moving.props.id || descendants(moving).includes(id))) return fail(where, "MOVE into the moved block's own subtree"), null;
    const at = find(work, id);
    if (!at) return fail(where, `${op.op}: no container ${parentId} (a ref must be named by an earlier ADD)`), null;
    if (!slotsOf(at.block.type)[position.slot]) return fail(where, `${op.op}: ${position.slot} is not a slot of ${at.block.type}`), null;
    list = at.block.props[position.slot] ??= [];
  }
  const index = position.index ?? list.length;
  if (!Number.isInteger(index) || index < 0 || index > list.length) return fail(where, `${op.op}: index ${index} is past the end of its list (${list.length})`), null;
  return { list, index };
}

function checkExample(file, skill, example, n) {
  const where = `${file} example ${n}`;
  if (typeof example.message !== "string" || !example.output || typeof example.output.reply !== "string") {
    return fail(where, 'needs "message" and "output": {"reply", "operations"}');
  }
  for (const key of Object.keys(example)) if (!EXAMPLE_KEYS.includes(key)) fail(where, `unknown key ${key}`);
  if (example.catalog !== undefined) {
    // What AI Codegen gives with the page, from Project's internal page read (README "Products to show").
    const given = example.catalog;
    const { categories = [], goneProductIds = [] } = given ?? {};
    if (!given || typeof given !== "object" || Object.keys(given).some((k) => !["categories", "goneProductIds"].includes(k))
      || !Array.isArray(categories) || !categories.every((c) => typeof c === "string")
      || !Array.isArray(goneProductIds) || !goneProductIds.every((pid) => valid(catalog.patterns.productId, pid))) {
      fail(where, 'catalog is {"categories": [names], "goneProductIds": [product ids]}');
    }
  }
  const page = example.page ?? { root: { props: {} }, content: [] };
  const work = structuredClone(page);
  const ops = example.output.operations ?? [];
  if (!Array.isArray(ops)) return fail(where, "operations must be a list");
  if (skill.mode !== "change" && ops.length > 0) fail(where, `a ${skill.mode} skill proposes no operations`);
  // "@" blocks: with "@" on a container, its descendants are in scope too.
  const scope = new Set();
  for (const ref of example.refs ?? []) {
    const at = find(page, ref.id);
    if (!at || at.block.type !== ref.type) { fail(where, `ref ${ref.id} is not on the example page`); continue; }
    scope.add(ref.id);
    for (const id of descendants(at.block)) scope.add(id);
  }
  const refs = new Map();
  let added = 0;
  for (const op of ops) {
    const id = op.component_id;
    if (!OP_KEYS[op.op]) { fail(where, `unknown op ${op.op}`); continue; }
    for (const key of Object.keys(op)) if (!OP_KEYS[op.op].includes(key)) fail(where, `${op.op} has no key ${key}`);
    if (scope.size && id && id !== "root" && !scope.has(id) && !example.touchesMore) {
      fail(where, `${op.op} touches ${id}, which is not an @ block or inside one (set "touchesMore": true when the request asks for more)`);
    }
    if (op.op === "UPDATE") {
      const at = id === "root" ? null : find(work, id);
      const component = id === "root" ? catalog.root : components[at?.block.type];
      if (!component) { fail(where, `UPDATE of ${id}, which is not on the example page`); continue; }
      const type = id === "root" ? "root" : at.block.type;
      if (id !== "root" && !component.aiOperations.includes("UPDATE")) fail(where, `UPDATE is not allowed on ${type}`);
      const current = id === "root" ? ((work.root ??= {}).props ??= {}) : at.block.props;
      for (const [prop, value] of Object.entries(op.props ?? {})) {
        const spec = component.props[prop];
        if (component.slots?.[prop]) fail(where, `${id}.${prop} is a slot: a container's children change only through ADD, MOVE and REMOVE`);
        else if (!spec) fail(where, `${id}.${prop} is not a prop`);
        else if (spec.ai === "none") fail(where, `${id}.${prop} is ai "none" (${spec.flag}): the assistant never writes it`);
        else if (!valid(spec.schema, value)) fail(where, `${id}.${prop} breaks its rule: ${JSON.stringify(value)}`);
        else checkWritten(where, example, type, prop, value, current);
      }
      Object.assign(current, op.props ?? {});
      if (PRODUCT_BLOCKS.includes(type) && ["source", "category", "defaultCategory"].some((k) => k in (op.props ?? {}))) {
        checkShows(where, example, id, type, current, op.props);
      }
    } else if (op.op === "ADD") {
      const type = op.component_type;
      const component = components[type];
      if (!component) { fail(where, `ADD of unknown type ${type}`); continue; }
      if (!component.aiOperations.includes("ADD")) fail(where, `the assistant may not ADD ${type}`);
      const defaults = component.addDefaults ?? {};
      for (const [prop, spec] of Object.entries(component.props)) {
        const value = op.props?.[prop];
        if (value === undefined) {
          if (spec.required && !(spec.ai === "none" && prop in defaults)) fail(where, `ADD ${type} lacks ${prop}`);
          continue;
        }
        if (spec.ai === "none" && !same(value, defaults[prop])) fail(where, `ADD ${type}.${prop} is ai "none" (${spec.flag}): keep its addDefaults value or leave it out`);
        else if (!valid(spec.schema, value)) fail(where, `ADD ${type}.${prop} breaks its rule: ${JSON.stringify(value)}`);
        else checkWritten(where, example, type, prop, value, {});
      }
      for (const [prop, value] of Object.entries(op.props ?? {})) {
        if (slotsOf(type)[prop]) { if (!same(value, [])) fail(where, `ADD ${type}.${prop}: a new container starts empty (ADD or MOVE blocks into it)`); }
        else if (!component.props[prop]) fail(where, `ADD ${type}.${prop} is not a prop`);
      }
      if (op.ref !== undefined && (typeof op.ref !== "string" || !REF.test(op.ref) || refs.has(op.ref) || find(work, op.ref) || find(page, op.ref))) {
        fail(where, `ADD ref ${JSON.stringify(op.ref)} must be a new short name (${REF.source})`);
      }
      const place = target(where, op, work, refs, null, scope, example);
      if (!place) continue;
      const newId = `added-${++added}`;
      if (typeof op.ref === "string") refs.set(op.ref, newId);
      const block = { type, props: { ...structuredClone(defaults), ...structuredClone(op.props ?? {}), id: newId } };
      for (const slot of Object.keys(slotsOf(type))) block.props[slot] ??= [];
      place.list.splice(place.index, 0, block);
    } else {
      const at = find(work, id);
      if (!at) { fail(where, `${op.op} of ${id}, which is not on the example page`); continue; }
      if (!components[at.block.type].aiOperations.includes(op.op)) fail(where, `${op.op} is not allowed on ${at.block.type}`);
      // Where the moved block came from, before it is taken out: its parent's id (null at the top level) and slot.
      const from = { parentId: at.parent?.props?.id ?? null, slot: at.slot ?? null };
      at.list.splice(at.index, 1);
      if (op.op === "MOVE") {
        const place = target(where, op, work, refs, at.block, scope, example, from);
        if (place) place.list.splice(place.index, 0, at.block);
      }
    }
  }
  checkTree(where, work);
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
  if (front.mode === "client" ? front.maxTokens !== null : !(front.maxTokens >= 300 && front.maxTokens <= 2000)) {
    fail(file, "maxTokens is 300–2000 (null for a client skill)");
  }
  if (front.args && !(typeof front.args.name === "string" && typeof front.args.hint === "string" && typeof front.args.required === "boolean")) {
    fail(file, 'args is null or {"name", "hint", "hint_km", "required"}');
  }
  for (const type of front.blocks ?? []) if (type !== "*" && !components[type]) fail(file, `blocks: unknown type ${type}`);
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

// The starter texts, from the catalog's defaults: a listed prop without a starter text there fails the build. A rich
// text default gives each of its text runs (a block still holds starter text when any run in its tree equals one).
const placeholders = [];
for (const where of PLACEHOLDER_PROPS) {
  const [block, prop, field] = where.split(".");
  const value = components[block]?.props[prop]?.default;
  const texts = field
    ? (Array.isArray(value) ? value.map((item) => item?.[field]) : [])
    : isDoc(value) ? textRuns(value).map((run) => run.text) : [value];
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
