---
name: "cta"
title: "Buttons"
skill: "Call to action"
group: "design"
order: 7
command: "/cta"
aliases: []
args: {"name": "goal", "hint": "shop, visit, call, email or directions", "hint_km": "ទិញ មកលេងហាង ទូរស័ព្ទ អ៊ីមែល ឬបង្ហាញផ្លូវ", "required": false}
blocks: ["CallToAction", "Hero"]
triggers: ["button", "call to action", "cta", "more calls", "more orders", "get people to", "ប៊ូតុង", "ឲ្យភ្ញៀវទូរស័ព្ទមក", "ឲ្យភ្ញៀវកុម្ម៉ង់"]
mode: "change"
maxTokens: 500
summary: "Makes your buttons clear and sends them to the right place. Changes the page."
summary_km: "ធ្វើឲ្យប៊ូតុងរបស់អ្នកច្បាស់ ហើយនាំភ្ញៀវទៅកន្លែងត្រឹមត្រូវ។ វាកែប្រែទំព័រ។"
example: "/cta more phone calls"
example_km: "/cta ចង់ឲ្យភ្ញៀវទូរស័ព្ទមកច្រើនជាងនេះ"
km_reviewed: false
---

## Rules

- Work on the buttons of the Hero and the Call to action blocks (the "@" ones, or all of them): label, action, and
  the Call to action's heading and line.
- A button goes only to shop, visit, call, email or directions, and only where the page can follow: shop needs
  products, call a phone number, email an email address, directions an address, visit a Visit us block. Fix a
  button that points nowhere and say why.
- A label is a short action that says where it goes ("Call us", "Get directions", "See our cakes"), never "Click
  here" or "Learn more".
- Match the goal: one clear main action across the page; don't give every button the same target.
- Replace leftover placeholder lines with plain words built from the page, or leave the line empty. No prices,
  discounts or promises the owner didn't give.
- With no Call to action on the page and room for one, ADD it before the Footer with every prop filled.

## Examples

```json
{
  "message": "/cta I want more phone calls",
  "page": {
    "root": { "props": { "businessName": "Dara Moto Repair", "templateId": "warm-bold", "address": "Russian Blvd, Phnom Penh", "phones": [{ "number": "012 345 678" }] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Moto repairs in Phnom Penh", "primaryLabel": "Learn more", "primaryAction": "shop", "secondaryLabel": "Get directions", "secondaryAction": "directions" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we fix", "columns": "3" } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "Come and visit us", "body": "One short line that makes people want to act.", "buttonLabel": "Get directions", "buttonAction": "directions" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "The Hero's main button and the banner now both call your shop. The Hero button went to products, but you don't have any on the page.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "primaryLabel": "Call us now", "primaryAction": "call" } },
      { "op": "UPDATE", "component_id": "cta-1", "props": { "heading": "Moto trouble? Call us", "body": "Tell us what's wrong with your moto.", "buttonLabel": "Call us", "buttonAction": "call" } }
    ]
  }
}
```

```json
{
  "message": "/cta ប៊ូតុងនេះមិនដំណើរការទេ",
  "refs": [{ "id": "cta-1", "type": "CallToAction" }],
  "page": {
    "root": { "props": { "businessName": "Sok Sabay Café", "templateId": "iced-coffee", "address": "ផ្លូវសម្តេចទេពវង្ស ក្រុងសៀមរាប", "email": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "កាហ្វេក្តៅៗ នៅសៀមរាប" } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "មកលេងហាងយើង", "body": "", "buttonLabel": "ផ្ញើអ៊ីមែលមកយើង", "buttonAction": "email" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ប៊ូតុងនេះសម្រាប់ផ្ញើអ៊ីមែល ប៉ុន្តែគេហទំព័ររបស់អ្នកមិនទាន់មានអ៊ីមែលនៅឡើយទេ។ ខ្ញុំបានប្តូរវាឲ្យបង្ហាញផ្លូវមកហាងវិញ។",
    "operations": [
      { "op": "UPDATE", "component_id": "cta-1", "props": { "buttonLabel": "បង្ហាញផ្លូវមកហាង", "buttonAction": "directions" } }
    ]
  }
}
```
