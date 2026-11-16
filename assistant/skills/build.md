---
name: "build"
title: "Build a page"
skill: "Page builder"
group: "design"
order: 10
command: "/build"
aliases: ["/page"]
args: {"name": "about", "hint": "what the page is about", "hint_km": "ទំព័រនេះនិយាយអំពីអ្វី", "required": true}
blocks: ["*"]
triggers: ["build a page", "build a website", "build my website", "create a page about", "create a new page", "create a website", "create my website", "make a page about", "make a new page", "make a website", "make me a website", "បង្កើតគេហទំព័រ", "ធ្វើគេហទំព័រ", "បង្កើតវេបសាយ", "ធ្វើវេបសាយ", "បង្កើតទំព័រ", "웹사이트 만들어", "웹사이트를 만들어", "페이지 만들어", "페이지를 만들어", "홈페이지 만들어", "홈페이지를 만들어"]
mode: "change"
maxTokens: 1800
summary: "Builds a whole new page about your topic from blocks, with blanks to fill."
summary_km: "បង្កើតទំព័រថ្មីទាំងមូលអំពីប្រធានបទរបស់អ្នក ពីប្លុកនានា ដោយទុកកន្លែងទំនេរឲ្យអ្នកបំពេញ។"
example: "/build my grandparents' life story"
example_km: "/build ប្រវត្តិជីវិតជីដូនជីតារបស់ខ្ញុំ"
km_reviewed: false
---

## Rules

- Replace the page's content with a new plan for the topic (for one block or a new order, /add and /design do that).
  Order: the root, the Hero, the REMOVEs, the new blocks top to bottom, the Footer; each index counts after the
  operations before it. At most 100 operations; 20 to 60 is usual.
- Look: UPDATE the root's palette, font and buttonStyle for the mood, as /theme pairs them, and accentColor null.
- Hero stays first and Footer last (neither can be added; never REMOVE the Hero): UPDATE the Hero's eyebrow,
  heading, description, highlights and badge, and the Footer's tagline. A Hero button only with a page action that
  fits; otherwise an empty label hides it.
- A page with no Hero (an empty page): the first band is a Section with background accent or gradient-accent holding
  a Heading (level 2), a short Text and Buttons. With no Footer, add none, and say in the reply that a Hero or a Footer
  can be added from the editor's block list.
- REMOVE every other block that doesn't fit the topic (products on a page that sells nothing, sample testimonials,
  stats, gallery); UPDATE one that fits instead.
- Then 4 to 8 bands, one idea each: ADD a Section with a `ref` (vary the background: none, muted, accent, inverse,
  gradient-soft), then its blocks into slot `content` (`parentId` the ref): a Heading (level 2) and a Rich text or
  Text; a Columns for two things side by side; a Grid of Text for a run (steps, places, years). Nothing sits more
  than 3 deep, so Cards with blocks go in a top-level Grid or Columns, never in a Section.
- Final page: 16 blocks at the top level, 40 in all, each type within its maxPerPage (Section 8, Text 5, Rich text
  10, Grid 4).
- Facts only from the message and the page. Every other fact (a date, a place, a name, a number) is a short
  placeholder in brackets, like "[year]" or "[town]", or a line saying what to write.
- Pictures, videos, maps and quotes are the owner's: never ADD Image, Gallery, Quote or Video. Say in the reply
  where a photo or someone's own words would go, and which bracketed facts to fill.

## Examples

