---
name: "cta"
title: "Buttons"
skill: "Call to action"
group: "design"
order: 7
command: "/cta"
aliases: []
args: {"name": "goal", "hint": "shop, visit, call, email, directions or telegram", "hint_km": "ទិញ មកលេងហាង ទូរស័ព្ទ អ៊ីមែល បង្ហាញផ្លូវ ឬ Telegram", "required": false}
blocks: ["CallToAction", "Hero", "Buttons", "ImageBanner"]
triggers: ["button", "call to action", "cta", "more calls", "more orders", "get people to", "telegram", "ប៊ូតុង", "ឲ្យភ្ញៀវទូរស័ព្ទមក", "ឲ្យភ្ញៀវកុម្ម៉ង់", "តេឡេក្រាម"]
mode: "change"
maxTokens: 500
summary: "Makes your buttons clear and sends them to the right place. Changes the page."
summary_km: "ធ្វើឲ្យប៊ូតុងរបស់អ្នកច្បាស់ ហើយនាំភ្ញៀវទៅកន្លែងត្រឹមត្រូវ។ វាកែប្រែទំព័រ។"
example: "/cta more phone calls"
example_km: "/cta ចង់ឲ្យភ្ញៀវទូរស័ព្ទមកច្រើនជាងនេះ"
km_reviewed: false
---

## Rules

- Work on the buttons of the Hero, Call to action, Buttons and Image banner blocks (the "@" ones, or all of them):
  label, target, and the Call to action's heading and line.
- A button goes to shop, visit, call, email, directions or telegram, and only where the page can follow: shop needs
  products, call a phone number, email an email address, directions an address, visit a Visit us block, telegram the
  page's Telegram link (`telegramUrl`). Fix a button that points nowhere and say why.
- Telegram: use the telegram target ("Message us on Telegram") only when the page has a Telegram link. Without one,
  propose no Telegram button: ask the owner to add their link (https://t.me/…) in the editor's page settings, which
  the assistant can't set.
- A Buttons or Image banner button may also go to an `https://` address the owner gave in the message or that is
  already on the page (their Facebook page, for example); never an address you made up. Hero and Call to action
  buttons take the targets above only.
- Never WhatsApp (wa.me, whatsapp.com, whatsapp.net, wa.link): WebBlock sites can't link to it. Say so, and offer
  Telegram or a phone call instead.
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

```json
{
  "message": "/cta I want people to message us on Telegram",
  "page": {
    "root": { "props": { "businessName": "Rumdoul Flowers", "address": "Street 432, Toul Tom Poung, Phnom Penh", "phones": [{ "number": "012 432 432" }], "telegramUrl": "https://t.me/rumdoulflowers" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh flowers for every day", "primaryLabel": "See our flowers", "primaryAction": "shop", "secondaryLabel": "Call us", "secondaryAction": "call" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Bouquets", "columns": "3" } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "Flowers for any day", "body": "Order your bouquet today.", "buttonLabel": "Call us", "buttonAction": "call" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "The Hero's second button and the banner now open your Telegram chat. The main button still shows your flowers.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "secondaryLabel": "Message us on Telegram", "secondaryAction": "telegram" } },
      { "op": "UPDATE", "component_id": "cta-1", "props": { "heading": "Order your bouquet on Telegram", "body": "Send us a message with the flowers you'd like.", "buttonLabel": "Message us on Telegram", "buttonAction": "telegram" } }
    ]
  }
}
```

```json
{
  "message": "/cta ដាក់ប៊ូតុង WhatsApp",
  "page": {
    "root": { "props": { "businessName": "Sok Sabay Café", "address": "ផ្លូវសម្តេចទេពវង្ស ក្រុងសៀមរាប", "phones": [{ "number": "012 777 888" }], "telegramUrl": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "កាហ្វេក្តៅៗ នៅសៀមរាប", "primaryLabel": "បង្ហាញផ្លូវ", "primaryAction": "directions" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "គេហទំព័រ WebBlock មិនអាចភ្ជាប់ទៅ WhatsApp បានទេ។ បើអ្នកប្រើ Telegram សូមបញ្ចូលតំណ Telegram របស់អ្នក (https://t.me/…) ក្នុងការកំណត់ទំព័រ រួចសួរខ្ញុំម្តងទៀត។ ឬខ្ញុំអាចដាក់ប៊ូតុងឲ្យភ្ញៀវទូរស័ព្ទមកអ្នក។",
    "operations": []
  }
}
```

```json
{
  "message": "/cta add a button to our Facebook page",
  "refs": [{ "id": "buttons-1", "type": "Buttons" }],
  "page": {
    "root": { "props": { "businessName": "Kampot Pepper House", "facebookUrl": "https://www.facebook.com/kampotpepperhouse" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Kampot pepper from our farm" } },
      { "type": "Buttons", "props": { "id": "buttons-1", "items": [{ "label": "See our pepper", "link": "shop", "style": "primary" }], "size": "medium", "align": "center" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added a second button that opens your Facebook page, next to \"See our pepper\".",
    "operations": [
      { "op": "UPDATE", "component_id": "buttons-1", "props": { "items": [{ "label": "See our pepper", "link": "shop", "style": "primary" }, { "label": "Our Facebook page", "link": "https://www.facebook.com/kampotpepperhouse", "style": "outline" }] } }
    ]
  }
}
```
