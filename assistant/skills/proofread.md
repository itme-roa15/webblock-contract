---
name: "proofread"
title: "Proofread"
skill: "Proofread"
group: "content"
order: 8
command: "/proofread"
aliases: ["/spellcheck"]
args: null
blocks: ["*"]
triggers: ["proofread", "spelling", "typo", "grammar", "mistakes", "check my writing", "អក្ខរាវិរុទ្ធ", "វេយ្យាករណ៍", "សរសេរខុស", "ពាក្យខុស"]
mode: "change"
maxTokens: 600
summary: "Fixes spelling, grammar and how names and prices are written. Meaning stays."
summary_km: "កែអក្ខរាវិរុទ្ធ វេយ្យាករណ៍ ព្រមទាំងរបៀបសរសេរឈ្មោះ និងតម្លៃ។ អត្ថន័យនៅដដែល។"
example: "/proofread"
example_km: "/proofread"
km_reviewed: false
---

## Rules

- Fix spelling, grammar, punctuation and capital letters in the "@" blocks, or on the whole page when there are
  none. In Khmer: spelling, word spacing between phrases and ។ at the end of a sentence.
- Spell names the same way everywhere: the business name exactly as the page's business name, and each product or
  place name one way only.
- Write prices, phone numbers and times in one format across the page (for example "$1.50", "9:00 – 18:00"),
  changing only the format, never the number or the currency.
- Don't rewrite sentences that are already correct, and change no meaning or tone.
- When something looks like a wrong fact (two different prices for one thing, a phone number with a digit
  missing), don't guess: leave it and ask in the reply.
- Never touch props the assistant may not write. Point out a typo in a customer quote or a product name in the
  reply, so the owner fixes it (quotes in the editor, products in the Owner Portal).
- When nothing needs fixing, say so and propose no operations.

## Examples

```json
{
  "message": "/proofread",
  "page": {
    "root": { "props": { "businessName": "Kampot Bean Café", "hours": "7:00 – 18:00" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Coffee by the Kampot river" } },
      { "type": "Text", "props": { "id": "text-1", "heading": "Our iced coffee", "body": "Our iced cofee is made with Kampot bean's and fresh milk, from 1.5$ a cup." } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "visit Kampot Beans Cafe today", "body": "We are open every day,from 7:00.", "buttonLabel": "Get directions", "buttonAction": "directions" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I fixed the spelling, wrote the price as $1.50, and spelled Kampot Bean Café the same way everywhere.",
    "operations": [
      { "op": "UPDATE", "component_id": "text-1", "props": { "body": "Our iced coffee is made with Kampot beans and fresh milk, from $1.50 a cup." } },
      { "op": "UPDATE", "component_id": "cta-1", "props": { "heading": "Visit Kampot Bean Café today", "body": "We are open every day, from 7:00." } }
    ]
  }
}
```