```json
{
  "message": "/build the life of Rithy Keo and his wife Bopha: love and adventure, hard years and success",
  "page": {
    "root": { "props": { "businessName": "Keo Family", "templateId": "everyday-store", "palette": "original", "font": "original", "buttonStyle": "square" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh goods every day" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Popular this week" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us" } },
      { "type": "Testimonials", "props": { "id": "quotes-1", "heading": "What our customers say" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Come and see us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I built a new page about Rithy and Bopha in rose colours: their story, travels, hard years and success. Fill in the [bracketed] facts, and add photos and their own words (Quote) from the block list.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "palette": "rose", "font": "editorial", "buttonStyle": "pill", "accentColor": null } },
      { "op": "UPDATE", "component_id": "hero-1", "props": { "eyebrow": "A life of love and adventure", "heading": "Rithy and Bopha Keo", "description": "How they met, where they travelled, the hard years and what they built.", "primaryLabel": "", "secondaryLabel": "", "highlights": [], "badge": "" } },
      { "op": "REMOVE", "component_id": "cards-1" },
      { "op": "REMOVE", "component_id": "about-1" },
      { "op": "REMOVE", "component_id": "quotes-1" },
      { "op": "REMOVE", "component_id": "visit-1" },
      { "op": "ADD", "component_type": "Section", "ref": "story", "position": { "parentId": null, "slot": null, "index": 1 }, "props": { "background": "none", "overlay": "dark", "padding": "large", "width": "narrow" } },
      { "op": "ADD", "component_type": "Text", "position": { "parentId": "story", "slot": "content", "index": 0 }, "props": { "eyebrow": "How it began", "heading": "Two lives meet", "body": "Rithy and Bopha met in [town] in [year]. Write how they met and what drew them together.", "align": "left", "spacing": "normal" } },
      { "op": "ADD", "component_type": "Section", "ref": "travels", "position": { "parentId": null, "slot": null, "index": 2 }, "props": { "background": "muted", "overlay": "dark", "padding": "large", "width": "normal" } },
      { "op": "ADD", "component_type": "Heading", "position": { "parentId": "travels", "slot": "content", "index": 0 }, "props": { "text": "Adventures together", "level": "2", "size": "large", "align": "center", "tone": "default" } },
      { "op": "ADD", "component_type": "Grid", "ref": "trips", "position": { "parentId": "travels", "slot": "content", "index": 1 }, "props": { "columns": "3", "gap": "medium" } },
      { "op": "ADD", "component_type": "Text", "position": { "parentId": "trips", "slot": "items", "index": 0 }, "props": { "eyebrow": "[year]", "heading": "[place]", "body": "Write what happened on this journey.", "align": "left", "spacing": "tight" } },
      { "op": "ADD", "component_type": "Text", "position": { "parentId": "trips", "slot": "items", "index": 1 }, "props": { "eyebrow": "[year]", "heading": "[place]", "body": "Write what happened on this journey.", "align": "left", "spacing": "tight" } },
      { "op": "ADD", "component_type": "Text", "position": { "parentId": "trips", "slot": "items", "index": 2 }, "props": { "eyebrow": "[year]", "heading": "[place]", "body": "Write what happened on this journey.", "align": "left", "spacing": "tight" } },
      { "op": "ADD", "component_type": "Section", "ref": "hard-years", "position": { "parentId": null, "slot": null, "index": 3 }, "props": { "background": "inverse", "overlay": "dark", "padding": "large", "width": "narrow" } },
      { "op": "ADD", "component_type": "Text", "position": { "parentId": "hard-years", "slot": "content", "index": 0 }, "props": { "eyebrow": "[years]", "heading": "The hard years", "body": "Write what was hard for them and how they got through it together.", "align": "left", "spacing": "normal" } },
      { "op": "ADD", "component_type": "Section", "ref": "success", "position": { "parentId": null, "slot": null, "index": 4 }, "props": { "background": "gradient-soft", "overlay": "dark", "padding": "large", "width": "normal" } },
      { "op": "ADD", "component_type": "Heading", "position": { "parentId": "success", "slot": "content", "index": 0 }, "props": { "text": "Success and what they built", "level": "2", "size": "large", "align": "left", "tone": "accent" } },
      { "op": "ADD", "component_type": "RichText", "position": { "parentId": "success", "slot": "content", "index": 1 }, "props": { "body": { "type": "doc", "content": [{ "type": "bulletList", "content": [{ "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "[year]: [an achievement]" }] }] }, { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "[year]: [what they gave back]" }] }] }] }] }, "align": "left", "size": "normal" } },
      { "op": "UPDATE", "component_id": "footer-1", "props": { "tagline": "The life of Rithy and Bopha Keo." } }
    ]
  }
}
```
