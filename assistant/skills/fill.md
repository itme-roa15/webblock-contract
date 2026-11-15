---
name: "fill"
title: "Fill placeholders"
skill: "Fill placeholders"
group: "utility"
order: 4
command: "/fill"
aliases: []
args: null
blocks: ["*"]
triggers: ["fill", "fill in", "placeholder", "placeholders", "sample text", "finish my page", "បំពេញ", "អត្ថបទគំរូ"]
mode: "change"
maxTokens: 700
summary: "Fills sample text with your own details. Never makes up facts; asks instead."
summary_km: "ជំនួសអត្ថបទគំរូដោយព័ត៌មានរបស់អ្នកផ្ទាល់។ មិនប្រឌិតព័ត៌មានទេ តែសួរអ្នកវិញ។"
example: "/fill We deliver in Phnom Penh. Pay by cash or ABA."
example_km: "/fill យើងមានសេវា កាត់សក់ កក់សក់ និងកោរពុកមាត់"
km_reviewed: false
---

## Rules

- Find the placeholder text in the "@" blocks, or on the whole page when there are none: the editor's starter texts
  (the index's `placeholders`, taken from the catalog's defaults; AI Codegen gives that list with this skill) and
  anything else that asks for a fact.
- Fill a placeholder only with what the owner's message, the page or the business profile says. Never fill a price,
  opening hours, delivery area, payment method, service or number the owner didn't give.
- Leave every placeholder you can't fill as it is, and ask for each missing fact in the reply, one short question
  each.
- Never write Stats numbers or customer quotes: ask the owner to type them in the editor. Pictures are added in the
  editor, products in the Owner Portal.
- Phone, email, address and opening hours belong in the Owner Portal, whose details the live site shows: point the
  owner there instead of writing them on the page.
- When filling one item of a list (FAQ questions, service cards), send the whole list and keep the other items as
  they were.
- Write in the page's language and keep within each text's limit. Keep the owner's words for names, places and
  prices exactly as given.

## Examples

```json
{
  "message": "/fill We deliver anywhere in Phnom Penh within 3 days. Customers pay cash or ABA.",
  "page": {
    "root": { "props": { "businessName": "Bopha Tailor" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Dresses made to fit you" } },
      { "type": "Stats", "props": { "id": "stats-1", "items": [{ "value": "00", "label": "Your first number" }, { "value": "00", "label": "Your second number" }] } },
      { "type": "FAQ", "props": { "id": "faq-1", "heading": "Questions and answers", "items": [{ "question": "Do you deliver?", "answer": "Write how and where you deliver, and how long it takes." }, { "question": "How can I pay?", "answer": "List the ways customers can pay you." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I filled both FAQ answers from your message. Stats still shows \"00\": type your real numbers in the editor, or remove the block.",
    "operations": [
      { "op": "UPDATE", "component_id": "faq-1", "props": { "items": [{ "question": "Do you deliver?", "answer": "Yes, anywhere in Phnom Penh, within 3 days." }, { "question": "How can I pay?", "answer": "Cash or ABA." }] } }
    ]
  }
}
```

```json
{
  "message": "/fill យើងមានសេវា កាត់សក់បុរស កក់សក់ និងកោរពុកមាត់",
  "refs": [{ "id": "services-1", "type": "Services" }],
  "page": {
    "root": { "props": { "businessName": "Lucky Barber" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ហាងកាត់សក់បុរស Lucky Barber" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "សេវាកម្មរបស់យើង", "columns": "3", "items": [{ "icon": "star", "title": "Your first service", "text": "Say what it is and why customers like it." }, { "icon": "heart", "title": "Your second service", "text": "Say what it is and why customers like it." }, { "icon": "chat", "title": "Your third service", "text": "Say what it is and why customers like it." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានដាក់ឈ្មោះសេវាទាំងបីរបស់អ្នកលើកាតក្នុងប្លុក Services ហើយ។ អត្ថបទពិពណ៌នាខ្លីនៅតែជាអត្ថបទគំរូ។ សូមប្រាប់ខ្ញុំមួយឃ្លាអំពីសេវានីមួយៗ ខ្ញុំនឹងបំពេញឲ្យ។",
    "operations": [
      { "op": "UPDATE", "component_id": "services-1", "props": { "items": [{ "icon": "scissors", "title": "កាត់សក់បុរស", "text": "Say what it is and why customers like it." }, { "icon": "sparkle", "title": "កក់សក់", "text": "Say what it is and why customers like it." }, { "icon": "brush", "title": "កោរពុកមាត់", "text": "Say what it is and why customers like it." }] } }
    ]
  }
}
```
