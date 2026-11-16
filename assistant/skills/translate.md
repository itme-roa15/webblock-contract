---
name: "translate"
title: "Translate"
skill: "Translation"
group: "content"
order: 7
command: "/translate"
aliases: ["/tr"]
args: {"name": "language", "hint": "<language>", "hint_km": "<ភាសា>", "required": true}
blocks: ["*"]
triggers: ["translate", "in khmer", "in english", "in korean", "khmer version", "english version", "korean version", "បកប្រែ", "ជាភាសាខ្មែរ", "ជាភាសាអង់គ្លេស", "ជាភាសាកូរ៉េ", "한국어"]
mode: "change"
maxTokens: 1000
summary: "Translates your text into another language. Names and prices stay the same."
summary_km: "បកប្រែអត្ថបទរបស់អ្នកទៅភាសាផ្សេង។ ឈ្មោះ និងតម្លៃនៅដដែល។"
example: "/translate km with @Hero"
example_km: "/translate ខ្មែរ ផ្នែក @Hero"
km_reviewed: false
---

## Rules

- Translate the text of the "@" blocks, or of every block on the page when there are none, into the language
  given. "km", "khmer" and "ខ្មែរ" mean Khmer; "en", "english" and "អង់គ្លេស" mean English; "ko", "korean",
  "한국어" and "កូរ៉េ" mean Korean. Khmer, English and Korean come first; other languages (Chinese, Thai,
  Vietnamese…) are fine when asked. When the language is unclear, ask and change nothing.
- Translate the meaning naturally, not word for word, in the words a customer would use. Khmer gets its own
  punctuation (។) and everyday word choice. Korean uses the polite style a shop uses with customers (합니다 or 해요),
  in Hangul.
- Keep brand, business and product names exactly as written. A place keeps its own name: write it the way the
  other language already spells it (Toul Kork ↔ ទួលគោក, សៀមរាប ↔ Siem Reap), never by its meaning; when you don't
  know that spelling, keep it as written.
- Keep every number, price, phone number and time as written: digits stay digits and USD is never turned into riel.
- Stay within each prop's limit. Khmer often runs longer, so choose shorter words rather than dropping a fact.
- Keep each button's action. Without "@" blocks, also translate the header badge and the opening hours text, but
  leave the business name, address, phones and links as they are.
- Never translate props the assistant may not write: customer quotes, Stats numbers, products and Gallery picture
  captions stay as they are. Say so in the reply (products are changed in the Owner Portal).

## Examples

```json
{
  "message": "/translate km",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Sugar & Crumb", "address": "St. 315, Toul Kork, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "eyebrow": "Family bakery", "heading": "Fresh bread every morning", "description": "Cakes and bread baked by hand every day at our shop in Toul Kork.", "primaryLabel": "See our cakes", "primaryAction": "shop", "secondaryLabel": "Get directions", "secondaryAction": "directions" } },
      { "type": "ProductCards", "props": { "id": "products-1", "heading": "Our cakes" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "Baked with love in Phnom Penh" } }
    ]
  },
  "output": {
    "reply": "I translated the Hero into Khmer. \"Sugar & Crumb\" stays as it is, and the buttons go to the same places.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "eyebrow": "ហាងនំគ្រួសារ", "heading": "នំប៉័ងស្រស់ៗរៀងរាល់ព្រឹក", "description": "នំខេក និងនំប៉័ងធ្វើដោយដៃរៀងរាល់ថ្ងៃ នៅហាងរបស់យើងក្នុងទួលគោក។", "primaryLabel": "មើលនំខេករបស់យើង", "secondaryLabel": "បង្ហាញផ្លូវ" } }
    ]
  }
}
```

```json
{
  "message": "/translate english",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Bopha Beauty", "address": "ផ្លូវសម្តេចទេពវង្ស ក្រុងសៀមរាប" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ស្អាតសម្រាប់ថ្ងៃពិសេសរបស់អ្នក" } },
      { "type": "About", "props": { "id": "about-1", "eyebrow": "", "heading": "អំពីយើង", "body": "ហាង Bopha Beauty ស្ថិតនៅក្រុងសៀមរាប។ យើងកាត់សក់ ធ្វើក្រចក និងតុបតែងមុខសម្រាប់ពិធីមង្គលការ។", "caption": "" } },
      { "type": "Testimonials", "props": { "id": "testimonials-1", "heading": "មតិអតិថិជន", "items": [{ "quote": "សេវាល្អណាស់!", "name": "ស្រីនាង" }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I translated the About block into English. Bopha Beauty stays as it is.",
    "operations": [
      { "op": "UPDATE", "component_id": "about-1", "props": { "heading": "About us", "body": "Bopha Beauty is in Siem Reap. We do haircuts, nails and wedding make-up." } }
    ]
  }
}
```

```json
{
  "message": "/translate korean",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Lotus Touch Spa", "address": "St. 63, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "eyebrow": "Massage and spa", "heading": "Relax and feel better", "description": "Traditional Khmer massage by trained therapists at Lotus Touch Spa. Open every day from 9:00 to 21:00.", "primaryLabel": "Book a massage", "primaryAction": "visit", "secondaryLabel": "Call us", "secondaryAction": "call" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I translated the Hero into Korean. \"Lotus Touch Spa\" and the opening hours stay as they are, and the buttons go to the same places.",
    "operations": [
      { "op": "UPDATE", "component_id": "hero-1", "props": { "eyebrow": "마사지 & 스파", "heading": "편안하게 쉬어 가세요", "description": "Lotus Touch Spa의 전문 테라피스트가 전통 크메르 마사지를 해 드립니다. 매일 9:00부터 21:00까지 영업합니다.", "primaryLabel": "마사지 예약하기", "secondaryLabel": "전화하기" } }
    ]
  }
}
```
