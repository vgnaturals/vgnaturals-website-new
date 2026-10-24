export const botanicalRanges = [
  {
    slug: 'lemongrass', name: 'Lemongrass', botanical: 'Cymbopogon flexuosus (essential oil)',
    introduction: 'Compare VG Naturals Lemongrass Essential Oil, Hydrosol, Natural Room Freshener and Tea Bags. These are distinct formats: select the oil for an essential-oil enquiry, hydrosol for a botanical-water enquiry, or the labelled finished product for room fragrance or herbal tea.',
    identity: 'The listed botanical identity of our Lemongrass Essential Oil is Cymbopogon flexuosus. For other lemongrass products, confirm composition and product-specific specifications with the team.',
    questions: [
      ['Which lemongrass products can I enquire about?', 'Our range includes essential oil, hydrosol, natural room freshener and tea bags. Each product page shows its listed packs and prices. Choose the exact format when requesting a bulk quotation.'],
      ['Are lemongrass oil, hydrosol and room freshener interchangeable?', 'No. The oil, water-based hydrosol and finished room freshener are different products. Share the intended application and request composition and handling information for the product you are evaluating.'],
      ['Can businesses in India request bulk lemongrass supply?', 'Yes. VG Naturals welcomes enquiries from manufacturers, formulators, distributors, retailers and hospitality buyers across India. Supply is arranged from Lucknow after confirming quantity, specifications and delivery feasibility for your PIN code.'],
    ],
  },
  {
    slug: 'tulsi', name: 'Tulsi', botanical: 'Ocimum sanctum',
    introduction: 'Explore VG Naturals Tulsi (Ocimum sanctum) essential oil, hydrosol, herbal tea, fresh leaves and the listed Tulsi spray. Compare the product form before choosing retail packs or discussing a bulk requirement.',
    identity: 'VG Naturals lists Tulsi products as Ocimum sanctum. This range is separate from our Basil products, which are listed as Ocimum basilicum. Include the botanical name in procurement enquiries to avoid mixing the two ranges.',
    questions: [
      ["What is the English and botanical name of Tulsi?","Tulsi is commonly called Holy Basil. VG Naturals uses Ocimum sanctum in its catalogue; Kew lists Ocimum sanctum as a synonym of Ocimum tenuiflorum. Our Basil range is separately listed as Ocimum basilicum. Mention the botanical identity and product form when making a sourcing enquiry."],
      ["What is the price of Tulsi oil, including a 1-litre quantity?","Current listed retail packs and prices are shown in the comparison table on this page. A 1-litre requirement is a bulk enquiry, not a separately priced retail variant in our catalogue. Ask for a quotation with the quantity, packaging and delivery PIN code; do not calculate the bulk rate by multiplying the small-pack price."],
      ["Where can I enquire about Tulsi tea online in India?","Use the Herbal Tulsi Tea Pouch product page to review the current listed pouch quantities and prices, then send your requirement. Retailers, cafes and hospitality buyers can request bulk terms. Confirm ingredients, preparation directions, label details and delivery feasibility before ordering."],
      ["Are the Tulsi products certified organic?","Organic certification is not established by a search term or a botanical name. If certification is required, ask our team to confirm the exact product's status and provide the relevant documentation if available before purchase."],
      ["How should I evaluate a Tulsi essential oil supplier?","Confirm the botanical identity, intended application, available specifications and batch information. State any analysis or documentation your procurement team requires, and ask what is available for the proposed supply. Compare an evaluation pack against your requirements before confirming a bulk order; price alone does not establish quality."],
      ['Where can I source Ocimum sanctum products in India?', 'VG Naturals in Lucknow accepts India-wide enquiries for its listed Tulsi (Ocimum sanctum) range. Select essential oil, hydrosol, herbal tea, spray or fresh leaves and share the quantity and destination for a quotation.'],
      ['Is Tulsi essential oil the same as Tulsi tea or fresh leaves?', 'No. They are different product forms with different intended uses. Select the labelled product suitable for your requirement; the essential oil is not a substitute for tea or fresh leaves.'],
      ['Can fresh Tulsi leaves be delivered to my city?', 'Fresh-leaf supply depends on harvest availability, delivery time and destination. Share the quantity, required date and PIN code before confirming an order; availability and nationwide fresh delivery are not guaranteed.'],
    ],
  },
  {
    slug: 'basil', name: 'Basil', botanical: 'Ocimum basilicum',
    introduction: 'Explore VG Naturals Basil Essential Oil, Basil Hydrosol, Basil Tea Bags and Fresh Basil Leaves. The listed botanical name is Ocimum basilicum; this is a separate catalogue range from Tulsi (Ocimum sanctum).',
    identity: 'The correct spelling used in our catalogue is Ocimum basilicum. If you searched for “Ocimum basallicum” or “Ocimum basalicum”, use Ocimum basilicum when requesting our Basil products. Confirm the exact product specification before ordering.',
    questions: [
      ['Where can I enquire about Ocimum basilicum products in India?', 'VG Naturals welcomes India-wide enquiries for Basil essential oil, hydrosol, tea bags and fresh leaves from its Lucknow team. Bulk price, minimum quantity, documents and delivery feasibility are confirmed for each requirement.'],
      ['Is Basil (Ocimum basilicum) the same as Tulsi (Ocimum sanctum)?', 'They are listed as separate botanical identities and separate product ranges at VG Naturals. Include both the product form and botanical name in your enquiry.'],
      ['Can I buy fresh Basil leaves in bulk?', 'You can enquire about bulk fresh Basil leaves by sharing your required quantity, date and delivery PIN code. Supply depends on harvest availability and suitable delivery arrangements; confirm these before ordering.'],
    ],
  },
];
export function getBotanicalRange(slug: string) { return botanicalRanges.find(r => r.slug === slug); }
export function rangeForProduct(slug: string) { return botanicalRanges.find(r => slug.includes(r.slug)); }
export function normalizeProductSearch(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, ' ').replace(/basallicum|basalicum/g, 'basilicum').replace(/lemon grass/g, 'lemongrass').replace(/\bholy basil\b/g, 'tulsi').replace(/\bocimum tenuiflorum\b/g, 'ocimum sanctum').replace(/\bessential oil\b/g, 'oil');
}
