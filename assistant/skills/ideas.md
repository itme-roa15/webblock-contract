---
name: "ideas"
title: "Ideas"
skill: "Ideas"
group: "utility"
order: 2
command: "/ideas"
aliases: ["/idea"]
args: {"name": "what", "hint": "what you want ideas for, e.g. headline, button, layout", "hint_km": "ចង់បានគំនិតសម្រាប់អ្វី ឧ. ចំណងជើង ប៊ូតុង ការរៀបចំទំព័រ", "required": false}
blocks: ["*"]
triggers: ["ideas", "idea", "suggest", "suggestions", "options", "inspiration", "គំនិត", "ជួយគិត", "មានជម្រើសអ្វីខ្លះ"]
mode: "reply"
maxTokens: 600
summary: "Gives you 3 ideas to choose from. Nothing changes until you pick one."
summary_km: "ផ្តល់គំនិតបីឲ្យអ្នកជ្រើសរើស។ ទំព័រមិនប្រែប្រួលទេ រហូតដល់អ្នករើសយកមួយ។"
example: "/ideas headline with @Hero"
example_km: "/ideas ចំណងជើង សម្រាប់ @Hero"
km_reviewed: false
---

## Rules

- Answer only: propose no operations. The page changes on the next message, when the owner picks an option.
- Give exactly 3 numbered options that differ in tone or approach (for example plain, warm, bold). Each option is
  ready to apply as written: within that text's length limit, and a button only goes to shop, visit, call, email,
  directions or telegram, and only to one the page can use (call needs a phone, shop a product block, telegram the
  page's Telegram link). A Buttons block may also link to an `https://` address the owner gave or that is already on
  the page, never to WhatsApp.
- Give ideas for what the owner names (headline, button, call to action, layout, colours) in the "@" blocks (and the
  blocks inside an "@" container), or in the whole page when there are none. With nothing named, pick the Hero
  headline.
- Build every idea only from facts on the page, in the message or in the business profile. Never put in a price, a
  discount, opening hours, a number or a service the owner didn't give.
- Layout ideas only add blocks the assistant may add (Text, FAQ, Call to action, Services, Heading, Rich text,
  Buttons, Icon, Spacer, Divider, and the containers Section, Columns, Grid and Card) or move existing ones, also
  into a container (two short blocks side by side in Columns, cards in a Grid). Keep each block's limit, 16 blocks at
  the top level and 40 in all, the Hero first and the Footer last; the product, About and Visit us blocks stay at the
  top level. Say that new FAQ answers or service cards start as placeholders for the owner's facts.
- Pictures, videos, maps and quotes are the owner's to add: an idea may suggest one, saying the owner adds it from
  the block list.
- End with one line: answer 1, 2 or 3 to put it on the page. When the owner answers with a number, apply that option
  exactly as it was written, to the same block.

## Examples

```json
{
  "message": "/ideas headline",
  "refs": [{ "id": "hero-1", "type": "Hero" }],
  "page": {
    "root": { "props": { "businessName": "Sokha Coffee", "address": "Street 08, near Pub Street, Siem Reap" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Welcome to Sokha Coffee", "description": "Iced coffee, fresh croissants and free Wi-Fi, two minutes from Pub Street.", "primaryLabel": "Get directions", "primaryAction": "directions" } },
      { "type": "ProductCards", "props": { "id": "products-1", "heading": "Our drinks" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Three headlines for your Hero:\n1. Iced coffee and fresh croissants\n2. Your coffee stop near Pub Street\n3. Cool down with an iced coffee\nAnswer 1, 2 or 3 and I'll put it on the page.",
    "operations": []
  }
}
```

```json
{
  "message": "/ideas what else should I add to my page?",
  "page": {
    "root": { "props": { "businessName": "Mekong Flowers", "phones": [{ "number": "012 456 789" }], "telegramUrl": "https://t.me/mekongflowers" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh flowers for every day", "primaryLabel": "See bouquets", "primaryAction": "shop" } },
      { "type": "ProductCards", "props": { "id": "products-1", "heading": "Bouquets" } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Come and see us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "Flowers from Phnom Penh" } }
    ]
  },
  "output": {
    "reply": "Three ideas for your page:\n1. Add an FAQ after Bouquets with \"Do you deliver?\" and \"How can I pay?\". The answers keep their sample text until you tell me yours.\n2. Add two columns before Visit us: \"Flowers for a special day\" on the left, and \"Call us\" and \"Message us on Telegram\" buttons on the right.\n3. Add a Services block after Bouquets with 3 cards for what you offer. Tell me what to put on them.\nAnswer 1, 2 or 3 and I'll put it on the page.",
    "operations": []
  }
}
```
