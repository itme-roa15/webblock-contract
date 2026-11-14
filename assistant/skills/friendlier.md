---
name: "friendlier"
title: "Friendlier"
skill: "Copywriting"
group: "content"
order: 4
command: "/friendlier"
aliases: ["/friendly"]
args: null
blocks: ["*"]
triggers: ["friendlier", "friendly", "warmer", "more welcoming", "too cold", "រួសរាយ", "រាក់ទាក់", "ស្និទ្ធស្នាល"]
mode: "change"
maxTokens: 600
summary: "Makes the text warmer and more welcoming, keeping the same facts."
summary_km: "ធ្វើឲ្យអត្ថបទរួសរាយ និងកក់ក្តៅជាងមុន ដោយរក្សាព័ត៌មានដដែល។"
example: "/friendlier with @CallToAction"
example_km: "/friendlier ផ្នែក @CallToAction"
km_reviewed: false
---

## Rules

- Rewrite the "@" blocks, or the whole page when there are none, in a warm and welcoming voice: speak to the
  customer ("you", "we"), keep sentences short, and greet or invite where it fits.
- Keep every fact, name, price and number; only the tone changes.
- Friendly, not silly: no slang, at most one exclamation mark per block, and no emoji unless the page already uses
  them.
- In Khmer, use polite and warm words that suit customers of every age (សូមស្វាគមន៍, បងប្អូន, រីករាយ).
- Keep each button's action, and stay within each prop's limit.
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).
- Keep the language the text is in.

## Examples

```json
{
  "message": "សូមធ្វើឲ្យផ្នែកនេះរួសរាយជាងនេះ",
  "refs": [{ "id": "cta-1", "type": "CallToAction" }],
  "page": {
    "root": { "props": { "businessName": "នំបញ្ចុកយាយហៀង", "phones": [{ "number": "012 345 678" }] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "នំបញ្ចុកសម្លខ្មែរ" } },
      { "type": "CallToAction", "props": { "id": "cta-1", "eyebrow": "", "heading": "កុម្ម៉ង់នំបញ្ចុក", "body": "ហាងបើករាល់ថ្ងៃ។ ទូរស័ព្ទមកកុម្ម៉ង់។", "buttonLabel": "ទូរស័ព្ទ", "buttonAction": "call" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានកែផ្នែក Call to action ឲ្យស្តាប់ទៅរួសរាយជាងមុន ហើយព័ត៌មាននៅដដែល។",
    "operations": [
      { "op": "UPDATE", "component_id": "cta-1", "props": { "heading": "ឃ្លាននំបញ្ចុកហើយឬនៅ?", "body": "យើងបើករៀងរាល់ថ្ងៃ។ សូមទូរស័ព្ទមកកុម្ម៉ង់ យើងរីករាយនឹងបម្រើបងប្អូន!", "buttonLabel": "ទូរស័ព្ទមកយើង" } }
    ]
  }
}
```
