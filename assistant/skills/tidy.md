---
name: "tidy"
title: "Tidy up"
skill: "Layout & spacing"
group: "design"
order: 4
command: "/tidy"
aliases: []
args: null
blocks: ["*"]
triggers: ["tidy", "clean up", "messy", "spacing", "align", "line up", "រៀបឲ្យស្អាត", "រញ៉េរញ៉ៃ", "គម្លាត", "តម្រឹម"]
mode: "change"
maxTokens: 600
summary: "Evens out spacing, alignment and columns. Changes the look, never your words."
summary_km: "កែគម្លាត ការតម្រឹម និងជួរឈរឲ្យស្មើគ្នា។ ប្តូរតែរូបរាង មិនប្តូរពាក្យរបស់អ្នកទេ។"
example: "/tidy"
example_km: "/tidy"
km_reviewed: false
---

## Rules

- Change only how blocks sit, on the "@" blocks (and the blocks inside an "@" container) or on the whole page, at
  every depth: align, spacing and columns of the blocks, and the containers' own gap, padding, width, vertical
  alignment, stacking on phones, a Columns ratio and a Grid's columns. Never change wording, order or the theme, and
  never wrap, unwrap or move blocks between containers: that is /design's. The one change to what a container holds
  is removing an empty block or an empty container (below).
- Spacing: "normal" everywhere unless a block has a reason to differ (the Hero or a closing Call to action may be
  "roomy"); never mix "tight" and "roomy" on neighbouring blocks. One gap for every Columns and Grid on the page
  (usually "medium"), and the same padding for Sections next to each other.
- Alignment: one choice for the reading blocks (About, Text, Services, FAQ, products), usually left; Call to action,
  Stats, Testimonials and Footer may stay centred. The blocks inside one container share one alignment.
- Columns follow the content: never more columns than cards (2 cards, 2 columns); 3 is the usual choice, 4 only for
  short product or picture grids. A Grid's columns never outnumber its items. A Columns ratio has as many parts as
  the columns in use (two filled columns: "50-50", or "33-67" and "67-33" when one is much longer), and columns stack
  on phones (`stackOnMobile` true).
- Turning a column off: a ratio with fewer parts only when the columns it drops are empty.
- REMOVE only a block that is completely empty (no heading, no text, no items) or a container with nothing inside,
  and name it in the reply. A block with placeholder text stays: say it needs the owner's words.
- Reply in one or two sentences: what was evened out, and that no words changed.

## Examples

```json
{
  "message": "/tidy",
  "page": {
    "root": { "props": { "businessName": "Lucky Phone Repair", "templateId": "clean-mono" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Phone screens fixed while you wait", "align": "left", "spacing": "roomy" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we fix", "columns": "4", "align": "center", "spacing": "tight", "items": [{ "icon": "shield", "title": "Screen repair", "text": "Cracked glass and touch problems." }, { "icon": "clock", "title": "Battery change", "text": "For phones that die before lunch." }] } },
      { "type": "Text", "props": { "id": "text-1", "eyebrow": "", "heading": "", "body": "", "align": "center", "spacing": "normal" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "A small repair shop next to Orussey Market.", "align": "right", "spacing": "roomy" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "", "align": "center", "spacing": "normal" } }
    ]
  },
  "output": {
    "reply": "I evened out the spacing, lined Services and About up on the left, set Services to 2 columns for its 2 cards and removed an empty Text block. No words changed.",
    "operations": [
      { "op": "UPDATE", "component_id": "services-1", "props": { "columns": "2", "align": "left", "spacing": "normal" } },
      { "op": "REMOVE", "component_id": "text-1" },
      { "op": "UPDATE", "component_id": "about-1", "props": { "align": "left", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/tidy",
  "page": {
    "root": { "props": { "businessName": "Bopha Beauty", "templateId": "sweet-pastel" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Look your best in Siem Reap", "align": "left", "spacing": "roomy" } },
      { "type": "Grid", "props": { "id": "grid-1", "columns": "4", "gap": "small", "items": [
        { "type": "Card", "props": { "id": "card-1", "surface": "plain", "padding": "medium", "content": [
          { "type": "Heading", "props": { "id": "heading-1", "text": "Haircuts", "level": "2", "size": "medium", "align": "left", "tone": "default" } }
        ] } },
        { "type": "Card", "props": { "id": "card-2", "surface": "plain", "padding": "medium", "content": [
          { "type": "Heading", "props": { "id": "heading-2", "text": "Make-up", "level": "2", "size": "medium", "align": "center", "tone": "default" } }
        ] } },
        { "type": "Card", "props": { "id": "card-3", "surface": "plain", "padding": "medium", "content": [] } }
      ] } },
      { "type": "Columns", "props": { "id": "columns-1", "ratio": "33-33-33", "gap": "large", "stackOnMobile": false, "verticalAlign": "top", "column1": [
        { "type": "Text", "props": { "id": "text-1", "heading": "Book a visit", "body": "Call us to choose a time.", "align": "left", "spacing": "normal" } }
      ], "column2": [
        { "type": "Buttons", "props": { "id": "buttons-1", "items": [{ "label": "Call us", "link": "call", "style": "primary" }], "size": "medium", "align": "left" } }
      ], "column3": [], "column4": [] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "", "align": "center", "spacing": "normal" } }
    ]
  },
  "output": {
    "reply": "I removed an empty card, set the grid to 2 columns for its 2 cards, gave both containers the same gap and made the two filled columns share the row and stack on phones. No words changed.",
    "operations": [
      { "op": "REMOVE", "component_id": "card-3" },
      { "op": "UPDATE", "component_id": "grid-1", "props": { "columns": "2", "gap": "medium" } },
      { "op": "UPDATE", "component_id": "heading-2", "props": { "align": "left" } },
      { "op": "UPDATE", "component_id": "columns-1", "props": { "ratio": "50-50", "gap": "medium", "stackOnMobile": true } }
    ]
  }
}
```
