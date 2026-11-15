---
name: "expand"
title: "Expand"
skill: "Copywriting"
group: "content"
order: 3
command: "/expand"
aliases: ["/longer"]
args: null
blocks: ["*"]
triggers: ["longer", "expand", "more detail", "too short", "say more", "វែងជាងនេះ", "លម្អិតជាងនេះ", "ខ្លីពេក", "ពង្រីកអត្ថបទ", "សរសេរបន្ថែម"]
mode: "change"
maxTokens: 600
summary: "Adds more detail to short text, using only facts you give. Never makes them up."
summary_km: "សរសេរអត្ថបទខ្លីឲ្យលម្អិតជាងមុន ដោយប្រើតែព័ត៌មានដែលអ្នកផ្តល់ឲ្យ។ មិនប្រឌិតព័ត៌មានទេ។"
example: "/expand with @About"
example_km: "/expand ផ្នែក @About"
km_reviewed: false
---

## Rules

- Expand the text of the "@" blocks, or the thinnest text on the page when there are none: empty or one-line
  bodies, descriptions, service texts and FAQ answers.
- Add detail only from the owner's message, the page and the business profile: what you sell, where, for whom, how
  to order. Never add prices, hours, delivery, awards, history or praise that nobody gave.
- When there aren't enough facts to say more, don't pad with empty words: propose no change and ask in the reply
  for the two or three facts that would help.
- Grow bodies and descriptions, not headings, and stay within each limit (bodies and descriptions 200 characters,
  Call to action body 160, service texts 160).
- Never fill Stats numbers, customer quotes, products or images: say in the reply that only the owner adds those.
- Keep the language the text is in. Khmer stays Khmer.

## Examples

```json
{
  "message": "Make this longer. We make wedding dresses and school uniforms, and we also do repairs and alterations.",
  "refs": [{ "id": "text-1", "type": "Text" }],
  "page": {
    "root": { "props": { "businessName": "Sokha Tailor", "address": "Street 3, near Psar Nat, Battambang" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Clothes made to fit you" } },
      { "type": "Text", "props": { "id": "text-1", "heading": "What we do", "body": "We sew clothes." } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added the work you told me about to the text.",
    "operations": [
      { "op": "UPDATE", "component_id": "text-1", "props": { "body": "We sew wedding dresses and school uniforms in Battambang, and we repair and alter the clothes you already have." } }
    ]
  }
}
```

```json
{
  "message": "/expand",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Mama Srey's Kitchen" } },
    "content": [
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "Good food." } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I need a few facts to write more without guessing: what dishes do you cook, where are you, and what do customers like most? Tell me and I'll expand it.",
    "operations": []
  }
}
```
