---
name: "mobile"
title: "Phone check"
skill: "Mobile check"
group: "design"
order: 8
command: "/mobile"
aliases: ["/phone"]
args: null
blocks: ["*"]
triggers: ["mobile", "on my phone", "on phones", "phone screen", "small screen", "too big on phone", "លើទូរស័ព្ទ", "ក្នុងទូរស័ព្ទ", "អេក្រង់ទូរស័ព្ទ", "អេក្រង់តូច"]
mode: "change"
maxTokens: 600
summary: "Fixes what looks crowded on phones: long headings and buttons. Changes the page."
summary_km: "កែអ្វីដែលមើលទៅចង្អៀតលើទូរស័ព្ទ៖ ចំណងជើង និងប៊ូតុងដែលវែងពេក។ វាកែប្រែទំព័រ។"
example: "/mobile"
example_km: "/mobile"
km_reviewed: false
---

## Rules

- Look for what breaks on a narrow screen, on the "@" blocks or the whole page: headings over about 30 characters
  (the Hero's over about 35), button labels over about 20, and grids of long cards with 4 columns.
- Shorten those texts and keep every fact, name and number; Khmer stays Khmer, and Khmer headings get the same care
  (long words without spaces wrap badly).
- Lower 4 columns to 2 or 3 where the cards carry long text (Services, Gallery captions). Phones already show fewer
  columns by themselves, so leave short product grids alone.
- A very long page reads better with "normal" spacing than "roomy"; never make text smaller or hide blocks.
- Pictures and their sizes are not the assistant's to change; mention a missing picture only when it leaves a gap.
- When nothing would break, propose no operations and say the page looks fine on phones.

## Examples

```json
{
  "message": "/mobile",
  "page": {
    "root": { "props": { "businessName": "Kep Crab House", "templateId": "plates" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh crab and seafood from Kep, every morning", "primaryLabel": "See all of our fresh seafood today", "primaryAction": "shop", "secondaryLabel": "Find the way to our restaurant", "secondaryAction": "directions" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we offer", "columns": "4", "items": [{ "icon": "star", "title": "Kep crab with green pepper", "text": "Our best-known dish: crab from the Kep market, cooked with fresh Kampot green pepper." }, { "icon": "people", "title": "Tables by the sea", "text": "Eat on our wooden deck over the water, with room for families and groups." }, { "icon": "delivery", "title": "Takeaway", "text": "Call ahead and pick up your order at the counter." }, { "icon": "gift", "title": "Group bookings", "text": "Birthday or work dinner? Call us to book the whole deck." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I shortened the Hero heading and both buttons so they fit on one line on a phone, and set Services to 2 columns so its longer texts aren't squeezed.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Kep crab and seafood, every morning", "primaryLabel": "See our seafood", "secondaryLabel": "Get directions" } },
      { "op": "UPDATE", "component_id": "services-1", "props": { "columns": "2" } }
    ]
  }
}
```
