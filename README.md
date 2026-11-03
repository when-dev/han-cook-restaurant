# HanCook Korean Restaurant — website

Concept / proposal site for **HanCook 한쿡 한식당**, Obchodná 531/54, Bratislava.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Three languages: **SK** (default), **EN**, **KO**.

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /sk
npm run typecheck
npm run lint
npm run build && npm start
```

## Where to edit content

| What | File |
| --- | --- |
| Phone, address, Instagram, Maps links, closing time, price range | `src/config/site.ts` |
| **Delivery / order links** (Wolt, Bolt Food, Bistro, direct) — set `url`, `null` shows “coming soon” | `src/config/site.ts` → `order` |
| Menu items, prices, tags, spice level, photos | `src/data/menu.ts` |
| Menu category names | `src/data/menu.ts` → `categoryLabels` |
| Reviews | `src/data/reviews.ts` |
| Gallery tiles | `src/data/gallery.ts` |
| All UI text | `src/i18n/dictionaries/{sk,en,ko}.ts` (EN/KO are type-checked against SK, so a missing key fails the build) |

**Adding a dish photo:** put the file in `public/images/dishes/` and set `image: "/images/dishes/<file>.jpg"` on the item.
It replaces the illustrated poster panel automatically and is served optimised (AVIF/WebP) via `next/image`.
Gallery photos work the same way (`public/images/gallery/`, `image` field).

**Adding a dish:** append an object to `menuItems` with `name`/`description` in all three languages. It appears
in the menu, filters and counts automatically. Set `signature: true` to feature it in the Signature section
(the first signature item is the big spotlight).

## Before going live — confirm with the owner

- [ ] **All prices** in `src/data/menu.ts` are indicative placeholders — verify against the menu board.
- [ ] Fried chicken variants (Original / Yangnyeom / Soy-garlic) are assumed — confirm the real ones.
- [ ] Kimmari is tagged vegetarian — confirm.
- [ ] Phone number `+420 608 405 268` is a Czech prefix — confirm it is correct.
- [ ] Full weekly opening hours (only “closes 22:00” is known).
- [ ] Real Wolt / Bolt Food / Bistro / direct-order links.
- [ ] Replace the **sample reviews** (`sample: true`) with real Google reviews, quoted verbatim with permission.
- [ ] Real food and venue photos.
- [ ] Final domain → set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
- [ ] When approved, set `showConceptNote: false` in `src/config/site.ts` — this removes the footer note **and**
      turns search-engine indexing on (robots.txt + meta robots are `noindex` while it is a proposal).

## Structure

```
src/
  app/[lang]/        layout (fonts, metadata, hreflang, JSON-LD), page, OG image, 404
  app/               robots, sitemap, manifest, icon
  proxy.ts           / → /sk (or the language remembered in the NEXT_LOCALE cookie)
  config/site.ts     business facts
  data/              menu, reviews, gallery
  i18n/              locale config, dictionaries, client provider
  components/
    layout/          Header (sticky, mobile sheet), LanguageSwitcher, Footer, MobileActionBar, Wordmark
    sections/        Hero, Marquee, About, Signature, MenuSection, Gallery, Reviews, Order, Contact
    menu/            MenuExplorer (filters), MenuCard, DishMedia, DishArt (SVG illustrations)
    ui/              Button, SectionHeading, Icons
```
