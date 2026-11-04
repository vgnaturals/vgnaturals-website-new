import Link from 'next/link';
import type { Product } from '@/data/products';
import type { ProductContent } from '@/data/product-content';

/**
 * This panel separates facts from the public catalogue and questions that
 * still need a product/batch-specific answer. Never infer that a lab report,
 * certification, manufacturing origin or batch is available from a photo.
 */
const procurementQuestions: Record<string, string[]> = {
  'Essential Oils': [
    'Confirm the identity and composition specifications for the exact essential oil batch offered.',
    'Request available batch identification, handling guidance and any product-specific analysis your quality team requires.',
    'Confirm sample packaging, bulk MOQ, final quote and delivery feasibility before ordering.'
  ],
  Hydrosols: [
    'Ask whether the particular hydrosol is preserved, and confirm its ingredients and production approach.',
    'Request available batch information, storage guidance and shelf-life or microbial-quality data relevant to your application.',
    'Check the hydrosol in your finished formulation; separately confirm bulk packaging, MOQ and freight.'
  ],
  'Herbal Teas': [
    'Confirm the supplied ingredient composition, pack labels, pouch count and intended preparation instructions.',
    'Ask for available batch, food-safety, storage and best-before details for the particular tea pack.',
    'For hotel, café or resale supply, confirm the commercial carton quantity and delivery requirements.'
  ],
  'Fresh Botanicals': [
    'Confirm the exact plant identity, proposed harvest window and the weight you need.',
    'Ask how the leaves would be packed and handled in transit, including suitability for your destination.',
    'Confirm available quantities, delivery date and freshness expectations before treating an enquiry as an order.'
  ],
  'Home Care': [
    'Request the offered product ingredients, label directions and any applicable safety or handling information.',
    'Confirm the specific intended use and claims actually supported by the offered product; no disinfectant or medical performance is implied.',
    'Confirm packs, bulk packaging, applicable delivery charges and availability before placing an order.'
  ]
};

export default function ProductEvidencePanel({ product, content }: { product: Product; content?: ProductContent }) {
  if (product.status === 'coming-soon') return null;
  const checks = procurementQuestions[product.category] || [
    'Confirm the identity and specification of the exact offered material.',
    'Ask about available batch details, intended use and handling information.',
    'Confirm quantity, packaging, delivery and commercial terms before ordering.'
  ];
  const reference = `/bulk-supply?product=${encodeURIComponent(product.name)}`;
  return (
    <section className="mt-10 card p-6 sm:p-8" aria-labelledby="product-evidence-heading">
      <p className="eyebrow">Product sourcing transparency</p>
      <h2 id="product-evidence-heading" className="mt-2 text-2xl">What is published, and what should a buyer verify?</h2>
      <p className="mt-3 max-w-4xl leading-7">
        VG Naturals lists this product for sourcing enquiries from Lucknow and across India. The public catalogue identifies the product and its listed retail packs.
        A website product photo or a farm photograph is not a batch analysis, an organic certificate, or proof that this particular pack came from our own cultivation.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Published product information</h3>
          <dl className="mt-3 divide-y divide-green-100">
            {[
              ['Exact listed product', product.name],
              ['Listed botanical name', product.botanicalName || 'Confirm the botanical identity for this item'],
              ['Listed form', content?.form || product.category],
              ['Published pack prices', product.variants.map(v => `${v.label} — ₹${v.price}`).join(' · ')],
              ['Ordering status', product.status === 'fresh' ? 'Harvest and delivery availability must be confirmed' : 'Retail packs listed; confirm stock before ordering'],
              ['Supply base', 'Lucknow, Uttar Pradesh, India']
            ].map(([term, value]) => <div key={term} className="py-2">
              <dt className="text-sm font-semibold">{term}</dt><dd className="text-sm leading-6">{value}</dd>
            </div>)}
          </dl>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Confirm for the offered product or batch</h3>
          <ul className="mt-3 list-disc pl-5 space-y-3 leading-7">
            {checks.map(question => <li key={question}>{question}</li>)}
          </ul>
          <p className="mt-4 text-sm leading-7">
            Required documents and specifications are subject to confirmation; they are not automatically included with every listing.
            Retail prices exclude packaging and courier charges. Bulk quotations are separate.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <Link href={reference} className="btn">Ask about this exact product</Link>
        <Link href="/catalogue" className="underline text-green-900 font-semibold">View current catalogue</Link>
        <Link href="/about#farm-gallery-title" className="underline text-green-900 font-semibold">See original farm photographs</Link>
      </div>
    </section>
  );
}
