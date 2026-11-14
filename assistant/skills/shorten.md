---
name: "shorten"
title: "Shorten"
skill: "Copywriting"
group: "content"
order: 2
command: "/shorten"
aliases: ["/short"]
args: null
blocks: ["*"]
triggers: ["shorter", "shorten", "too long", "less text", "cut down", "ខ្លីជាងនេះ", "វែងពេក", "កាត់ឲ្យខ្លី", "អក្សរច្រើនពេក"]
mode: "change"
maxTokens: 500
summary: "Makes the text shorter and easier to read, keeping the same facts."
summary_km: "ធ្វើឲ្យអត្ថបទខ្លីជាងមុន និងងាយអាន ដោយរក្សាព័ត៌មានដដែល។"
example: "/shorten with @About"
example_km: "/shorten ផ្នែក @About"
km_reviewed: false
---

## Rules

- Shorten the text of the "@" blocks, or of the whole page when there are none: headings, descriptions, bodies,
  button labels, FAQ answers, service texts, captions.
- Keep every fact, name, price and number exactly as it is. Drop filler words, repeats and long clauses first.
- Aim for about two thirds of the length; a heading stays a heading (it may get a little shorter, never longer).
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).
- Keep the language the text is in. Khmer stays Khmer.

## Examples

```json
{
  "message": "Make this shorter",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Sugar & Crumb" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh bread every morning" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "We are a small family bakery that started in 2015 in Phnom Penh, and every single morning we bake our bread and our cakes by hand, using butter and flour, so that you can enjoy them fresh." } }
    ]
  },
  "output": {
    "reply": "I shortened the About text and kept every fact.",
    "operations": [
      { "op": "UPDATE", "component_id": "about-1", "props": { "body": "A small family bakery in Phnom Penh since 2015. We bake our bread and cakes by hand every morning, so they're always fresh." } }
    ]
  }
}
```
