import Link from 'next/link';
import type { Product } from '@/data/products';

/**
 * Buyer-focused sourcing checklist for the two distinct lemongrass ingredients.
 * Claims about certificates, composition, preservation, inventory or MOQ must
 * be verified for each batch rather than implied by the product category.
 */
export default function LemongrassBuyerChecklist({ product }: { product: Product }) {
  const hydrosol = product.slug === 'lemongrass-hydrosol';
  const oil = product.slug === 'lemongrass-essential-oil';
  if (!hydrosol && !oil) return null;

  const otherProduct = hydrosol ? '/products/lemongrass-essential-oil' : '/products/lemongrass-hydrosol';
  const guide = hydrosol
    ? '/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators'
    : '/blog/essential-oil-bulk-buying';
  const quoteUrl = '/bulk-supply?product=' + encodeURIComponent(product.name);

  return (
    <section id="lemongrass-buyer-checklist" aria-labelledby="lemongrass-buyer-heading" className="mt-12 card p-6 sm:p-8">
      <p className="eyebrow">For manufacturers, formulators and wholesale buyers</p>
      <h2 id="lemongrass-buyer-heading" className="mt-3 text-2xl">
        {hydrosol ? 'Lemongrass Hydrosol: Buyer Specification & Bulk Enquiry Checklist' : 'Lemongrass Essential Oil: Buyer Specification & Bulk Enquiry Checklist'}
      </h2>
      <p className="mt-4 leading-7">
        {hydrosol
          ? 'Buying Lemongrass Hydrosol for a cosmetic, personal-care or aromatic-water formulation? Confirm that the offered water-based material fits your application before requesting recurring supply. A hydrosol is not interchangeable with essential oil.'
          : 'Sourcing Lemongrass Essential Oil (Cymbopogon flexuosus) for a soap, fragrance, personal-care or home-fragrance formulation? Check botanical identity and the supplied oil specification before committing to a manufacturing order.'}
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-xl font-semibold">Technical details to request</h3>
          <ul className="list-disc pl-5 mt-3 space-y-2 leading-7">
            <li>Exact product identity, composition, source and processing method for the proposed batch</li>
            <li>{hydrosol ? 'Preservation status, microbial-quality requirements, storage guidance and applicable shelf-life information' : 'Available composition details, intended-use handling guidance, storage conditions and batch identification'}</li>
            <li>Available batch documents or test reports required by your procurement team; their availability must be confirmed</li>
            <li>Sample evaluation requirements and compatibility with your intended finished formulation</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Information for a comparable bulk quote</h3>
          <ul className="list-disc pl-5 mt-3 space-y-2 leading-7">
            <li>Required quantity with a clear unit (litres, millilitres or kilograms)</li>
            <li>Preferred packaging and any special labelling requirements</li>
            <li>Delivery city, PIN code and target delivery date</li>
            <li>Expected reorder frequency, if recurring supply is being considered</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 leading-7 text-sm">
        Listed 50 ml and 100 ml packs are separate from a commercial bulk quotation. MOQ, actual stock, pricing, freight, applicable taxes, document availability and dispatch timing are confirmed on enquiry. No particular certification or laboratory result is guaranteed by this page.
      </p>
      <div className="flex flex-wrap gap-4 mt-6">
        <Link href={quoteUrl} className="btn">Request a Product-Specific Bulk Quote</Link>
        <Link href={guide} className="btn btn-outline">{hydrosol ? 'Read the Cosmetic Formulator Hydrosol Guide' : 'Read the Essential Oil Procurement Guide'}</Link>
      </div>
      <p className="mt-5 leading-7">
        Need a different material? Compare <Link href={otherProduct} className="underline font-semibold text-green-900">{hydrosol ? 'Lemongrass Essential Oil for fragrance and soap formulations' : 'Lemongrass Hydrosol for water-based formulation enquiries'}</Link> before specifying an ingredient.
      </p>
    </section>
  );
}
