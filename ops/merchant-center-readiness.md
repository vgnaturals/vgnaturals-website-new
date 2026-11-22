# Merchant Center preparation — not submitted

This internal catalogue draft contains 22 listed retail packs. It is NOT a submission-ready Google feed. Fresh and Coming Soon products are excluded. No ads or campaigns have been created.

Before submission:
- Confirm actual stock and populate availability; ready catalogue status is not a stock ledger.
- Confirm final tax-inclusive retail prices. Checkout currently says applicable GST is confirmed in the quotation.
- Set actual India shipping and handling costs, delivery coverage and dispatch estimates. Do not assume free shipping.
- Enable complete purchase confirmation with the chosen payment method. The current checkout sends an order request and leaves final terms for later quotation.
- Verify each product image (especially Basil Hydrosol) and labels, GTIN/MPN where assigned, and product-specific descriptions. Do not invent identifiers or certification claims.
- Each pack needs a landing URL that selects the matching pack and displayed price before including multiple variants in a live feed. Current draft links are base product pages.
- Apply the current Google requirements for AI-generated titles/descriptions/images where relevant.
- Verify/claim the domain in the business Merchant Center account, configure returns and shipping, submit a validated feed and inspect Diagnostics. Account access has not been established in this session.

Sources:
- https://support.google.com/merchants/answer/7052112
- https://support.google.com/merchants/answer/9158778
- https://support.google.com/merchants/answer/13889434

Regenerate this draft from the current product catalogue before submission; it is a planning snapshot, not a live feed.

## Verified operational checkpoint — 22 November 2026

**Status: not eligible to submit as a live Shopping/free-listings offer feed yet. No Merchant Center account is connected through VG Naturals' Windsor.ai connection.** An existing Google Merchant Center account, if any, must be claimed rather than creating a duplicate.

Website facts reviewed against the current GitHub source:
- 11 `ready` catalogue products with two listed packs each produce the **22-row planning TSV**, but `ready` is a catalogue status, **not confirmed in-stock inventory**.
- The published shipping policy lists domestic retail parcel bands (up to 500 g ₹89; 500 g–1 kg ₹129), but the actual courier charges for each SKU, packed parcel weight and PIN-code serviceability need an operational check.
- The current checkout button says **Submit order request**; payment, availability and final applicable GST/freight are confirmed later. This is **not a complete online purchase/payment checkout** for Merchant Center Shopping/free-listings compliance.
- All variants in the TSV currently point to one base product URL per botanical product. Google requires distinct URLs that preselect each advertised pack variant.
- The TSV was generated before the current Basil Hydrosol catalogue image was corrected; regenerate and review images before any live feed.
- Do not publish the TSV, open a public Merchant Center feed URL, create a Google Shopping campaign, claim GTIN/MPN or set `in_stock` without actual operations evidence.

### Minimum release gates, in order
1. Confirm an **existing Google Merchant Center account or owner-create one**, verify and claim `https://www.vgnaturals.com/`. Choose free listings only; no ads or budget.
2. Verify all listed stock, intended product scope, current **GST-inclusive consumer prices**, SKU-specific labels/photographs, and any genuine manufacturer identifiers.
3. Confirm direct online purchase using an approved, operational payment method; reconcile shipping cost, packaging, GST and final checkout total with the product page and feed. Preserve the separate B2B quotation process.
4. Build pack-selectable canonical landing pages with individual variant URLs and accurate matching `Product`/`Offer` structured data; validate Google Rich Results Test and Merchant Center Diagnostics.
5. Complete business verification, return/refund and shipping settings in Merchant Center. Review applicable ingredient/product advertising restrictions.
6. Only then generate the published feed from validated, stocked SKUs, select Free Listings, and monitor item-level approvals and Search Console merchant listings. A submitted feed does **not** guarantee ranking or appearance.

References: https://support.google.com/merchants/answer/10249082 and https://developers.google.com/search/docs/appearance/structured-data/product-variants
