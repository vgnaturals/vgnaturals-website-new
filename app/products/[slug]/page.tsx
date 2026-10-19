import Link from 'next/link';
import { products, getProduct } from '@/data/products';
import { productContent, getProductFaqs } from '@/data/product-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BuyOptions from '@/components/BuyOptions';
import ProductCard from '@/components/ProductCard';
import LocalSourcing from '@/components/LocalSourcing';

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const content = productContent[p.slug];
  const title = p.status === 'coming-soon' ? `${p.name} in Lucknow | Coming Soon` : `${p.name} Supplier in Lucknow`;
  const description = p.status === 'coming-soon' ? `${p.name} from VG Naturals, Lucknow: coming soon. Register interest; availability, specifications and pricing will be confirmed before orders.` : `${p.name}${p.botanicalName ? ` (${p.botanicalName})` : ''} from VG Naturals, Lucknow. ${p.status === 'fresh' ? 'Confirm harvest availability and delivery.' : 'Explore listed packs and bulk enquiries.'}`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${title} | VG Naturals`,
      description,
      url: `/products/${p.slug}`,
      ...(p.image ? { images: [{ url: p.image, alt: `${p.name} — VG Naturals` }] } : {}),
    },
  };
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const content = productContent[p.slug];
  const faqs = content ? getProductFaqs(p, content) : [];
  const summary = content?.summary || p.description;
  const related = products.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const availability = p.status === 'ready' ? 'Retail packs listed' : p.status === 'fresh' ? 'Fresh — availability confirmation required' : 'Coming Soon — enquiries only';
  const quoteUrl = `/bulk-supply?product=${encodeURIComponent(p.name)}`;
  const details = [
    ['Product', p.name],
    ['Brand / company', 'VG Naturals / VG NATURALS PRIVATE LIMITED'],
    ['Category', p.category],
    ['Botanical identity', p.botanicalName || 'Final specification to be confirmed'],
    ['Product form', content?.form || p.category],
    ['Pack sizes and listed prices', p.variants.length ? p.variants.map(v => `${v.label} — ₹${v.price}`).join(' · ') : 'To be confirmed at launch'],
    ['Availability', availability],
    ['Bulk pricing and MOQ', p.status === 'coming-soon' ? 'To be confirmed when available' : 'Confirmed on enquiry'],
    ['Supplier location', 'Lucknow, Uttar Pradesh, India'],
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://www.vgnaturals.com/products/${p.slug}#product`,
    url: `https://www.vgnaturals.com/products/${p.slug}`,
    category: p.category,
    name: p.name,
    description: summary,
    image: p.image ? `https://www.vgnaturals.com${p.image}` : undefined,
    brand: { '@type': 'Brand', name: 'VG Naturals' },
    offers: p.status === 'ready' ? p.variants.map(v => ({
      '@type': 'Offer',
      name: `${p.name} — ${v.label}`,
      seller: { '@id': 'https://www.vgnaturals.com/#organization' },
      priceCurrency: 'INR',
      price: v.price,
      availability: 'https://schema.org/InStock',
      url: `https://www.vgnaturals.com/products/${p.slug}`,
    })) : undefined,
  };

  return (
    <section className="section container product-detail-page">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link> / <Link href="/products" className="hover:underline">Products</Link> / <span>{p.name}</span>
      </nav>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="card self-start">
          {p.image ? <img src={p.image} alt={`${p.name} — VG Naturals product catalogue image`} className="w-full max-h-[550px] object-contain bg-[#f4f6ef] p-8" /> : <div className="p-20">Product image available on enquiry</div>}
        </div>
        <div>
          <p className="eyebrow">{availability}</p>
          <h1 className="my-4">{p.name}</h1>
          {p.botanicalName && <p className="italic text-gray-600 mb-6">{p.botanicalName}</p>}
          <p className="leading-7 mb-7">{summary}</p>
          <BuyOptions p={p} />
          {p.variants.length > 0 && <p className="mt-4 text-sm text-gray-600">Packaging and courier charges are not included.</p>}
          <div className="mt-8 p-5 bg-[#f1f4ed] rounded-lg">
            <h2 className="text-xl">B2B enquiries</h2>
            <p className="mt-2 text-sm leading-6">{content?.buyingNote || 'Share your required quantity, application and delivery location for a quotation.'}</p>
            <Link href={quoteUrl} className="inline-block mt-3 font-semibold text-green-900 underline">Request a product-specific quote</Link>
          </div>
        </div>
      </div>

      <nav aria-label="Product information sections" className="flex flex-wrap gap-x-6 gap-y-3 border-y border-green-100 py-4 mt-12 text-sm font-semibold text-green-900">
        <a href="#description" className="underline">Description</a>
        <a href="#details" className="underline">Product details</a>
        {content && <a href="#applications" className="underline">Applications & buying guidance</a>}
        {faqs.length > 0 && <a href="#faqs" className="underline">FAQs</a>}
      </nav>

      <LocalSourcing product={p} />

      <section id="description" aria-labelledby="description-heading" className="mt-12 scroll-mt-40 max-w-4xl">
        <p className="eyebrow">About this product</p>
        <h2 id="description-heading" className="mt-2">{p.name}: detailed description</h2>
        <div className="prose mt-5">{(content?.description || [p.description]).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section id="details" aria-labelledby="details-heading" className="mt-12 scroll-mt-40">
        <h2 id="details-heading" className="mb-6">Product details</h2>
        <dl className="card divide-y divide-green-100">
          {details.map(([label, value]) => <div key={label} className="grid sm:grid-cols-3 gap-2 sm:gap-6 p-4 sm:px-6">
            <dt className="font-semibold">{label}</dt>
            <dd className="sm:col-span-2 leading-6">{value}</dd>
          </div>)}
        </dl>
      </section>

      {content && <section id="applications" aria-labelledby="applications-heading" className="mt-12 scroll-mt-40 grid md:grid-cols-2 gap-6">
        <div className="card p-6 sm:p-8">
          <h2 id="applications-heading" className="text-2xl">{p.status === 'coming-soon' ? 'Potential application enquiries' : 'Applications & buyer requirements'}</h2>
          <ul className="mt-5 list-disc pl-5 space-y-3 leading-7">{content.applications.map(application => <li key={application}>{application}</li>)}</ul>
        </div>
        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl">Before you order</h2>
          <p className="mt-5 leading-7">{content.buyingNote}</p>
          <p className="mt-3 leading-7">For product-specific ingredients, usage directions, storage and available technical information, contact our team and follow the supplied label.</p>
          <Link className="btn mt-5" href={quoteUrl}>{p.status === 'coming-soon' ? 'Register Product Interest' : 'Discuss Your Requirement'}</Link>
        </div>
      </section>}

      {faqs.length > 0 && <section id="faqs" aria-labelledby="faq-heading" className="mt-12 scroll-mt-40">
        <p className="eyebrow">Product questions</p>
        <h2 id="faq-heading" className="mt-2 mb-6">Frequently asked questions</h2>
        <div className="space-y-3">{faqs.map(({ question, answer }) => <details key={question} className="card group">
          <summary className="cursor-pointer p-5 sm:px-6 font-semibold text-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800">{question}</summary>
          <p className="px-5 sm:px-6 pb-5 leading-7 text-gray-700">{answer}</p>
        </details>)}</div>
        <p className="mt-6">Need more product information? <Link href={quoteUrl} className="font-semibold text-green-900 underline">Ask the VG Naturals team</Link>.</p>
      </section>}

      {related.length > 0 && <section className="mt-14" aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-6">Related Products</h2>
        <div className="grid-products">{related.map(x => <ProductCard key={x.slug} product={x} />)}</div>
      </section>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.vgnaturals.com/'},{'@type':'ListItem',position:2,name:'Products',item:'https://www.vgnaturals.com/products'},{'@type':'ListItem',position:3,name:p.name,item:`https://www.vgnaturals.com/products/${p.slug}`}]}]).replace(/</g, '\\u003c') }} />
    </section>
  );
}
