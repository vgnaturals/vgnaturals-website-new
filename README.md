# VG Naturals — Website (Batch 1: Layout, Navbar, Footer, Home)

Next.js 14 (App Router) + TypeScript + Tailwind CSS, built for Vercel.

This is the **first batch** of the site — global layout, navigation, footer,
and the home page. The routes linked from the Navbar/Footer (`/about`,
`/products/...`, `/bulk-supply`, `/contact`, etc.) aren't built yet — that's
the next batch, page by page, per the agreed build order (products → B2B
pages → About/Farm → homepage last — homepage is done here so the rest can
now be built against it).

## What's real vs. placeholder right now

- **Real:** the 3 product photos in `/public/products/` are your actual
  packaging shots (Lemongrass Oil + Hydrosol duo, Tulsi Oil lineup,
  Hydrosol single bottle) — not stock placeholders.
- **Real:** address, phone, email, Instagram and Facebook links, director
  background (Vinod Kumar Yadav) — pulled from your company details sheet.
- **Placeholder / needs your input:**
  - LinkedIn URL — left blank in `lib/site-data.ts` until the company page
    or founder profile link is confirmed; the icon won't render until then.
  - The "Why buyers work with us" section deliberately does **not** include
    testimonials or certification logos — none exist yet. Do not fabricate
    these; add real buyer quotes and certification badges here once you
    have them (`app/page.tsx`, the "TRUST" section).
  - Export target date (March 2027) is stated as a target, not a guarantee
    — keep that framing if you edit the copy.

## Local setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploying to Vercel

1. Push this project to a GitHub repository (private is fine).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import
   the repository. Vercel auto-detects Next.js — no config changes needed.
3. Under **Environment Variables**, none are required yet for this batch.
4. Deploy. Vercel gives you a `*.vercel.app` preview URL immediately.
5. To connect `vgnaturals.com`: in the Vercel project → **Settings →
   Domains** → add `vgnaturals.com`, then update your GoDaddy DNS records
   with the values Vercel shows you (usually an A record + CNAME for `www`).
   This replaces the GoDaddy Airo builder — decide before doing this
   whether you're fully moving off Airo, since both can't serve the live
   domain at once.

## Project structure

```
app/
  layout.tsx      → root layout: fonts, metadata, wraps Navbar + Footer
  page.tsx         → home page
  globals.css      → Tailwind base + global styles
components/
  Navbar.tsx       → sticky nav, Products dropdown, mobile menu
  Footer.tsx       → company info, links, social, B2B CTA band
lib/
  site-data.ts     → single source of truth: product categories, company info
public/
  products/        → real product photos (from your uploads)
  brand/           → (empty) — drop your logo file(s) here next
```

## Design tokens (`tailwind.config.ts`)

Colors and type were pulled directly from your actual label artwork rather
than a generic template palette:

- `forest` (#173A2B) — deep forest green from the label ring
- `gold` (#B8912E) — warm gold from the label ring / monogram
- `ivory` (#FBF8F1) — page background
- `cream` (#F2EBDA) — section background
- Display type: **Fraunces** (serif, editorial) · Body/UI: **Manrope** (sans)

## Next steps (not built yet)

1. `/products/lemongrass` and `/products/tulsi` category pages + the 4
   detail pages each (oil, hydrosol live; tea, slips/herbs coming-soon)
2. `/bulk-supply`, `/request-quote`, `/request-sample`, `/catalogue`
3. `/about` (director bios, farm story)
4. `/contact`, `/industries`, `/blog`
