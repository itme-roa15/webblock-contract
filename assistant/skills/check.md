---
name: "check"
title: "Pre-deploy check"
skill: "Pre-deploy check"
group: "utility"
order: 3
command: "/check"
aliases: ["/ready"]
args: null
blocks: ["*"]
triggers: ["check my page", "ready to deploy", "ready to publish", "before I deploy", "anything missing", "is it ready", "រួចរាល់ហើយឬនៅ", "ខ្វះអ្វី", "មុនដាក់ផ្សាយ", "អាចដាក់ផ្សាយបានទេ"]
mode: "reply"
maxTokens: 600
summary: "Checks your page before you deploy and lists what's unfinished. Only answers."
summary_km: "ពិនិត្យទំព័រមុនពេលដាក់ផ្សាយ ហើយរាយអ្វីដែលមិនទាន់រួចរាល់។ គ្រាន់តែឆ្លើយ មិនកែប្រែទំព័រទេ។"
example: "/check"
example_km: "/check"
km_reviewed: false
---

## Rules

- Answer only: propose no operations. Check the whole page, or only the "@" blocks when there are some.
- Look for the editor's starter texts still on the page: the index's `placeholders` (each starter text, taken from
  the catalog's defaults, with the prop it starts in). AI Codegen gives that list with this skill.
- Look for empty blocks (product blocks with no products, a Text with no body) and missing pictures (no Hero or
  About picture, Gallery pictures still empty).
- Look for text too long to read well on a phone: a Hero heading over about 40 characters, or a text that fills its
  whole limit.
- Check every button's target: "call" needs a phone, "email" needs an email, "directions" needs an address (in the
  page details or the business profile), "visit" needs a Visit us block, "shop" needs a product block.
- When nothing is found, say in one line that the page is ready to deploy. Otherwise give a numbered list (at most
  8, the most visible first): the block, the problem, and who fixes it. /fill fills text; numbers, customer quotes
  and pictures are typed or added in the editor; products, phone and address go in the Owner Portal.
- Never suggest made-up content to cover a gap: a missing fact is for the owner to give.

## Examples

```json
{
  "message": "/check",
  "page": {
    "root": { "props": { "businessName": "Lucky Phone Repair", "address": "No. 45, Street 182, Phnom Penh", "phones": [], "email": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Phone screens fixed while you wait", "primaryLabel": "Call us now", "primaryAction": "call", "imageUrl": null } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we fix", "items": [{ "icon": "shield", "title": "Screen repair", "text": "Cracked screens replaced on most phones." }, { "icon": "star", "title": "Your second service", "text": "Say what it is and why customers like it." }] } },
      { "type": "Testimonials", "props": { "id": "testimonials-1", "heading": "What our customers say", "items": [{ "quote": "Replace this with words a real customer said about you.", "name": "Customer’s name", "role": "", "photoUrl": null }] } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "Questions about your phone?", "body": "Send us a message.", "buttonLabel": "Email us", "buttonAction": "email" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Not ready yet:\n1. Hero: the \"Call us now\" button has no phone to call. Add your phone in the Owner Portal.\n2. Hero: there is no picture yet. Add one in the editor.\n3. Services: the second card is still \"Your second service\". Use /fill and tell me what it is.\n4. Testimonials still shows the sample quote. Type a real customer's words in the editor, or remove the block.\n5. Call to action: \"Email us\" has no email to send to. Add your email, or choose another button.",
    "operations": []
  }
}
```

```json
{
  "message": "/check តើទំព័ររបស់ខ្ញុំរួចរាល់ហើយឬនៅ?",
  "page": {
    "root": { "props": { "businessName": "នំបញ្ចុក យាយខេង", "address": "ផ្សារដើមគរ ភ្នំពេញ", "phones": [{ "number": "012 345 678" }], "email": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "នំបញ្ចុកសម្លខ្មែរ ធ្វើថ្មីរៀងរាល់ព្រឹក", "primaryLabel": "បង្ហាញផ្លូវ", "primaryAction": "directions", "imageUrl": "/uploads/num-banhchok.jpg" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "មកញ៉ាំជាមួយយើង" } },
      { "type": "CallToAction", "props": { "id": "cta-1", "heading": "កុម្ម៉ង់សម្រាប់ពិធីបុណ្យ", "body": "ទូរស័ព្ទមកយើង ដើម្បីកុម្ម៉ង់។", "buttonLabel": "ទូរស័ព្ទមក", "buttonAction": "call" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "រសជាតិខ្មែរពិតៗ" } }
    ]
  },
  "output": {
    "reply": "ទំព័ររបស់អ្នករួចរាល់ អាចដាក់ផ្សាយបានហើយ។ គ្មានអត្ថបទគំរូ ឬរូបភាពខ្វះទេ ហើយប៊ូតុងនីមួយៗមានលេខទូរស័ព្ទ ឬអាសយដ្ឋានដែលវាត្រូវការ។",
    "operations": []
  }
}
```
