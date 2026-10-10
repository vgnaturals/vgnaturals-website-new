# VG Naturals Website

Next.js + TypeScript + Tailwind website starter for VG NATURALS PRIVATE LIMITED, sourced from the supplied catalogue ZIP and approved retail product/price list.

## Quick start

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## GitHub and Vercel

1. Use the GitHub repository `vgnaturals/vgnaturals-website-new` and its `main` branch.
2. Keep application files and `package.json` at the repository root.
3. Import the repository in Vercel with Framework Preset **Next.js**, Root Directory **the repository root**, Install Command **`npm ci`**, Build Command **`npm run build`**, and the default Output Directory. Commit `package-lock.json` when updating dependencies so deployments use the tested versions.
4. Optionally set `NEXT_PUBLIC_GOOGLE_MAPS_URL` to the verified Google Maps/GBP URL. The current source uses the approved website URL and WhatsApp number directly; `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` are not read by the application.
5. Preview the deployment, verify all pages, then connect `vgnaturals.com` only after validation. Keep the old website/repository until the replacement is tested.
6. Submit `https://vgnaturals.com/sitemap.xml` in Google Search Console after deployment.

## Product data

Edit `data/products.ts`. There are **13 confirmed products** and **24 confirmed retail price/pack entries** (11 products with two variants and 2 fresh products with one). Ready products can be added to a client-side cart. Fresh and Coming Soon items are enquiry-only.

The original catalogue includes unverified claims and additional future items. It is preserved under `source-catalogue/` and published for reference under `/catalogue-original.html`; review its content before making it publicly accessible. Images are under `public/catalogue-assets/`. **Verify each product image mapping against its product label before going live.**

## Ecommerce and payments — important limitation

The cart works in the browser and persists locally. Checkout is **quotation-only** because payment gateway keys, shipping/tax rules, durable order storage, payment signature verification, and webhook handling are not configured. **No actual payments are collected.** Do not advertise the site as payment-ready until these are implemented and tested. No fake success screen is shown.

## Enquiries

The bulk form opens WhatsApp with prefilled fields. It does not store leads or send email automatically. Add a secure backend and email provider to persist leads when credentials are available.

## Missing verified data

- Official Google Maps/GBP URL (set `NEXT_PUBLIC_GOOGLE_MAPS_URL`)
- Gateway merchant keys and webhook secret
- Verified shipping rules, GST treatment, stock management and legal policies
- Final validation of logo/product image mappings and source catalogue claims
- Transactional email provider, durable database, admin authentication

## Design and SEO

Mobile-friendly layout, product pages, category pages, blog articles, metadata, Product JSON-LD for ready products, sitemap and robots are included. Validate all metadata, assets and legal pages before publishing.
