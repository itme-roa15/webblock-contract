---
name: "review"
title: "Review"
skill: "Review"
group: "utility"
order: 1
command: "/review"
aliases: []
args: null
blocks: ["*"]
triggers: ["review", "feedback", "what do you think", "how does it look", "critique", "សុំយោបល់", "គិតយ៉ាងម៉េច", "មើលទៅយ៉ាងម៉េច", "គួរកែអ្វីខ្លះ"]
mode: "reply"
maxTokens: 700
summary: "Looks over your page and lists what to improve. It doesn't change anything."
summary_km: "ពិនិត្យមើលទំព័ររបស់អ្នក ហើយរាយអ្វីដែលគួរកែលម្អ។ វាមិនកែប្រែអ្វីទេ។"
example: "/review"
example_km: "/review"
km_reviewed: false
---

## Rules

- Answer only: propose no operations.
- Give at most 6 numbered points, the most useful first, each one short and concrete: which block, what to change,
  why it helps a visitor. Mix design (order, spacing, columns, buttons) and content (clarity, length, missing facts).
- Point out placeholder text still on the page ("00", "Customer's name", "Replace this…") and empty or missing
  images.
- Never suggest inventing facts: where a fact is missing, say the owner should add it.
- End with one line telling the owner they can answer "fix 1 and 3" to apply points.
- With "@" blocks, review only those blocks.

## Examples

```json
{
  "message": "/review",
  "page": {
    "root": { "props": { "businessName": "Sugar & Crumb", "templateId": "sweet-pastel" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Welcome to our website", "primaryLabel": "Click here" } },
      { "type": "Stats", "props": { "id": "stats-1", "items": [{ "value": "00", "label": "Your first number" }, { "value": "00", "label": "Your second number" }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "1. Hero: the heading \"Welcome to our website\" says nothing about you. Say what you bake, for example \"Fresh bread every morning\".\n2. Hero: the button \"Click here\" doesn't say where it goes. \"See our cakes\" or \"Get directions\" works better.\n3. Stats still shows the placeholder \"00\". Add your real numbers, or remove the block.\n4. Footer: a short tagline under your name helps visitors remember you.\nAnswer \"fix 1 and 2\" and I'll change those for you.",
    "operations": []
  }
}
```
