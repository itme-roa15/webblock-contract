---
name: "seo"
title: "SEO"
skill: "SEO"
group: "content"
order: 12
command: "/seo"
aliases: []
args: null
blocks: ["*"]
triggers: ["seo", "google", "search engine", "be found", "found online", "ស្វែងរកលើ Google", "រកឃើញលើ Google", "ឡើងលើ Google"]
mode: "change"
maxTokens: 600
summary: "Makes your headings easier to find on Google, and says what's still missing."
summary_km: "កែចំណងជើងឲ្យគេរកឃើញអ្នកលើ Google ងាយជាងមុន ហើយប្រាប់អ្វីដែលនៅខ្វះ។"
example: "/seo"
example_km: "/seo"
km_reviewed: false
---

## Rules

- Work on the "@" blocks, or on the whole page when there are none: make the Hero heading and description, and the
  block headings, say what you sell and where ("Phone repair in Phnom Penh"), in the words customers type into a
  search, in the page's language.
- Use only facts on the page or in the message. Never add places you don't serve, products you don't sell, or
  lists of keywords: every heading still reads naturally for a person, and each key phrase appears once or twice
  on the page, not in every block.
- Keep within each limit (Hero heading 50 characters, descriptions 200) and keep the meaning and tone.
- The editor has no page title, page description or picture descriptions (alt text): never pretend to set them,
  and never put them in captions or headings. Say in one line of the reply that they can't be set yet.
- Search engines and maps read the business name, address, phone and hours: when any of them is empty on the page,
  say so in the reply and ask for it; never invent it.
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).

## Examples

```json
{
  "message": "/seo",
  "page": {
    "root": { "props": { "businessName": "Dara Phone Repair", "address": "Street 271, Phnom Penh", "hours": "8:00 – 19:00", "phones": [{ "number": "017 271 271" }] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Welcome!", "description": "We fix phones.", "primaryLabel": "Call us", "primaryAction": "call" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we do", "columns": "2", "items": [{ "icon": "shield", "title": "Screen replacement", "text": "New screens for cracked phones." }, { "icon": "star", "title": "Battery replacement", "text": "A new battery when yours runs down too fast." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Your headings now say what you repair and where, so people searching for phone repair in Phnom Penh can find you. The editor has no page title, page description or picture descriptions yet, so I couldn't set those.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Phone screen and battery repair in Phnom Penh", "description": "Dara Phone Repair replaces phone screens and batteries at our shop on Street 271, Phnom Penh." } },
      { "op": "UPDATE", "component_id": "services-1", "props": { "heading": "Phone repair services" } }
    ]
  }
}
```

```json
{
  "message": "/seo",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "នំបញ្ចុកយាយម៉ៅ", "address": "ផ្លូវ ៦០ ក្រុងសៀមរាប", "hours": "", "phones": [] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "សូមស្វាគមន៍", "description": "ហាងយើងលក់នំបញ្ចុក និងការីសាច់មាន់។" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានកែចំណងជើង Hero ឲ្យប្រាប់ថាអ្នកលក់អ្វី និងនៅឯណា ដើម្បីឲ្យអ្នកដែលស្វែងរកលើ Google រកឃើញអ្នកងាយជាងមុន។ ទំព័រនៅខ្វះលេខទូរស័ព្ទ និងម៉ោងបើក សូមប្រាប់ខ្ញុំ។ កម្មវិធីកែនេះមិនទាន់មានចំណងជើងទំព័រ ការពិពណ៌នាទំព័រ ឬការពិពណ៌នារូបភាពនៅឡើយទេ។",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "នំបញ្ចុក និងការីសាច់មាន់ នៅសៀមរាប", "description": "នំបញ្ចុកយាយម៉ៅ លក់នំបញ្ចុក និងការីសាច់មាន់ នៅផ្លូវ ៦០ ក្រុងសៀមរាប។" } }
    ]
  }
}
```
