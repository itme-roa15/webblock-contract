---
name: "rewrite"
title: "Rewrite"
skill: "Copywriting"
group: "content"
order: 1
command: "/rewrite"
aliases: ["/rephrase"]
args: null
blocks: ["*"]
triggers: ["rewrite", "reword", "rephrase", "say it better", "clearer", "សរសេរឡើងវិញ", "សរសេរម្តងទៀត", "ឲ្យច្បាស់ជាងនេះ"]
mode: "change"
maxTokens: 600
summary: "Rewrites the text in clearer words. Same facts; never adds new ones."
summary_km: "សរសេរអត្ថបទឡើងវិញដោយពាក្យច្បាស់ជាងមុន។ ព័ត៌មាននៅដដែល មិនបន្ថែមព័ត៌មានថ្មីទេ។"
example: "/rewrite with @Hero"
example_km: "/rewrite ផ្នែក @Hero"
km_reviewed: false
---

## Rules

- Rewrite the text of the "@" blocks, or of the whole page when there are none: headings, eyebrows, descriptions,
  bodies, button labels, captions, FAQ answers, service texts and the Footer tagline.
- Keep the meaning and every fact, name, price and number exactly as they are; only the wording changes.
- Use plain, everyday words a customer understands at a glance: one idea per sentence, the main point first, and
  speak to the customer ("you", "we").
- Keep about the same length and stay within each prop's limit; a heading stays a short heading.
- Keep each button's action; its label may be reworded so it says where it goes ("Get directions", not "Click
  here").
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).
- Keep the language the text is in. Khmer stays Khmer.

## Examples

```json
{
  "message": "/rewrite",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Kampot Bean Café", "address": "Riverside Road, Kampot" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "eyebrow": "", "heading": "Welcome to the website of our coffee shop", "description": "We are a coffee shop that is selling coffee which comes from Mondulkiri and also we have cakes as well.", "primaryLabel": "Click here", "primaryAction": "directions" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I rewrote the Hero in clearer words and kept your facts. The button now says where it goes.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Mondulkiri coffee and cakes", "description": "Coffee from Mondulkiri, with cakes to enjoy alongside it.", "primaryLabel": "Get directions" } }
    ]
  }
}
```
