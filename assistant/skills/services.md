---
name: "services"
title: "Services writer"
skill: "Services writer"
group: "content"
order: 11
command: "/services"
aliases: []
args: null
blocks: ["Services"]
triggers: ["services", "what we offer", "what we do", "our services", "សេវាកម្ម", "សេវារបស់យើង", "អ្វីដែលយើងផ្តល់"]
mode: "change"
maxTokens: 700
summary: "Writes service cards from what you offer. Never adds services you didn't name."
summary_km: "សរសេរកាតសេវាកម្ម តាមអ្វីដែលអ្នកផ្តល់ជូន។ មិនបន្ថែមសេវាដែលអ្នកមិនបានប្រាប់ទេ។"
example: "/services We do haircuts, colouring and wedding make-up"
example_km: "/services យើងកាត់សក់ លាបពណ៌សក់ និងតុបតែងមុខកូនក្រមុំ"
km_reviewed: false
---

## Rules

- Write the Services cards only from services the owner names in the message, the business profile or the page.
  Never add a service they didn't mention, and never a price, duration or guarantee they didn't give.
- One card per service, 2 to 6 cards: the title is the service's plain name (50 characters at most); the text says
  what it is and who it's for, from what the owner gave (160 at most), with no praise nobody gave.
- Pick each icon from the fixed set by meaning (scissors for haircuts, cake for cakes, delivery for delivery,
  coffee for drinks, brush for hair colouring or painting, gift for gift boxes, location for coming to the customer);
  when none fits, use star.
- Columns follow the count: "2" for 2 or 4 cards, "3" for 3, 5 or 6 cards.
- With more than 6 services, keep the first 6 the owner lists and name the rest in the reply (a second Services
  block can hold them). With only one, keep one placeholder card and ask for another.
- With a Services block on the page, update it. Without one, add a complete Services block after the About block,
  or before the Footer when there is no About.
- Write in the owner's language. Khmer stays Khmer.

## Examples

```json
{
  "message": "We do haircuts, hair colouring with L'Oréal colours, manicure and pedicure, and make-up for weddings and parties.",
  "refs": [{ "id": "services-1", "type": "Services" }],
  "page": {
    "root": { "props": { "businessName": "Bopha Beauty", "address": "Sok San Road, Siem Reap" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Look your best in Siem Reap" } },
      { "type": "Services", "props": { "id": "services-1", "eyebrow": "", "heading": "What we offer", "columns": "3", "items": [{ "icon": "star", "title": "Your first service", "text": "Say what it is and why customers like it." }, { "icon": "heart", "title": "Your second service", "text": "Say what it is and why customers like it." }, { "icon": "chat", "title": "Your third service", "text": "Say what it is and why customers like it." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I made 4 cards from the services you named. Tell me prices or times if you want them on the cards.",
    "operations": [
      { "op": "UPDATE", "component_id": "services-1", "props": { "heading": "Our services", "columns": "2", "items": [
        { "icon": "scissors", "title": "Haircuts", "text": "A new haircut at our salon in Siem Reap." },
        { "icon": "brush", "title": "Hair colouring", "text": "A new hair colour with L'Oréal colours." },
        { "icon": "sparkle", "title": "Manicure and pedicure", "text": "Nail care for your hands and feet." },
        { "icon": "heart", "title": "Wedding and party make-up", "text": "Make-up for weddings and parties." }
      ] } }
    ]
  }
}
```

```json
{
  "message": "Add a services section: birthday cakes to order, cupcake gift boxes, and delivery in Phnom Penh.",
  "page": {
    "root": { "props": { "businessName": "Little Lotus Cakes", "address": "Street 155, Toul Tom Poung, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Cakes for every celebration" } },
      { "type": "About", "props": { "id": "about-1", "heading": "About us", "body": "A small home bakery in Toul Tom Poung." } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Find us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added a Services block after About with your 3 services. Tell me the delivery fee or how early to order if you want those shown.",
    "operations": [
      { "op": "ADD", "component_type": "Services", "index": 2, "props": { "eyebrow": "", "heading": "What we offer", "columns": "3", "align": "left", "spacing": "normal", "items": [
        { "icon": "cake", "title": "Birthday cakes", "text": "Birthday cakes made to order." },
        { "icon": "gift", "title": "Cupcake gift boxes", "text": "Boxes of cupcakes to give as a gift." },
        { "icon": "delivery", "title": "Delivery", "text": "We deliver in Phnom Penh." }
      ] } }
    ]
  }
}
```
