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

- Answer only: propose no operations. Check the whole page, or only the "@" blocks when there are some (with an "@"
  container, the blocks inside it too). Check blocks inside containers at every depth.
- Look for the editor's starter texts still on the page: the index's `placeholders` (each starter text, taken from
  the catalog's defaults, with the prop it starts in). AI Codegen gives that list with this skill. In a Rich text
  block, any text run that equals a listed text is still starter text.
- Look for empty blocks (a Text with no body, a container with nothing inside) and missing pictures (no Hero or
  About picture, Gallery pictures or an Image still empty).
- Look for text too long to read well on a phone: a Hero heading over about 40 characters, or a text that fills its
  whole limit.
- Check every button's target: "call" needs a phone, "email" needs an email, "directions" needs an address (in the
  page details or the business profile), "visit" needs a Visit us block, "shop" needs a product block, and
  "telegram" needs the page's Telegram link (`telegramUrl`): without it the button only falls back to the Telegram
  username or to Visit us, so report it.
- Check the page's Facebook and Instagram links (`facebookUrl`, `instagramUrl`) and report first: the Facebook or
  Instagram link is a WhatsApp address (a host of the catalog's `page.links.blockedHosts`), or holds "@", "%", "\" or
  a letter outside A–Z before its first "/": change it in the editor's page settings (the page no longer saves until
  then, the assistant's changes included).
- Check the products to show, against what AI Codegen gives with the page (`catalog`: the website's `categories`,
  and `goneProductIds`, the picks that are no longer products of the website). Category names match ignoring case
  ("coffee" is Coffee). Without `categories`, report no category as unknown.
  - a picked product in `goneProductIds`: it drops out of the block;
  - a `category` or `defaultCategory` that is not one of the website's categories: an unknown category shows no
    products, and an unknown tab opens on All;
  - a `defaultCategory` that never applies: an All products block on category shows no tabs and ignores it;
  - a product block that shows no products: category with an empty or unknown category, picked with no picks or
    every pick in `goneProductIds`, or an empty catalog.
- When nothing is found, say in one line that the page is ready to deploy. Otherwise give a numbered list (at most
  8, the most visible first): the block, the problem, and who fixes it. /fill fills text; /products sets which
  products show; numbers, customer quotes, pictures, picks and the Telegram, Facebook and Instagram links are typed
  or added in the editor; products, phone and address go in the Owner Portal.
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

```json
{
  "message": "/check",
  "catalog": {
    "categories": ["Coffee", "Tea"],
    "goneProductIds": ["01937c3e-5a2b-7c4d-8e9f-0a1b2c3d4e5f"]
  },
  "page": {
    "root": { "props": { "businessName": "Sokha Coffee", "address": "Street 08, near Pub Street, Siem Reap", "phones": [{ "number": "012 080 808" }], "telegram": "", "telegramUrl": "" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Iced coffee near Pub Street", "primaryLabel": "Message us on Telegram", "primaryAction": "telegram", "imageUrl": "/media/hero.jpg" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Our favourites", "columns": "2", "source": "picked", "productIds": ["0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d", "01937c3e-5a2b-7c4d-8e9f-0a1b2c3d4e5f"] } },
      { "type": "ProductCards", "props": { "id": "cards-2", "heading": "Cakes", "columns": "3", "source": "category", "category": "Cakes" } },
      { "type": "AllProducts", "props": { "id": "all-1", "heading": "Full menu", "columns": "3", "pageSize": 12, "source": "all", "defaultCategory": "Smoothies" } },
      { "type": "Section", "props": { "id": "section-1", "background": "muted", "content": [
        { "type": "Heading", "props": { "id": "heading-1", "text": "Our story", "level": "2", "size": "large", "align": "left", "tone": "default" } },
        { "type": "RichText", "props": { "id": "richtext-1", "body": { "type": "doc", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Write a few sentences here. Select words to make them bold, italic or a link." }] }] }, "align": "left", "size": "normal" } }
      ] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Not ready yet:\n1. Hero: \"Message us on Telegram\" has no Telegram link to open. Add your link (https://t.me/…) in the editor's page settings, or choose another button.\n2. Product Cards \"Our favourites\": 1 picked product is no longer in your catalog. Remove it in the editor's product picker.\n3. Product Cards \"Cakes\": \"Cakes\" isn't one of your categories (Coffee, Tea), so the block shows no products. Use /products to choose a category, or show all.\n4. All products opens on \"Smoothies\", which isn't one of your categories, so it opens on All. Use /products to change it.\n5. \"Our story\": the text under it is still the editor's starter text. Use /fill and tell me your story.",
    "operations": []
  }
}
```

```json
{
  "message": "/check",
  "page": {
    "root": { "props": { "businessName": "Dara Bike Rental", "address": "Street 60, Kampot", "phones": [{ "number": "097 606 060" }], "facebookUrl": "https://wa.me/85597606060", "instagramUrl": "https://www.instagram.com/darabikes/" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Bikes and scooters by the day", "primaryLabel": "Call us", "primaryAction": "call", "imageUrl": "/media/bikes.jpg" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Find us by the river" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "Ride Kampot your way" } }
    ]
  },
  "output": {
    "reply": "Not ready yet:\n1. Your Facebook link is a WhatsApp address (https://wa.me/…). Change it in the editor's page settings to your Facebook page: the page no longer saves until then, my changes included.",
    "operations": []
  }
}
```
