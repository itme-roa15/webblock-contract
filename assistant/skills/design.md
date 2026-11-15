---
name: "design"
title: "Page layout"
skill: "Page composition"
group: "design"
order: 1
command: "/design"
aliases: []
args: {"name": "goal", "hint": "sell, book or visit", "hint_km": "លក់ កក់ ឬមកលេងហាង", "required": false}
blocks: ["*"]
triggers: ["layout", "page order", "rearrange", "which blocks", "structure", "redesign", "side by side", "group", "រៀបចំទំព័រ", "លំដាប់ប្លុក", "ប្តូរលំដាប់", "ដាក់ទន្ទឹមគ្នា"]
mode: "change"
maxTokens: 800
summary: "Orders and groups your blocks for a goal (sell, book, visit). Changes the page."
summary_km: "រៀបលំដាប់ និងដាក់ប្លុកជាក្រុម តាមគោលដៅរបស់អ្នក (លក់ កក់ ឬឲ្យភ្ញៀវមកហាង)។ វាកែប្រែទំព័រ។"
example: "/design sell"
example_km: "/design ឲ្យភ្ញៀវមកហាង"
km_reviewed: false
---

## Rules

- Work out the goal from the argument or the message: sell (products near the top, a "shop" button), book or call
  (Services and a "call" button), visit (Visit us and a "directions" button). With no goal, use the business type
  and the blocks already on the page.
- Prefer MOVE over REMOVE and ADD: the blocks the owner already filled stay, in a better order. A good order is
  Hero first, then what the goal needs most, then trust (About, Testimonials, Stats), then FAQ and Visit us, and the
  Footer always last.
- Containers group blocks when it helps a visitor: Columns puts two or three short blocks side by side (a text and
  a map, a heading and buttons), a Grid lays out a run of cards, a Section gives a band its own background. Wrap =
  ADD the container with a `ref` where the first block is, then MOVE each block into its slot (`parentId` is the
  ref); unwrap = MOVE the blocks out, then REMOVE the container. Hero and Footer never go inside a container, and
  the product, About and Visit us blocks stay at the top level.
- What fits where: a Section takes any block but Hero, Footer, another Section and the product, About and Visit us
  blocks; a column takes Heading, Rich text, Text, Image, Buttons, Icon, Spacer, Divider, Quote, Video, Map and
  Card; a Grid takes Card, Image, Quote, Icon, Heading, Rich text, Text, Buttons and Video; a Card takes the small
  blocks (Heading, Rich text, Text, Image, Buttons, Icon, Spacer, Divider, Quote). Nothing sits more than 3 deep.
- ADD only the blocks the assistant may add: Text, FAQ, Call to action, Services, Heading, Rich text, Buttons, Icon,
  Spacer, Divider and the containers, with every prop filled from the owner's facts or with clear placeholders.
  Other blocks (Visit us, Gallery, Testimonials, Stats, products, pictures, Video, Map, Quote) can't be added by the
  assistant: name them in the reply so the owner adds them from the block list.
- REMOVE only a block that is completely empty (no heading, no text, no items), a container with nothing inside, or
  one the owner asks to drop, and say which. A block with placeholder text stays: say it needs the owner's words.
- Keep within the limits on the final page: 16 blocks at the top level and 40 in all, each type within its own
  maximum counted at every depth (one Hero, one FAQ, up to three Call to action blocks). Blocks moved into a
  container no longer count at the top level, so a wrap also frees top-level room.
- Each position counts after the operations before it have run: a MOVE's index counts in the target list once the
  block has left its old place. Check that the Footer ends up last.
- Change no wording beyond what a new block needs; /hero, /cta and the content commands do that.

## Examples

```json
{
  "message": "/design sell",
  "page": {
    "root": { "props": { "businessName": "Kampot Brew", "templateId": "iced-coffee", "address": "Riverside Road, Kampot" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Coffee roasted in Kampot", "primaryLabel": "See our coffee", "primaryAction": "shop" } },
      { "type": "About", "props": { "id": "about-1", "heading": "Our story", "body": "We roast small batches of Mondulkiri beans by the river in Kampot." } },
      { "type": "Gallery", "props": { "id": "gallery-1", "heading": "A look inside", "columns": "3" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Popular this week", "columns": "3" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I moved your products up, right under the Hero, and added a banner before the Footer that sends people to them. Your own text didn't change.",
    "operations": [
      { "op": "MOVE", "component_id": "cards-1", "position": { "parentId": null, "slot": null, "index": 1 } },
      { "op": "ADD", "component_type": "CallToAction", "position": { "parentId": null, "slot": null, "index": 4 }, "props": { "eyebrow": "", "heading": "Find your favourite roast", "body": "Have a look at our coffee and pick the one you like.", "buttonLabel": "See our coffee", "buttonAction": "shop", "align": "center", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/design ឲ្យភ្ញៀវមកហាង",
  "page": {
    "root": { "props": { "businessName": "Srey Mom Salon", "templateId": "sweet-pastel", "address": "ផ្លូវលេខ ៣ ក្រុងបាត់ដំបង" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ហាងកាត់សក់ និងធ្វើក្រចក" } },
      { "type": "Gallery", "props": { "id": "gallery-1", "heading": "ស្នាដៃរបស់យើង", "columns": "3" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "សេវារបស់យើង", "columns": "3" } },
      { "type": "Text", "props": { "id": "text-1", "heading": "", "body": "" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានដាក់សេវារបស់អ្នកនៅក្រោម Hero លុបប្លុក Text ទទេចេញ ហើយបន្ថែមផ្ទាំងបង្ហាញផ្លូវមកហាងនៅពីលើ Footer។ ទំព័រនេះមិនទាន់មានប្លុក Visit us ទេ សូមបន្ថែមវាពីបញ្ជីប្លុក ដើម្បីបង្ហាញអាសយដ្ឋាន និងម៉ោងបើក។",
    "operations": [
      { "op": "MOVE", "component_id": "services-1", "position": { "parentId": null, "slot": null, "index": 1 } },
      { "op": "REMOVE", "component_id": "text-1" },
      { "op": "ADD", "component_type": "CallToAction", "position": { "parentId": null, "slot": null, "index": 3 }, "props": { "eyebrow": "", "heading": "មកលេងហាងយើងនៅបាត់ដំបង", "body": "", "buttonLabel": "បង្ហាញផ្លូវ", "buttonAction": "directions", "align": "center", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/design put the map next to our opening hours",
  "page": {
    "root": { "props": { "businessName": "Bopha Noodle House", "address": "St. 51, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh noodles in Phnom Penh" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Our menu", "columns": "3" } },
      { "type": "Text", "props": { "id": "text-1", "heading": "Opening hours", "body": "Every day, 6:00 – 14:00." } },
      { "type": "Map", "props": { "id": "map-1", "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3", "title": "Our shop on St. 51", "height": "medium" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Your opening hours and the map now sit side by side in two columns, and they stack on phones. No words changed.",
    "operations": [
      { "op": "ADD", "component_type": "Columns", "ref": "hours-and-map", "position": { "parentId": null, "slot": null, "index": 2 }, "props": { "ratio": "50-50", "gap": "medium", "stackOnMobile": true, "verticalAlign": "top" } },
      { "op": "MOVE", "component_id": "text-1", "position": { "parentId": "hours-and-map", "slot": "column1", "index": 0 } },
      { "op": "MOVE", "component_id": "map-1", "position": { "parentId": "hours-and-map", "slot": "column2", "index": 0 } }
    ]
  }
}
```
