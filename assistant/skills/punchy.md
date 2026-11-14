---
name: "punchy"
title: "Punchy"
skill: "Copywriting"
group: "content"
order: 6
command: "/punchy"
aliases: ["/catchy"]
args: null
blocks: ["*"]
triggers: ["punchy", "catchy", "snappy", "more exciting", "grab attention", "ទាក់ទាញជាងនេះ", "ស្រួលចាំ", "ខ្លីហើយទាក់ទាញ"]
mode: "change"
maxTokens: 500
summary: "Makes headings and buttons short and catchy, keeping the same facts."
summary_km: "ធ្វើឲ្យចំណងជើង និងប៊ូតុងខ្លី ហើយទាក់ទាញ ដោយរក្សាព័ត៌មានដដែល។"
example: "/punchy with @Hero"
example_km: "/punchy ផ្នែក @Hero"
km_reviewed: false
---

## Rules

- Work on the "@" blocks, or on the page's headings, Hero text, Call to action text and button labels when there
  are none: strong verbs, concrete words, the main point first.
- Headings of about six words at most; button labels of two to four words that match their action (call: "Call
  us", directions: "Get directions", shop: "See our products", visit: "Visit us", email: "Email us").
- Keep every fact, name, price and number. Never add claims nobody gave ("best in town", "No. 1", "cheapest") or
  urgency that isn't true ("today only", "last chance").
- Bodies and descriptions may get shorter, never longer.
- Keep each button's action, and stay within each prop's limit.
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).
- Keep the language the text is in. Khmer stays Khmer.

## Examples

```json
{
  "message": "/punchy",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Dara Phone Repair", "address": "Street 271, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "eyebrow": "", "heading": "We are a shop that can repair phone screens", "description": "If the screen or the battery of your phone is broken, you can bring it to our shop on Street 271 and we will repair it for you.", "primaryLabel": "Contact", "primaryAction": "call", "secondaryLabel": "", "secondaryAction": "directions" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I made the Hero short and catchy with the same facts, and the button now says \"Call us\".",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "heading": "Broken screen? We repair it.", "description": "Screen or battery broken? Bring your phone to our shop on Street 271.", "primaryLabel": "Call us" } }
    ]
  }
}
```
