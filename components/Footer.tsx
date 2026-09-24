import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { company, productCategories } from "@/lib/site-data";

export default function Footer() {
  return <footer className="bg-forest-dark text-ivory">
    <div className="border-b border-ivory/10"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div><h2 className="font-display text-2xl text-ivory">Looking for botanical products in bulk?</h2><p className="mt-2 max-w-2xl text-sm text-ivory/65">Tell us your product, quantity and application. We can discuss samples and bulk requirements.</p></div>
      <Link href="/request-quote" className="rounded-sm bg-gold px-6 py-3 font-medium text-forest-dark hover:bg-gold-light">Request Bulk Quote</Link>
    </div></div>
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div><Image src="/brand/vg-naturals-logo.png" alt="VG Naturals Pvt Ltd logo" width={110} height={110} className="h-20 w-20 object-contain"/><h3 className="mt-3 font-display text-xl">{company.headerName}</h3><p className="mt-2 text-sm text-ivory/60">{company.tagline}</p></div>
      <div><h3 className="font-semibold">Products</h3><div className="mt-4 grid gap-2 text-sm text-ivory/70">{productCategories.map(cat => <Link key={cat.name} href={cat.href} className="hover:text-gold">{cat.name}</Link>)}<Link href="/products" className="hover:text-gold">All Products</Link></div></div>
      <div><h3 className="font-semibold">Business</h3><div className="mt-4 grid gap-2 text-sm text-ivory/70"><Link href="/industries" className="hover:text-gold">Industries</Link><Link href="/bulk-supply" className="hover:text-gold">Bulk Supply</Link><Link href="/request-sample" className="hover:text-gold">Request Sample</Link><Link href="/request-quote" className="hover:text-gold">Request Bulk Quote</Link><Link href="/catalogue" className="hover:text-gold">Catalogue</Link><Link href="/about" className="hover:text-gold">About</Link><Link href="/blog" className="hover:text-gold">Blog</Link></div></div>
      <div><h3 className="font-semibold">Contact</h3><div className="mt-4 grid gap-3 text-sm text-ivory/70"><div className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold"/><span>{company.address}</span></div><a href={`tel:${company.phone.replace(/\s/g,"")}`} className="flex gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold"/>{company.phoneDisplay}</a><a href={`mailto:${company.email}`} className="flex gap-2 break-all hover:text-gold"><Mail className="h-4 w-4 text-gold"/>{company.email}</a><a href={company.whatsappBase} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-gold"><MessageCircle className="h-4 w-4 text-gold"/>WhatsApp</a></div></div>
    </div>
    <div className="border-t border-ivory/10 px-6 py-5 text-center text-xs text-ivory/45">© {new Date().getFullYear()} {company.legalName}. All rights reserved.</div>
  </footer>
}
