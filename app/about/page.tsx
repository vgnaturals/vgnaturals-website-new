import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About VG Naturals | Botanical Products & Farm Gallery', description: 'Meet VG Naturals Private Limited in Lucknow and explore original farm photographs, botanical products and B2B supply enquiries.' };
const farmPhotos = [
  { image: 'image1.jpg', caption: 'Botanical planting rows' },
  { image: 'image2.jpg', caption: 'A closer look at our botanicals' },
  { image: 'image3.jpg', caption: 'Field care and cultivation' },
  { image: 'image6.jpg', caption: 'Green growth in the field' },
  { image: 'image9.jpg', caption: 'A wider view of the plantation' },
  { image: 'image15.jpg', caption: 'Botanical cultivation across the farm' },
];
export default function About() {
  return <section className="section container">
    <p className="eyebrow">About us</p><h1>VG NATURALS PRIVATE LIMITED</h1>
    <p className="my-5 text-xl">Pure • Natural • Organic Care</p>
    <div className="grid md:grid-cols-2 gap-9 items-center">
      <div className="prose">
        <p>VG Naturals is based in Lucknow, Uttar Pradesh, India. We focus on botanical ingredients and natural products for manufacturers, formulators, brands, distributors and individual customers.</p>
        <p>Our business direction connects cultivation, botanical sourcing, processing, product development, packaging and branding. Our range includes essential oils, hydrosols, herbal teas, fresh botanicals and home-care products.</p>
        <p>We welcome bulk enquiries for lemongrass, Tulsi (Ocimum sanctum) and Basil (Ocimum basilicum) products. Share your intended application, quantity and delivery location so our team can discuss availability and commercial requirements.</p>
        <Link href="/bulk-supply" className="btn mt-4">Discuss Bulk Supply</Link>
      </div>
      <img src="/catalogue-assets/image12.jpg" alt="VG Naturals field photograph from the master product catalogue" className="rounded-xl w-full max-h-96 object-cover" />
    </div>
    <section className="mt-16" aria-labelledby="farm-gallery-title">
      <p className="eyebrow">Cultivation & botanicals</p><h2 id="farm-gallery-title" className="mt-2">Our Farm Gallery</h2>
      <p className="mt-4 mb-7 max-w-3xl text-gray-700">Explore original farm photographs shared in the VG Naturals master product catalogue.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmPhotos.map(photo => <figure key={photo.image} className="card">
          <a href={`/catalogue-assets/${photo.image}`} target="_blank" rel="noreferrer" aria-label={`View full photograph: ${photo.caption}`}>
            <img src={`/catalogue-assets/${photo.image}`} alt={`${photo.caption} — VG Naturals farm photograph`} loading="lazy" className="w-full h-64 object-cover" />
          </a><figcaption className="p-4 text-sm text-gray-700">{photo.caption}</figcaption>
        </figure>)}
      </div>
    </section>
  </section>;
}
