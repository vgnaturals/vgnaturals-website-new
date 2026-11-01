import Link from 'next/link';
import PageHero from '@/components/PageHero';
import QuoteStrip from '@/components/QuoteStrip';
import type { Metadata } from 'next';
export const metadata: Metadata = { alternates:{canonical:'/about'}, title: 'About Our Farm, Extraction & Botanical Products | VG Naturals', description: 'Discover VG Naturals in Lucknow: original farm photographs, Lemongrass and Tulsi cultivation, botanical extraction, essential oils, hydrosols and bulk buyer enquiries.' };
const farmPhotos = [
  { image: 'botanical-farm-planting-rows.jpg', caption: 'Botanical planting rows' },
  { image: 'botanical-plant-leaves-close-up.jpg', caption: 'A closer look at our botanicals' },
  { image: 'botanical-farm-field-care.jpg', caption: 'Field care and cultivation' },
  { image: 'botanical-farm-green-growth.jpg', caption: 'Green growth in the field' },
  { image: 'botanical-farm-plantation-view.jpg', caption: 'A wider view of the plantation' },
  { image: 'botanical-farm-cultivation-landscape.jpg', caption: 'Botanical cultivation across the farm' },
];
export default function About() {
  return <><PageHero eyebrow="From Our Farm to Your Product" title="Our Farm-to-Product Journey" description="At VG Naturals in Lucknow, we cultivate selected botanicals, work with extraction and distillation, and develop essential oils, hydrosols and natural products for business buyers."/><section className="section container about-page">
    <p className="eyebrow">About us</p><h2>VG NATURALS PRIVATE LIMITED</h2>
    <p className="my-5 text-xl">Pure • Natural • Organic Care</p>
    <div className="farm-story-grid">
      <div className="prose">
        <p>VG Naturals is based in Lucknow, Uttar Pradesh, India. We focus on botanical ingredients and natural products for manufacturers, formulators, brands, distributors and individual customers.</p>
        <p>We cultivate selected botanicals, including Lemongrass and Tulsi, at our farm. Through extraction and distillation of suitable botanical material, alongside sourcing, processing and product development, we build a range that includes essential oils, hydrosols, herbal teas, fresh botanicals and home-care products.</p><p>Our approach connects farming to product applications. We do not assume that every finished product or ingredient comes entirely from our own farm; buyers can discuss origin, specifications, available documentation and batch details for the product they need.</p>
        <p>We welcome bulk enquiries for lemongrass, Tulsi (Ocimum sanctum) and Basil (Ocimum basilicum) products. Share your intended application, quantity and delivery location so our team can discuss availability and commercial requirements.</p>
        <Link href="/bulk-supply" className="btn mt-4">Discuss Bulk Supply</Link>
      </div>
      <img src="/catalogue-assets/botanical-farm-field-landscape.jpg" alt="VG Naturals field photograph from the master product catalogue" className="rounded-xl w-full max-h-96 object-cover" />
    </div>
    <section className="mt-16" aria-labelledby="farm-process-title"><p className="eyebrow">How we work</p><h2 id="farm-process-title">From Cultivation to Extraction and Product Development</h2><div className="grid gap-5 md:grid-cols-4 mt-6">{[['01','Cultivation','We grow and care for selected botanicals including Lemongrass and Tulsi.'],['02','Harvest & handling','Botanical material is assessed and prepared according to the intended product format.'],['03','Extraction & distillation','Applicable botanicals are processed for essential oils and hydrosols.'],['04','Product development','We prepare product formats and discuss packaging, specifications and B2B supply.']].map(([number,title,description])=><article className="card p-5" key={number}><p className="eyebrow">{number}</p><h3 className="text-xl mt-2">{title}</h3><p className="mt-3 leading-7">{description}</p></article>)}</div><p className="mt-5 text-sm leading-7">Product identity, in-house processing, external sourcing, documents and availability must be confirmed per item. Rosemary, Vetiver and Chamomile pipeline products are not presented as available stock.</p></section><section className="mt-16" aria-labelledby="farm-gallery-title">
      <p className="eyebrow">Cultivation & botanicals</p><h2 id="farm-gallery-title" className="mt-2">Our Farm Gallery</h2>
      <p className="mt-4 mb-7 max-w-3xl text-gray-700">Explore original farm photographs shared in the VG Naturals master product catalogue.</p>
      <div className="farm-gallery">
        {farmPhotos.map(photo => <figure key={photo.image} className="card">
          <a href={`/catalogue-assets/${photo.image}`} rel="noreferrer" aria-label={`View full photograph: ${photo.caption}`}>
            <img src={`/catalogue-assets/${photo.image}`} alt={`${photo.caption} — VG Naturals farm photograph`} loading="lazy" className="w-full h-64 object-cover" />
          </a><figcaption className="p-4 text-sm text-gray-700">{photo.caption}</figcaption>
        </figure>)}
      </div>
    </section>
  </section><QuoteStrip/></>;
}
