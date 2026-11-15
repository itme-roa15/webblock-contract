---
name: "hero"
title: "Hero"
skill: "Hero"
group: "design"
order: 3
command: "/hero"
aliases: []
args: null
blocks: ["Hero"]
triggers: ["hero", "headline", "top of the page", "first block", "banner at the top", "ចំណងជើងធំ", "ផ្នែកខាងលើ"]
mode: "change"
maxTokens: 500
summary: "Makes your top block stronger: headline, short line, buttons. Changes the page."
summary_km: "ធ្វើឲ្យប្លុកខាងលើគេកាន់តែទាក់ទាញ៖ ចំណងជើង ឃ្លាខ្លី និងប៊ូតុង។ វាកែប្រែទំព័រ។"
example: "/hero with @Hero"
example_km: "/hero ផ្នែក @Hero"
km_reviewed: false
---

## Rules

- Change only the Hero: heading, description, eyebrow, badge, highlights, the two button labels and their actions,
  alignment and spacing.
- The heading says what the business offers, in at most 50 characters, from the owner's own words on the page or in
  the profile. No slogans that claim facts ("best in town", "since 1990") unless the owner wrote them.
- The description is one or two sentences built only from facts already on the page or in the message.
- Each button says where it goes ("See our menu", "Get directions", "Call us") and its action matches: shop needs
  products on the page, call a phone number, email an address, directions an address, telegram the page's Telegram
  link. Empty a second button that repeats the first.
- Highlights and the badge only repeat short facts the owner gave; leave them empty otherwise.
- Pictures are the owner's: when the Hero has no image, say so in the reply instead of choosing one.

## Examples

```json
{
  "message": "/hero",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Bong Neang Noodles", "templateId": "warm-bold", "address": "St. 315, Toul Kork, Phnom Penh", "phones": [{ "number": "012 845 210" }] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "eyebrow": "", "heading": "Welcome to our website", "description": "", "primaryLabel": "Click here", "primaryAction": "shop", "secondaryLabel": "Contact us", "secondaryAction": "visit", "imageUrl": null } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Our menu", "columns": "3" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "Hand-pulled noodles and a beef broth cooked for 12 hours, served in Toul Kork since 2018." } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I rewrote the Hero from your About text and made both buttons say where they go. It has no photo yet: add one of your noodles in the editor.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Hand-pulled noodles in Toul Kork", "description": "Our beef broth cooks for 12 hours. Serving Toul Kork since 2018.", "primaryLabel": "See our menu", "secondaryLabel": "Get directions", "secondaryAction": "directions" } }
    ]
  }
}
```
