---
name: "faq"
title: "FAQ writer"
skill: "FAQ writer"
group: "content"
order: 10
command: "/faq"
aliases: []
args: null
blocks: ["FAQ"]
triggers: ["faq", "q&a", "questions and answers", "common questions", "customers ask", "សំណួរ និងចម្លើយ", "សំណួរចម្លើយ", "សំណួរញឹកញាប់", "ភ្ញៀវតែងសួរ"]
mode: "change"
maxTokens: 800
summary: "Writes questions and answers from your page. Never guesses an answer."
summary_km: "សរសេរសំណួរ និងចម្លើយ ពីព័ត៌មានលើទំព័ររបស់អ្នក។ មិនទាយចម្លើយទេ។"
example: "/faq"
example_km: "/faq"
km_reviewed: false
---

## Rules

- Write the FAQ block's questions (1–12, usually 4–6) about what customers of this business really ask: ordering,
  delivery, payment, opening hours, location, booking, custom orders.
- Answer only from the owner's message, the page (business details, hours, address, phones, Services, About) and
  the business profile.
- When an answer isn't known, keep the question with a clear placeholder answer that asks for it ("Write how and
  where you deliver, and how long it takes.") and name those questions in the reply. Never guess prices, delivery
  areas or fees, payment methods or hours.
- Questions short and in the customer's words (120 characters at most); answers of one or two sentences (400 at
  most).
- With an FAQ block on the page, update its questions and keep the owner's own answers unless asked to change them.
  Without one, add a complete FAQ block before the Footer, or after the "@" block when the owner points to one.
- Write in the page's language. A Khmer page gets Khmer questions and answers.

## Examples

```json
{
  "message": "/faq",
  "page": {
    "root": { "props": { "businessName": "Sugar & Crumb", "hours": "7:00 – 19:00", "hoursDetail": "Monday to Sunday, 7:00 – 19:00", "address": "St. 315, Toul Kork, Phnom Penh", "phones": [{ "number": "012 888 315" }] } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh bread every morning" } },
      { "type": "Services", "props": { "id": "services-1", "heading": "What we offer", "columns": "2", "items": [{ "icon": "cake", "title": "Birthday cakes", "text": "Made to order. Call us at least 2 days ahead." }, { "icon": "coffee", "title": "Coffee and pastries", "text": "Freshly made in our shop every morning." }] } },
      { "type": "VisitUs", "props": { "id": "visit-1", "heading": "Visit us" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I added an FAQ block before the Footer with 5 questions. Tell me whether you deliver and how customers can pay, and I'll fill in those two answers.",
    "operations": [
      { "op": "ADD", "component_type": "FAQ", "index": 3, "props": { "eyebrow": "", "heading": "Questions and answers", "align": "left", "spacing": "normal", "items": [
        { "question": "When are you open?", "answer": "Monday to Sunday, 7:00 – 19:00." },
        { "question": "Where is your shop?", "answer": "St. 315, Toul Kork, Phnom Penh." },
        { "question": "Can I order a birthday cake?", "answer": "Yes, we make birthday cakes to order. Call us at 012 888 315 at least 2 days ahead." },
        { "question": "Do you deliver?", "answer": "Write how and where you deliver, and how long it takes." },
        { "question": "How can I pay?", "answer": "List the ways customers can pay you." }
      ] } }
    ]
  }
}
```

```json
{
  "message": "We deliver anywhere in Phnom Penh, same day if you order before 2pm. Customers pay by ABA or cash.",
  "refs": [{ "id": "faq-1", "type": "FAQ" }],
  "page": {
    "root": { "props": { "businessName": "Rumdoul Flowers", "address": "Street 432, Toul Tom Poung, Phnom Penh" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh flowers for every day" } },
      { "type": "FAQ", "props": { "id": "faq-1", "eyebrow": "", "heading": "Questions and answers", "items": [{ "question": "Do you deliver?", "answer": "Write how and where you deliver, and how long it takes." }, { "question": "How can I pay?", "answer": "List the ways customers can pay you." }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I filled in both answers from your message. If there is a delivery fee, tell me and I'll add it.",
    "operations": [
      { "op": "UPDATE", "component_id": "faq-1", "props": { "items": [
        { "question": "Do you deliver?", "answer": "Yes, anywhere in Phnom Penh. Order before 2pm for same-day delivery." },
        { "question": "How can I pay?", "answer": "By ABA or cash." }
      ] } }
    ]
  }
}
```
