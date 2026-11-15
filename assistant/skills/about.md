---
name: "about"
title: "About story"
skill: "About story"
group: "content"
order: 9
command: "/about"
aliases: []
args: null
blocks: ["About"]
triggers: ["about us", "our story", "who we are", "about section", "អំពីយើង", "រឿងរ៉ាវរបស់យើង", "ប្រវត្តិហាង"]
mode: "change"
maxTokens: 700
summary: "Writes your About block from what you tell it. Never makes up your history."
summary_km: "សរសេរប្លុក About តាមអ្វីដែលអ្នកប្រាប់។ មិនប្រឌិតប្រវត្តិរបស់អ្នកទេ។"
example: "/about We opened in 2018 and cook Khmer home food"
example_km: "/about យើងបើកហាងនៅឆ្នាំ 2018 ហើយចម្អិនម្ហូបខ្មែរបែបផ្ទះ"
km_reviewed: false
---

## Rules

- Write the About block's eyebrow, heading, body, caption and small facts from the owner's message, the business
  profile and facts already on the page. The body (200 characters at most) says who you are, what you offer, where,
  and what makes you different, in the voice of "we".
- Never invent history: no founding year, founder or family story, awards, customer numbers or "since…" that the
  owner hasn't given. Leave them out, or keep the existing placeholder, and ask for them in the reply.
- The small facts (value and label, 3 at most) only hold figures the owner gave ("2018" / "Open since"). Keep a
  placeholder such as "00" until the owner gives the real figure.
- The caption stays empty unless the owner gives a line for it (for example the founder's name and role).
- Only the About block changes. When the page has none, say that the assistant can't add one and suggest adding
  it from the block list; propose no operations.
- Never touch the photos: ask the owner to upload their own. When the business profile has a description, remind
  the owner that the live site shows that one instead.
- Write in the owner's language. Khmer stays Khmer.

## Examples

```json
{
  "message": "Write our About. I'm Sreymom, I started Mom's Kitchen in Kampot in 2018. We cook Khmer home food like fish amok, lok lak and sour soup, and we deliver in Kampot town.",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Mom's Kitchen", "address": "Old Market area, Kampot" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Khmer home cooking" } },
      { "type": "About", "props": { "id": "about-1", "eyebrow": "", "heading": "About us", "body": "Tell visitors who you are and what makes you special.", "imageUrl": null, "caption": "", "stats": [{ "value": "00", "label": "Open since" }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I wrote your About story from what you told me. Upload a photo of you or your kitchen to finish it.",
    "operations": [
      { "op": "UPDATE", "component_id": "about-1", "props": { "eyebrow": "Our story", "heading": "Home-cooked Khmer food in Kampot", "body": "Sreymom started Mom's Kitchen in Kampot in 2018. We cook Khmer home food like fish amok, lok lak and sour soup, and we deliver in Kampot town.", "caption": "Sreymom, founder", "stats": [{ "value": "2018", "label": "Open since" }] } }
    ]
  }
}
```

```json
{
  "message": "សរសេរផ្នែក About ឲ្យខ្ញុំ។ ហាងយើងលក់កាហ្វេ និងតែក្រូចឆ្មា នៅជិតផ្សារណាត់ ក្រុងបាត់ដំបង។",
  "refs": [{ "id": "about-1", "type": "About" }],
  "page": {
    "root": { "props": { "businessName": "Kafe Dambang" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "កាហ្វេស្រស់ៗ" } },
      { "type": "About", "props": { "id": "about-1", "eyebrow": "", "heading": "អំពីយើង", "body": "", "imageUrl": null, "caption": "", "stats": [{ "value": "00", "label": "ឆ្នាំបើកហាង" }] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ខ្ញុំបានសរសេរផ្នែក About តាមអ្វីដែលអ្នកបានប្រាប់។ សូមប្រាប់ខ្ញុំថា ហាងបើកតាំងពីឆ្នាំណា ដើម្បីដាក់ជំនួសលេខ 00។",
    "operations": [
      { "op": "UPDATE", "component_id": "about-1", "props": { "heading": "កាហ្វេ និងតែក្រូចឆ្មា នៅបាត់ដំបង", "body": "ហាង Kafe Dambang របស់យើង លក់កាហ្វេ និងតែក្រូចឆ្មា នៅជិតផ្សារណាត់ ក្រុងបាត់ដំបង។ សូមអញ្ជើញមកភ្លក់ភេសជ្ជៈរបស់យើង។" } }
    ]
  }
}
```
