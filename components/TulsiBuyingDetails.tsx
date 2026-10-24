import Link from 'next/link';
import { products } from '@/data/products';

const buyingNotes: Record<string,string> = {
  'tulsi-essential-oil': 'Ingredient enquiries: confirm application, specifications and available batch information.',
  'tulsi-hydrosol': 'Water-based ingredient enquiries: confirm composition, preservation, shelf life and storage.',
  'herbal-tulsi-tea-pouch': 'Herbal tea packs: confirm ingredients, label details and retail or wholesale quantity.',
  'fresh-tulsi-leaves': 'Fresh leaves: confirm harvest, required date, quantity and delivery feasibility.',
  'tulsi-air-sanitizing-spray': 'Finished spray: check supplied label directions and intended use. The name alone does not establish disinfectant performance.',
};
export default function TulsiBuyingDetails() {
  return <section className="mt-12" aria-labelledby="tulsi-packs">
    <h2 id="tulsi-packs">Tulsi oil, hydrosol, tea and fresh leaves: packs and prices</h2>
    <p className="my-4 max-w-4xl leading-7">Choose the product form before comparing prices. Essential oil, hydrosol, tea, fresh leaves and spray are separate products. The prices below come from our current product catalogue. Packaging and courier charges are extra; final commercial terms are confirmed in your quotation.</p>
    <div className="overflow-x-auto"><table className="w-full text-left border-collapse">
      <caption className="text-left text-sm mb-3">VG Naturals Tulsi (Ocimum sanctum) catalogue. Fresh-leaf supply requires confirmation.</caption>
      <thead><tr className="bg-green-50"><th scope="col" className="p-4">Product</th><th scope="col" className="p-4">Listed packs and prices</th><th scope="col" className="p-4">What to confirm</th></tr></thead>
      <tbody>{products.filter(p=>p.slug.includes('tulsi')).map(p=><tr className="border-b border-green-100" key={p.slug}>
        <th scope="row" className="p-4"><Link className="underline text-green-900" href={'/products/'+p.slug}>{p.name}</Link></th>
        <td className="p-4">{p.variants.map(v=>v.label+' — ₹'+v.price).join(' / ')}</td>
        <td className="p-4 leading-7">{buyingNotes[p.slug] || 'Confirm product specifications and availability.'}</td>
      </tr>)}</tbody>
    </table></div>
    <section className="card p-6 sm:p-8 mt-8" aria-labelledby="fresh-tulsi-buying">
      <h3 id="fresh-tulsi-buying" className="text-xl font-semibold">Buying fresh Tulsi leaves online or in bulk</h3>
      <p className="mt-3 leading-7">For fresh-leaf enquiries, send the quantity in grams or kilograms, delivery city and PIN code, required date and intended use. Ask about harvest availability and suitable packaging before agreeing a dispatch. A listed 500 g pack does not guarantee immediate stock or delivery to every destination.</p>
      <Link className="btn mt-5" href="/bulk-supply?product=Fresh%20Tulsi%20Leaves">Enquire about fresh Tulsi leaves</Link>
    </section>
    <p className="mt-6 text-sm leading-6">Botanical-name references: <a className="underline" href="https://powo.science.kew.org/taxon/30252269-2">Kew: Ocimum sanctum and Ocimum tenuiflorum</a>; <a className="underline" href="https://www.nparks.gov.sg/florafaunaweb/flora/2/2/2275">NParks: Holy Basil</a>. These references explain plant names; they do not certify VG Naturals products.</p>
  </section>;
}
