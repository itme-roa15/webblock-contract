---
name: "promo"
title: "Promotion"
skill: "Promotion"
group: "design"
order: 9
command: "/promo"
aliases: ["/sale"]
args: {"name": "occasion", "hint": "Khmer New Year, Pchum Ben, a sale…", "hint_km": "ចូលឆ្នាំខ្មែរ ភ្ជុំបិណ្ឌ ការលក់បញ្ចុះតម្លៃ…", "required": true}
blocks: ["CallToAction"]
triggers: ["promo", "promotion", "sale", "discount", "offer", "holiday", "khmer new year", "pchum ben", "ប្រូម៉ូសិន", "បញ្ចុះតម្លៃ", "ចូលឆ្នាំ", "ភ្ជុំបិណ្ឌ", "ថ្ងៃបុណ្យ"]
mode: "change"
maxTokens: 500
summary: "Adds a holiday or sale banner. Asks for your offer, never makes up a discount."
summary_km: "បន្ថែមផ្ទាំងផ្សព្វផ្សាយសម្រាប់ថ្ងៃបុណ្យ ឬការបញ្ចុះតម្លៃ។ វាសួររកការផ្តល់ជូនរបស់អ្នក មិនប្រឌិតការបញ្ចុះតម្លៃទេ។"
example: "/promo Khmer New Year"
example_km: "/promo ភ្ជុំបិណ្ឌ"
km_reviewed: false
---

## Rules

- Add one Call to action (or a Text, when there is no button to give) for the occasion, right under the Hero, with
  every prop filled. With three Call to action blocks already (or 16 blocks at the top level), update the "@" one
  instead; with no
  "@" block, propose nothing and ask which banner to reuse.
- The offer, its amount, what it covers and its dates come only from the owner. Without them, the line is a
  placeholder that asks for the real offer, and the reply asks for it.
- Name the occasion in the eyebrow (Khmer New Year, Pchum Ben, Water Festival, Christmas, a sale) and keep the
  heading short and festive without claims.
- The button goes where the offer can be used: shop for products, visit or directions for the shop, call for
  orders by phone.
- Write in the page's language. Never touch prices in products: a discount only lives in the banner's words.
- End the reply by reminding the owner to remove the banner when the occasion is over.

## Examples

```json
{
  "message": "/promo Khmer New Year",
  "page": {
    "root": { "props": { "businessName": "Sokha Fashion", "templateId": "jackets", "address": "Olympic Market, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Everyday clothes for the whole family" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "New this week", "columns": "3" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Find us at Olympic Market" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added a Khmer New Year banner under the Hero. What is your offer, and until when? I left a line for it. Remove the banner after the holiday.",
    "operations": [
      { "op": "ADD", "component_type": "CallToAction", "position": { "parentId": null, "slot": null, "index": 1 }, "props": { "eyebrow": "Khmer New Year", "heading": "Celebrate the New Year with us", "body": "Write your real offer here: what is discounted, by how much, and until when.", "buttonLabel": "Shop now", "buttonAction": "shop", "align": "center", "spacing": "normal" } }
    ]
  }
}
```

```json
{
  "message": "/promo ភ្ជុំបិណ្ឌ បញ្ចុះតម្លៃ 10% លើនំទាំងអស់ ពីថ្ងៃទី 20 ដល់ 22 ខែកញ្ញា",
  "page": {
    "root": { "props": { "businessName": "Malis Cakes", "templateId": "sweet-pastel", "address": "ផ្សារទួលទំពូង ភ្នំពេញ" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "នំខេកធ្វើដោយដៃរាល់ថ្ងៃ" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "នំពេញនិយម", "columns": "3" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានបន្ថែមផ្ទាំងផ្សព្វផ្សាយភ្ជុំបិណ្ឌនៅក្រោម Hero ជាមួយការបញ្ចុះតម្លៃ 10% របស់អ្នក។ កុំភ្លេចលុបវាចេញក្រោយថ្ងៃទី 22 ខែកញ្ញា។",
    "operations": [
      { "op": "ADD", "component_type": "CallToAction", "position": { "parentId": null, "slot": null, "index": 1 }, "props": { "eyebrow": "ភ្ជុំបិណ្ឌ", "heading": "បញ្ចុះតម្លៃ 10% លើនំទាំងអស់", "body": "ចាប់ពីថ្ងៃទី 20 ដល់ថ្ងៃទី 22 ខែកញ្ញា។", "buttonLabel": "មើលនំរបស់យើង", "buttonAction": "shop", "align": "center", "spacing": "normal" } }
    ]
  }
}
```
