# Workspace Designer

Interactive tool to design a workspace (desk, chair, accessories, extras) and rent it. Built for the Desent challenge / monis.rent.

**Stack:** Next.js 14 (App Router), Tailwind CSS, TypeScript, deploy on Vercel.

## Run
```bash
npm install
npm run dev
```

## Approach
- One state-driven SVG scene: the preview updates instantly when the desk, chair or accessories change.
- Desk items (monitors up to 3, lamp, plants, headphones) sit on the desk; extras (coffee machine, surfboard, motorcycle, bean bag, tool shelf) appear around the platform.
- Sticky monthly price, plus a checkout summary with 1/3/6-month terms and discounts.
- Accessible: radio groups, labelled buttons, visible focus, reduced motion respected.

## With more time
- Real product photos from monis.rent and drag-and-drop placement
- Persist the setup in the URL to share it
- Send the rental request to a backend / WhatsApp
- Prices, stock and availability per date from an API
