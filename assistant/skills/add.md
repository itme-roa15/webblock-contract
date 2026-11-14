---
name: "add"
title: "Add a block"
skill: "Add block"
group: "design"
order: 2
command: "/add"
aliases: []
args: {"name": "block", "hint": "Text, FAQ, Call to action or Services", "hint_km": "Text, FAQ, Call to action ឬ Services", "required": true}
blocks: ["*"]
triggers: ["add a block", "add a section", "new block", "new section", "insert", "បន្ថែមប្លុក", "បន្ថែមផ្នែក", "ប្លុកថ្មី"]
mode: "change"
maxTokens: 600
summary: "Adds a block with your facts or clear blanks to fill. Never makes up details."
summary_km: "បន្ថែមប្លុកដោយប្រើព័ត៌មានរបស់អ្នក ឬទុកកន្លែងទំនេរឲ្យអ្នកបំពេញ។ មិនប្រឌិតព័ត៌មានទេ។"
example: "/add FAQ after @VisitUs"
example_km: "/add Services ក្រោម @Hero"
km_reviewed: false
---

## Rules

- Only Text, FAQ, Call to action and Services can be added. For any other block (Visit us, Gallery, Testimonials,
  Stats, products, About, Hero), propose no operations and tell the owner to add it from the block list.
- Check the block's maximum first (one FAQ, five Text, three Call to action, two Services) and the page's 16 blocks.
  When the page is full, propose nothing and say which block to remove or update instead.
- Place it right after the "@" block, or where the owner says; otherwise after the block it belongs with (a Call to
  action near the end), and always before the Footer.
- Fill every prop: the owner's facts from the message, the page or the profile where they exist, and otherwise a
  placeholder that says what to write (like "Write how and where you deliver."). Never fill in prices, hours,
  delivery, payment or services the owner didn't give.
- Write in the page's language; a Khmer page gets Khmer text and Khmer placeholders.
- In the reply, name the facts still needed so the owner can answer with them.

## Examples

```json
{
  "message": "/add FAQ after @VisitUs. We deliver in Phnom Penh only, with our own driver, and we take ABA and cash.",
  "refs": [{ "id": "visit-1", "type": "VisitUs" }],
  "page": {
    "root": { "props": { "businessName": "Mekong Mango", "templateId": "everyday-store", "address": "St. 63, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Dried mango from Kampong Speu" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Our best sellers", "columns": "3" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Come and see us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added an FAQ after Visit us with your delivery and payment answers. Tell me how long delivery takes and I'll add it.",
    "operations": [
      { "op": "ADD", "component_type": "FAQ", "index": 3, "props": { "eyebrow": "", "heading": "Questions and answers", "items": [{ "question": "Do you deliver?", "answer": "Yes, in Phnom Penh only, with our own driver." }, { "question": "How can I pay?", "answer": "By ABA or in cash." }], "align": "left", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/add Services សម្រាប់ហាងខ្ញុំ",
  "page": {
    "root": { "props": { "businessName": "Chantha Tailor", "templateId": "clean-mono", "address": "ផ្សារចាស់ ក្រុងសៀមរាប" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ដេរសម្លៀកបំពាក់តាមខ្នាតរបស់អ្នក" } },
      { "type": "About", "props": { "id": "about-1", "heading": "អំពីយើង", "body": "ហាងដេរខោអាវតូចមួយនៅក្បែរផ្សារចាស់ ក្រុងសៀមរាប។" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានបន្ថែមប្លុក Services នៅក្រោម Hero ដោយមានកាតបីទុកឲ្យអ្នកបំពេញ។ សូមប្រាប់ខ្ញុំពីសេវាដែលហាងអ្នកផ្តល់ជូន ខ្ញុំនឹងសរសេរដាក់ឲ្យ។",
    "operations": [
      { "op": "ADD", "component_type": "Services", "index": 1, "props": { "eyebrow": "", "heading": "សេវារបស់យើង", "columns": "3", "items": [{ "icon": "scissors", "title": "សេវាទី ១ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }, { "icon": "star", "title": "សេវាទី ២ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }, { "icon": "heart", "title": "សេវាទី ៣ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }], "align": "left", "spacing": "normal" } }
    ]
  }
}
```
