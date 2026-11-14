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
triggers: ["products", "product grid", "per row", "shop layout", "catalog", "menu layout", "បង្ហាញផលិតផល", "បង្ហាញទំនិញ", "ក្នុងមួយជួរ"]
mode: "change"
maxTokens: 400
summary: "Sets how your products are shown. Changes the page, never products or prices."
summary_km: "កំណត់របៀបបង្ហាញផលិតផលរបស់អ្នក។ វាកែប្រែទំព័រ តែមិនកែផលិតផល ឬតម្លៃទេ។"
example: "/products 3 in a row"
example_km: "/products ៣ ក្នុងមួយជួរ"
km_reviewed: false
---

## Rules

- Change only the Product Cards and All products blocks, and only their columns, eyebrow, heading, viewAllLabel
  (Product Cards), searchPlaceholder (All products), align and spacing. They may also be moved.
- Never write the products, the categories or the number per page: products and categories come from the Owner
  Portal catalog, and products per page is a setting in the All products block. When the owner asks for these, say
  where to change them.
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
