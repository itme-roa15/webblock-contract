---
name: "products"
title: "Products layout"
skill: "Products presentation"
group: "design"
order: 6
command: "/products"
aliases: []
args: null
blocks: ["ProductCards", "AllProducts"]
triggers: ["products", "product grid", "per row", "shop layout", "catalog", "menu layout", "which products", "only show", "category", "បង្ហាញផលិតផល", "បង្ហាញទំនិញ", "ក្នុងមួយជួរ", "ប្រភេទផលិតផល"]
mode: "change"
maxTokens: 500
summary: "Chooses which products show and how. Changes the page, never products or prices."
summary_km: "ជ្រើសផលិតផលដែលត្រូវបង្ហាញ និងរបៀបបង្ហាញ។ វាកែប្រែទំព័រ តែមិនកែផលិតផល ឬតម្លៃទេ។"
example: "/products 3 in a row"
example_km: "/products ៣ ក្នុងមួយជួរ"
km_reviewed: false
---

## Rules

- Change only the Product Cards and All products blocks: which products they show (`source`, `category`, and All
  products' `defaultCategory`), and their columns, eyebrow, heading, viewAllLabel (Product Cards), searchPlaceholder
  (All products), align and spacing. They may be moved, but they stay at the top level, never inside a container.
- "Products to show" has three choices; explain them when the owner asks:
  - all: every product of the website's catalog, as before (the default);
  - category: only the products of one category, in the catalog's order;
  - picked: only the products the owner picked, in the owner's order.
- Set `source` to all or category yourself. A `category` or `defaultCategory` must be one of the website's
  categories (as AI Codegen gives them with the page), written as the catalog spells it; never invent one. All
  products opens on its `defaultCategory` tab ("" is the All tab); with category it shows no tabs.
- Never pick products: the picks are the owner's. For picked, send the owner to the editor's picker (select the
  block, set Products to show to Picked, then choose and order up to 12 products). Set `source` to picked only to
  go back to picks the block already holds.
- With an empty catalog, category and picked show nothing: keep all and point the owner to the Owner Portal to add
  products first.
- Never write the products, the categories or the number per page: products, prices and categories come from the
  Owner Portal catalog, and products per page is a setting in the All products block. When the owner asks for
  these, say where to change them.
- Columns: what the owner asks for; otherwise 3, never more columns than products (2 products, 2 columns), and 4
  only for many short cards. Phones always show fewer by themselves.
- Headings and labels name what is sold, in the owner's words ("Our pepper", "See all our pepper"), never a price,
  a discount or a "best seller" claim the owner didn't make.
- When there is also an All products block, give Product Cards a "view all" label so visitors find the rest.

## Examples

```json
{
  "message": "/products 3 in a row, and show 12 per page",
  "page": {
    "root": { "props": { "businessName": "Kampot Pepper House", "templateId": "everyday-store", "currency": "USD" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Kampot pepper from our farm" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Popular this week", "columns": "4", "viewAllLabel": "", "products": [{ "name": "Black pepper 100 g", "description": "Whole peppercorns.", "price": "4.50", "category": "Pepper", "imageUrl": null }, { "name": "Red pepper 100 g", "description": "Sun-dried red peppercorns.", "price": "6.00", "category": "Pepper", "imageUrl": null }, { "name": "Pepper gift box", "description": "Black, red and white pepper.", "price": "15.00", "category": "Gifts", "imageUrl": null }] } },
      { "type": "AllProducts", "props": { "id": "all-1", "heading": "All products", "columns": "2", "pageSize": 6 } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Both product grids now show 3 in a row, and the cards link to all your products. Products per page is a setting I can't change: set it to 12 in the All products block.",
    "operations": [
      { "op": "UPDATE", "component_id": "cards-1", "props": { "columns": "3", "viewAllLabel": "See all our pepper" } },
      { "op": "UPDATE", "component_id": "all-1", "props": { "columns": "3" } }
    ]
  }
}
```

```json
{
  "message": "/products show only our gift boxes here",
  "refs": [{ "id": "cards-1", "type": "ProductCards" }],
  "catalog": { "categories": ["Pepper", "Gifts", "Salt"] },
  "page": {
    "root": { "props": { "businessName": "Kampot Pepper House" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Kampot pepper from our farm" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Popular this week", "columns": "3", "source": "all", "category": "" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "This block now shows only the products in your Gifts category, in your catalog's order.",
    "operations": [
      { "op": "UPDATE", "component_id": "cards-1", "props": { "source": "category", "category": "Gifts", "heading": "Our gift boxes" } }
    ]
  }
}
```

```json
{
  "message": "/products I want to choose which products show here",
  "refs": [{ "id": "cards-1", "type": "ProductCards" }],
  "catalog": { "categories": ["Coffee", "Tea"] },
  "page": {
    "root": { "props": { "businessName": "Sokha Coffee" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Iced coffee near Pub Street" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "Our drinks", "columns": "3", "source": "all", "productIds": [] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "Picking products is yours to do: select this block in the editor, set Products to show to Picked, then choose up to 12 products and put them in order. Until then it shows all your products.",
    "operations": []
  }
}
```

```json
{
  "message": "/products ឲ្យ All products បើកនៅប្រភេទ ម្រេច",
  "refs": [{ "id": "all-1", "type": "AllProducts" }],
  "catalog": { "categories": ["ម្រេច", "អំបិល"] },
  "page": {
    "root": { "props": { "businessName": "Kampot Pepper House" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "ម្រេចកំពតពីចម្ការយើង" } },
      { "type": "AllProducts", "props": { "id": "all-1", "heading": "ផលិតផលទាំងអស់", "columns": "3", "pageSize": 12, "source": "all", "defaultCategory": "" } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "ប្លុក All products ឥឡូវបើកនៅផ្ទាំង ម្រេច មុនគេ។ ភ្ញៀវនៅតែអាចចុចមើលប្រភេទផ្សេងទៀតបាន។",
    "operations": [
      { "op": "UPDATE", "component_id": "all-1", "props": { "defaultCategory": "ម្រេច" } }
    ]
  }
}
```

```json
{
  "message": "/products show my picked products again",
  "refs": [{ "id": "cards-1", "type": "ProductCards" }],
  "page": {
    "root": { "props": { "businessName": "Mekong Flowers" } },
    "content": [
      { "type": "Hero", "props": { "id": "hero-1", "heading": "Fresh flowers for every day" } },
      { "type": "ProductCards", "props": { "id": "cards-1", "heading": "This week's bouquets", "columns": "2", "source": "all", "productIds": ["3f6c1d2e-8a4b-4c5d-9e6f-7a8b9c0d1e2f", "5b7e2a91-0c3d-4e8f-a1b2-c3d4e5f6a7b8"] } },
      { "type": "Footer", "props": { "id": "footer-1", "tagline": "" } }
    ]
  },
  "output": {
    "reply": "This block shows your 2 picked bouquets again, in the order you chose.",
    "operations": [
      { "op": "UPDATE", "component_id": "cards-1", "props": { "source": "picked" } }
    ]
  }
}
```
