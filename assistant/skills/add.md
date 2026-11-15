---
name: "add"
title: "Add a block"
skill: "Add block"
group: "design"
order: 2
command: "/add"
aliases: []
args: {"name": "block", "hint": "a block, e.g. FAQ, Heading, Buttons, Columns or Section", "hint_km": "ប្លុកមួយ ឧ. FAQ, Heading, Buttons, Columns ឬ Section", "required": true}
blocks: ["*"]
triggers: ["add a block", "add a section", "new block", "new section", "insert", "add columns", "បន្ថែមប្លុក", "បន្ថែមផ្នែក", "ប្លុកថ្មី"]
mode: "change"
maxTokens: 700
summary: "Adds a block with your facts or clear blanks to fill. Never makes up details."
summary_km: "បន្ថែមប្លុកដោយប្រើព័ត៌មានរបស់អ្នក ឬទុកកន្លែងទំនេរឲ្យអ្នកបំពេញ។ មិនប្រឌិតព័ត៌មានទេ។"
example: "/add FAQ after @VisitUs"
example_km: "/add Services ក្រោម @Hero"
km_reviewed: false
---

## Rules

- The assistant can add Text, FAQ, Call to action and Services; the containers Section, Columns, Grid and Card; and
  the design blocks Heading, Rich text, Buttons, Icon, Spacer and Divider. For any other block (Hero, Footer, the
  product blocks, About, Visit us, Gallery, Testimonials, Stats, Image, Image banner, Logo strip, Quote, Video,
  Map), propose no operations and tell the owner to add it from the block list: pictures, videos, maps and quotes
  are theirs.
- Check the limits first: the block's own maximum, counted at every depth (one FAQ, five Text, three Call to action,
  two Services), and the page's 16 blocks at the top level and 40 in all. When the page is full, propose nothing and
  say which block to remove or update instead.
- Place it right after the "@" block, inside the "@" container when the owner says "in" it, or where the owner says;
  otherwise after the block it belongs with (a Call to action near the end), and always before the Footer.
- A position names the container and its slot, or `parentId` null for the top level. What fits where: a Section
  takes any block but Hero, Footer, another Section and the product, About and Visit us blocks; a column takes
  Heading, Rich text, Text, Image, Buttons, Icon, Spacer, Divider, Quote, Video, Map and Card; a Grid takes Card,
  Image, Quote, Icon, Heading, Rich text, Text, Buttons and Video; a Card takes Heading, Rich text, Text, Image,
  Buttons, Icon, Spacer, Divider and Quote. Nothing sits more than 3 deep, and a Columns block uses column3 and
  column4 only with a three- or four-part ratio.
- A new container starts empty: ADD it with a `ref`, then ADD the blocks the owner asked for into its slot
  (`parentId` is the ref), or MOVE existing blocks into it. Never leave a new container empty.
- Fill every prop: the owner's facts from the message, the page or the profile where they exist, and otherwise a
  placeholder that says what to write (like "Write how and where you deliver."). Never fill in prices, hours,
  delivery, payment or services the owner didn't give.
- A Rich text body is a doc of paragraphs, headings (levels 2–4) and lists, with bold, italic and links, 2000
  characters at most in all. A Heading's level follows the page's outline (see /a11y), usually 2.
- A button goes to a page action (shop, visit, call, email, directions, and telegram when the page has a Telegram
  link) or to an `https://` address the owner gave or that is already on the page.
- Write in the page's language; a Khmer page gets Khmer text and Khmer placeholders.
- In the reply, name the facts still needed so the owner can answer with them.

## Examples

```json
{
  "message": "/add FAQ after @VisitUs. We deliver in Phnom Penh only, with our own driver, and we take ABA and cash.",
  "refs": [{ "id": "visit-1", "type": "VisitUs" }],
  "touchesMore": true,
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
      { "op": "ADD", "component_type": "FAQ", "position": { "parentId": null, "slot": null, "index": 3 }, "props": { "eyebrow": "", "heading": "Questions and answers", "items": [{ "question": "Do you deliver?", "answer": "Yes, in Phnom Penh only, with our own driver." }, { "question": "How can I pay?", "answer": "By ABA or in cash." }], "align": "left", "spacing": "normal" } }
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
      { "op": "ADD", "component_type": "Services", "position": { "parentId": null, "slot": null, "index": 1 }, "props": { "eyebrow": "", "heading": "សេវារបស់យើង", "columns": "3", "items": [{ "icon": "scissors", "title": "សេវាទី ១ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }, { "icon": "star", "title": "សេវាទី ២ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }, { "icon": "heart", "title": "សេវាទី ៣ របស់អ្នក", "text": "សរសេរថាសេវានេះជាអ្វី និងហេតុអ្វីបានជាអតិថិជនចូលចិត្ត។" }], "align": "left", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/add two columns after @About: on the left \"How to order\" with our steps, on the right a Call us button and a Telegram button. To order: choose your cake, call or message us two days ahead, and pick it up at our shop.",
  "refs": [{ "id": "about-1", "type": "About" }],
  "touchesMore": true,
  "page": {
    "root": { "props": { "businessName": "Little Lotus Cakes", "address": "Street 155, Toul Tom Poung, Phnom Penh", "phones": [{ "number": "012 155 155" }], "telegramUrl": "https://t.me/littlelotuscakes" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Cakes for every celebration" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "A small home bakery in Toul Tom Poung." } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Find us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added two columns after About: \"How to order\" with your three steps on the left, and a Call us and a Telegram button on the right.",
    "operations": [
      { "op": "ADD", "component_type": "Columns", "ref": "order-columns", "position": { "parentId": null, "slot": null, "index": 2 }, "props": { "ratio": "50-50", "gap": "medium", "stackOnMobile": true, "verticalAlign": "center" } },
      { "op": "ADD", "component_type": "Heading", "position": { "parentId": "order-columns", "slot": "column1", "index": 0 }, "props": { "text": "How to order", "level": "2", "size": "large", "align": "left", "tone": "default" } },
      { "op": "ADD", "component_type": "RichText", "position": { "parentId": "order-columns", "slot": "column1", "index": 1 }, "props": { "body": { "type": "doc", "content": [{ "type": "orderedList", "content": [
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Choose your cake." }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Call us or message us on Telegram two days ahead." }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Pick it up at our shop." }] }] }
      ] }] }, "align": "left", "size": "normal" } },
      { "op": "ADD", "component_type": "Buttons", "position": { "parentId": "order-columns", "slot": "column2" }, "props": { "items": [{ "label": "Call us", "link": "call", "style": "primary" }, { "label": "Message us on Telegram", "link": "telegram", "style": "secondary" }], "size": "medium", "align": "left" } }
    ]
  }
}
```

```json
{
  "message": "/add វីដេអូ ក្រោម @Hero",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Srey Mom Salon" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ហាងកាត់សក់ និងធ្វើក្រចក" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំមិនអាចបន្ថែមប្លុក Video បានទេ ព្រោះវីដេអូជារបស់អ្នក។ សូមបន្ថែមវាពីបញ្ជីប្លុក ហើយបិទភ្ជាប់តំណ YouTube ឬ Vimeo របស់អ្នក។",
    "operations": []
  }
}
```
