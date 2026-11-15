---
name: "explain"
title: "Explain"
skill: "Explain"
group: "utility"
order: 5
command: "/explain"
aliases: ["/what"]
args: null
blocks: ["*"]
triggers: ["explain", "what does", "what is this", "what's this for", "ពន្យល់", "មានន័យថាម៉េច", "មានន័យថាអ្វី", "សម្រាប់ធ្វើអ្វី"]
mode: "reply"
maxTokens: 400
summary: "Explains what a block or setting does, in plain words. Only answers."
summary_km: "ពន្យល់ជាពាក្យសាមញ្ញថា ប្លុក ឬការកំណត់មួយធ្វើអ្វី។ គ្រាន់តែឆ្លើយ មិនកែប្រែទំព័រទេ។"
example: "/explain with @VisitUs"
example_km: "/explain តើ @AllProducts ធ្វើអ្វី?"
km_reviewed: false
---

## Rules

- Answer only: propose no operations.
- Explain the "@" blocks, or the setting the owner names (colours, font, button style, a button's target): what
  visitors see, and what the owner can change in it.
- Say where its facts come from when that matters: address, hours and phone from the page details (the Owner Portal
  on the live site), products and prices from the Owner Portal, numbers, customer quotes and pictures typed or added
  in the editor.
- Explain only what the editor really has. When the owner asks for something it doesn't have (a second page, a
  WhatsApp link, a web address on a Hero or Call to action button: only the Buttons and Image banner blocks take
  one), say so plainly.
- Two to four short sentences in the owner's language, with the names the owner sees in the editor. No technical
  words.
- Where it helps, end with what WebBlock AI can do for that block, for example "/rewrite" or "/fill".

## Examples

```json
{
  "message": "What is this block for?",
  "refs": [{ "id": "visit-1", "type": "VisitUs" }],
  "page": {
    "root": { "props": { "businessName": "Sokha Coffee", "address": "Street 08, near Pub Street, Siem Reap", "hours": "7:00 – 21:00" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Iced coffee and fresh croissants" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Come and see us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Visit us shows your address, opening hours, phone and a map, so people can find you. Here you only change its heading and layout. The address, hours and phone come from your business details, and the live site uses the ones in the Owner Portal.",
    "operations": []
  }
}
```

```json
{
  "message": "/explain តើប្លុកនេះធ្វើអ្វី? ហេតុអ្វី AI មិនបន្ថែមផលិតផលឲ្យខ្ញុំ?",
  "refs": [{ "id": "all-products-1", "type": "AllProducts" }],
  "page": {
    "root": { "props": { "businessName": "Chantrea Fashion" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "សម្លៀកបំពាក់នារីទាន់សម័យ" } },
      { "type": "AllProducts", "props": { "id": "all-products-1", "heading": "ផលិតផលទាំងអស់", "pageSize": 6 } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ប្លុកនេះបង្ហាញផលិតផលទាំងអស់របស់អ្នក ជាមួយប្រអប់ស្វែងរក និងប៊ូតុងសម្រាប់រើសតាមប្រភេទ។ ផលិតផល និងតម្លៃមកពី Owner Portal ដូច្នេះ AI មិនអាចបន្ថែម ឬកែវាបានទេ សូមបន្ថែមវានៅទីនោះ។ ចំនួនផលិតផលក្នុងមួយទំព័រ អ្នកអាចកំណត់បាននៅក្នុងកម្មវិធីកែ។",
    "operations": []
  }
}
```
