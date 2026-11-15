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
triggers: ["seo", "google", "search engine", "be found", "found online", "page title", "meta description", "search results", "ស្វែងរកលើ Google", "រកឃើញលើ Google", "ឡើងលើ Google", "ចំណងជើងទំព័រ"]
mode: "change"
maxTokens: 600
summary: "Sets your page title and Google description, and makes headings easy to find."
summary_km: "កំណត់ចំណងជើងទំព័រ និងការពិពណ៌នាសម្រាប់ Google ហើយកែចំណងជើងឲ្យគេរកឃើញងាយ។"
example: "/seo"
example_km: "/seo"
km_reviewed: false
---

## Rules

- Set the page's search title (`seoTitle`, at most 60 characters) and search description (`seoDescription`, at most
  160) in the page settings (`root`). They are what Google shows for the page, and the site uses them before the
  website's own SEO settings and the business name.
- Build both only from facts on the page, in the message or in the business profile, in the page's language. The
  title says what you offer, where, and the business name ("Dara Phone Repair: screens and batteries, Phnom Penh").
  The description is one or two plain sentences: what you sell or do, where, and a fact the page already gives
  (opening hours, delivery area). No claim the page doesn't make, no prices or offers the owner didn't give.
- Keep a title or description the owner already wrote, unless it is too long, says something the page doesn't, or
  the owner asks for a new one.
- Then the headings: the Hero heading and description, the block headings and Heading blocks say what you sell and
  where ("Phone repair in Phnom Penh"), in the words customers type into a search. Every heading still reads
  naturally for a person, and each key phrase appears once or twice on the page, never as a list of keywords.
- Keep within each limit (Hero heading 50 characters, a Heading block 80, descriptions 200) and keep the meaning and
  tone. Leave Heading levels to /a11y, which sets them by the page's outline.
- Picture descriptions (alt text) help search too. /a11y writes the ones it may write: Image, Image banner, and the
  Hero, Text and About picture descriptions. Gallery captions, Logo strip descriptions and the Hero side-picture
  labels are the owner's, added in the editor. When pictures have none, say so in one line and say which way each
  one is added. Never put keywords into captions or alt text.
- With "@" blocks, change only those blocks (and the blocks inside an "@" container); set the page title and
  description only when there are no "@" blocks or the owner asks for them.
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
      { "type": "Gallery", "props": { "id": "gallery-1", "heading": "Our shop", "columns": "3", "images": [{ "imageUrl": "/media/shop-1.jpg", "caption": "" }, { "imageUrl": "/media/shop-2.jpg", "caption": "" }, { "imageUrl": "/media/shop-3.jpg", "caption": "" }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I set your page's title and Google description, and your headings now say what you repair and where. Your 3 Gallery photos have no captions yet: add them in the editor, saying what each one shows.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "seoTitle": "Dara Phone Repair: screens and batteries, Phnom Penh", "seoDescription": "We replace cracked phone screens and batteries that run down too fast, at our shop on Street 271, Phnom Penh. Open 8:00 – 19:00." } },
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Phone screen and battery repair in Phnom Penh", "description": "Dara Phone Repair replaces phone screens and batteries at our shop on Street 271, Phnom Penh." } },
      { "op": "UPDATE", "component_id": "services-1", "props": { "heading": "Phone repair services" } }
    ]
  }
}
```

```json
{
  "message": "/seo",
  "page": {
    "root": { "props": { "businessName": "នំបញ្ចុកយាយម៉ៅ", "address": "ផ្លូវ ៦០ ក្រុងសៀមរាប", "hours": "", "phones": [] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "សូមស្វាគមន៍", "description": "ហាងយើងលក់នំបញ្ចុក និងការីសាច់មាន់។" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានដាក់ចំណងជើងទំព័រ និងការពិពណ៌នាសម្រាប់ Google ហើយកែចំណងជើង Hero ឲ្យប្រាប់ថាអ្នកលក់អ្វី និងនៅឯណា។ ទំព័រនៅខ្វះលេខទូរស័ព្ទ និងម៉ោងបើក សូមប្រាប់ខ្ញុំ។",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "seoTitle": "នំបញ្ចុកយាយម៉ៅ៖ នំបញ្ចុក និងការីសាច់មាន់ នៅសៀមរាប", "seoDescription": "នំបញ្ចុកយាយម៉ៅ លក់នំបញ្ចុក និងការីសាច់មាន់ នៅផ្លូវ ៦០ ក្រុងសៀមរាប។" } },
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "នំបញ្ចុក និងការីសាច់មាន់ នៅសៀមរាប", "description": "នំបញ្ចុកយាយម៉ៅ លក់នំបញ្ចុក និងការីសាច់មាន់ នៅផ្លូវ ៦០ ក្រុងសៀមរាប។" } }
    ]
  }
}
```

```json
{
  "message": "/seo",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Sokha Coffee", "address": "Street 08, near Pub Street, Siem Reap", "seoTitle": "Sokha Coffee | Iced coffee near Pub Street", "seoDescription": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Welcome to Sokha Coffee", "description": "Iced coffee, fresh croissants and free Wi-Fi, two minutes from Pub Street." } },
      { "type": "ProductCards", "props": { "id": "products-1", "heading": "Our drinks" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Your Hero heading now says what you serve and where, so people searching for iced coffee in Siem Reap find you. I changed only the Hero: send /seo without @ to add a Google description too.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Iced coffee near Pub Street, Siem Reap" } }
    ]
  }
}
```
