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

- Change only align, spacing and columns, on the "@" blocks or on the whole page. Never change wording, order or
  the theme.
- Spacing: "normal" everywhere unless a block has a reason to differ (the Hero or a closing Call to action may be
  "roomy"); never mix "tight" and "roomy" on neighbouring blocks.
- Alignment: one choice for the reading blocks (About, Text, Services, FAQ, products), usually left; Call to action,
  Stats, Testimonials and Footer may stay centred.
- Columns follow the content: never more columns than cards (2 cards, 2 columns); 3 is the usual choice, 4 only for
  short product or picture grids.
- REMOVE only a block that is completely empty (no heading, no text, no items) and name it in the reply. A block
  with placeholder text stays: say it needs the owner's words.
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
