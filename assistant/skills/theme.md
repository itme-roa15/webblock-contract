---
name: "theme"
title: "Theme"
skill: "Theme & colour"
group: "design"
order: 5
command: "/theme"
aliases: ["/colors"]
args: {"name": "mood", "hint": "warm, minimal, bold…", "hint_km": "កក់ក្តៅ សាមញ្ញ ខ្លាំងក្លា…", "required": true}
blocks: ["*"]
triggers: ["theme", "colour", "color", "colours", "font", "mood", "palette", "ពណ៌ទំព័រ", "ប្តូរពណ៌", "ពុម្ពអក្សរ", "រចនាប័ទ្ម"]
mode: "change"
maxTokens: 400
summary: "Picks colours, font and buttons for a mood. Changes the look, keeps it readable."
summary_km: "ជ្រើសពណ៌ ពុម្ពអក្សរ និងរាងប៊ូតុង តាមបែបដែលអ្នកចង់បាន។ វាប្តូររូបរាង តែនៅតែងាយអាន។"
example: "/theme warm"
example_km: "/theme កក់ក្តៅ"
km_reviewed: false
---

## Rules

- Change only the page's root: palette, font, buttonStyle, accentColor, backgroundColor and textColor. Never the
  template, the blocks or any wording.
- Start from the named options: palette, font (original, editorial, clean, rounded) and buttonStyle (square,
  rounded, pill). A palette sets the accent colour (buttons, links, highlights); the template keeps its own
  backgrounds and text. The palettes and their accent: original (the template's own), lavender (bright blue), bakery
  (caramel), sage (deep green), terracotta (burnt orange), ocean (sea blue), teal (blue green), indigo (deep blue
  violet), plum (purple), rose (deep pink), cherry (red), mustard (dark gold), olive (olive green), coffee (coffee
  brown). Every palette keeps white button text readable.
- Good pairings (palette, font, buttons) by mood: warm: bakery, rounded, rounded; earthy or handmade: terracotta,
  editorial, rounded; cosy café: coffee, editorial, rounded; minimal: original, clean, square; soft: lavender,
  rounded, pill; romantic or beauty: rose, editorial, pill; elegant or creative: plum, editorial, pill; natural: sage,
  editorial, rounded; organic or outdoor: olive, clean, rounded; fresh or seaside: ocean, clean, rounded; calm, spa or
  health: teal, clean, pill; trustworthy or professional: indigo, clean, square; bold or energetic: cherry, clean,
  square; sunny or retro: mustard, rounded, rounded. Fit the business too: a mood the owner names comes first.
- A colour the owner names without a code: use the palette of that colour (red: cherry; pink: rose; purple: plum;
  blue: ocean, indigo or lavender; blue green: teal; green: sage or olive; orange: terracotta; yellow or gold:
  mustard; brown: coffee or bakery). An accentColor override wins over the palette, so set accentColor to null with
  it (as the editor's Visual style does); keep backgroundColor and textColor.
- Use the three colour overrides only for an exact colour the owner gives (a brand colour), each as #rrggbb, or null
  to go back to the palette.
- Keep text readable (WCAG AA, 4.5:1): the text colour on the background, and white button text on the accent. When
  the owner's colour is too light, use a darker shade of it and say so.
- "Back to the original look": palette and font "original" and the three colours null.
- Reply with what the page looks like now in plain words, not the option names alone.

## Examples

```json
{
  "message": "/theme warm",
  "page": {
    "root": { "props": { "businessName": "Tep Bakery", "templateId": "everyday-store", "palette": "original", "font": "original", "buttonStyle": "square", "accentColor": null, "backgroundColor": null, "textColor": null } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh bread every morning" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I gave the page warm bakery colours, a soft rounded font and rounded buttons. Everything stays easy to read.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "palette": "bakery", "font": "rounded", "buttonStyle": "rounded" } }
    ]
  }
}
```

```json
{
  "message": "/theme bold, with our orange #f26522",
  "page": {
    "root": { "props": { "businessName": "Angkor Moto Parts", "templateId": "warm-bold", "palette": "original", "font": "original", "buttonStyle": "rounded", "accentColor": null, "backgroundColor": null, "textColor": null } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Spare parts for every moto" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "I used your orange with a clean, strong font and square buttons. White text on #f26522 is hard to read, so the buttons use a darker shade of it, #c74e17.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "accentColor": "#c74e17", "font": "clean", "buttonStyle": "square" } }
    ]
  }
}
```

```json
{
  "message": "/theme calm and fresh, we are a massage spa",
  "page": {
    "root": { "props": { "businessName": "Lotus Touch Spa", "templateId": "everyday-store", "palette": "original", "font": "original", "buttonStyle": "square", "accentColor": null, "backgroundColor": null, "textColor": null } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Relax, breathe, feel better" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Your page now has calm blue-green colours, a clean, light font and soft round buttons, easy to read and restful for a spa.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "palette": "teal", "font": "clean", "buttonStyle": "pill" } }
    ]
  }
}
```

```json
{
  "message": "/theme make it red, our shop sign is red",
  "page": {
    "root": { "props": { "businessName": "Sokha Phone Shop", "templateId": "warm-bold", "palette": "sage", "font": "clean", "buttonStyle": "square", "accentColor": "#1f7a4d", "backgroundColor": null, "textColor": null } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Phones and repairs in Takeo" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Your buttons and highlights are now a strong red, like your shop sign. The font and buttons stay as they were, and the white button text is easy to read.",
    "operations": [
      { "op": "UPDATE", "component_id": "root", "props": { "palette": "cherry", "accentColor": null } }
    ]
  }
}
```
