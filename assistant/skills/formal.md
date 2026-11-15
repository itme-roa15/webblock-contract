---
name: "formal"
title: "Formal"
skill: "Copywriting"
group: "content"
order: 5
command: "/formal"
aliases: ["/professional"]
args: null
blocks: ["*"]
triggers: ["formal", "professional", "more serious", "polite", "business tone", "ផ្លូវការ", "វិជ្ជាជីវៈ", "គួរសម"]
mode: "change"
maxTokens: 600
summary: "Makes the text polite and professional, keeping the same facts."
summary_km: "ធ្វើឲ្យអត្ថបទគួរសម និងមានលក្ខណៈវិជ្ជាជីវៈ ដោយរក្សាព័ត៌មានដដែល។"
example: "/formal with @About"
example_km: "/formal ផ្នែក @About"
km_reviewed: false
---

## Rules

- Rewrite the "@" blocks, or the whole page when there are none, in a polite and professional voice: complete
  sentences, no slang, no exclamation marks, no emoji.
- Keep every fact, name, price and number; only the tone changes. A vague promise in the old text ("come
  anytime") becomes a polite invitation, never a new fact such as opening hours.
- Professional is not stiff: keep plain words and short sentences, and add no jargon or long titles.
- In Khmer, use respectful standard written Khmer (លោកអ្នក, សូម) instead of spoken shortcuts.
- Keep each button's action, and stay within each prop's limit.
- Never touch props the assistant may not write (customer quotes, Stats numbers, products, images).
- Keep the language the text is in.

## Examples

```json
{
  "message": "Make it sound more professional, we're a clinic",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Smile Dental Clinic", "address": "Street 63, BKK1, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Dental care in BKK1" } },
      { "type": "About", "props": { "id": "about-1", "eyebrow": "", "heading": "Hey, it's us!", "body": "We fix teeth and make them super white!! Come see us anytime lol", "caption": "" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I rewrote the About block in a polite, professional tone. Your facts are the same.",
    "operations": [
      { "op": "UPDATE", "component_id": "about-1", "props": { "heading": "About our clinic", "body": "We provide dental treatment and teeth whitening. You are welcome to visit our clinic." } }
    ]
  }
}
```
