"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { company, productCategories } from "@/lib/site-data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="VG Naturals home">
          <Image src="/brand/vg-naturals-logo.png" alt="VG Naturals Pvt Ltd logo" width={76} height={76} className="h-14 w-14 object-contain sm:h-16 sm:w-16" priority />
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold leading-tight text-forest sm:text-xl">{company.headerName}</div>
            <div className="font-body text-[11px] tracking-wide text-ink/60 sm:text-xs">{company.tagline}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          <Link className="nav-link" href="/">Home</Link>
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button className="nav-link inline-flex items-center gap-1" onClick={() => setProductsOpen(!productsOpen)} aria-expanded={productsOpen}>Products <ChevronDown className="h-4 w-4" /></button>
            {productsOpen && <div className="absolute right-0 top-full mt-2 w-80 rounded-md border border-forest/10 bg-white p-4 shadow-xl">
              {productCategories.map((cat) => <div key={cat.name} className="mb-4 last:mb-0">
                <Link href={cat.href} className="font-display text-lg text-forest">{cat.name}</Link>
                <div className="mt-2 grid gap-1">
                  {cat.items.map((p) => <Link key={p.slug} href={p.href} className="rounded px-2 py-1.5 text-sm text-ink/70 hover:bg-cream hover:text-forest">{p.name}</Link>)}
                </div>
              </div>)}
            </div>}
          </div>
          <Link className="nav-link" href="/industries">Industries</Link>
          <Link className="nav-link" href="/bulk-supply">Bulk Supply</Link>
          <Link className="nav-link" href="/blog">Blog</Link>
          <Link className="nav-link" href="/contact">Contact</Link>
          <Link className="nav-link" href="/catalogue">Catalogue</Link>
          <Link href="/request-quote" className="rounded-sm bg-forest px-4 py-2.5 text-sm font-medium text-ivory hover:bg-forest-dark">Request Bulk Quote</Link>
        </nav>
        <button className="rounded p-2 text-forest lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-forest/10 bg-white px-5 py-5 lg:hidden">
        <div className="grid gap-1">
          <Link className="mobile-link" href="/" onClick={() => setOpen(false)}>Home</Link>
          <div className="rounded border border-forest/10 p-3">
            <div className="font-semibold text-forest">Products</div>
            {productCategories.map((cat) => <div key={cat.name} className="mt-3"><Link href={cat.href} onClick={() => setOpen(false)} className="font-medium text-forest">{cat.name}</Link><div className="mt-1 grid gap-1 pl-3">{cat.items.map(p => <Link key={p.slug} href={p.href} onClick={() => setOpen(false)} className="text-sm text-ink/70">{p.name}</Link>)}</div></div>)}
          </div>
          {[["Industries","/industries"],["Bulk Supply","/bulk-supply"],["Blog","/blog"],["Contact","/contact"],["Catalogue","/catalogue"]].map(([name,href]) => <Link key={href} className="mobile-link" href={href} onClick={() => setOpen(false)}>{name}</Link>)}
          <Link href="/request-quote" className="mt-2 rounded-sm bg-forest px-5 py-3 text-center font-medium text-ivory" onClick={() => setOpen(false)}>Request Bulk Quote</Link>
        </div>
      </div>}
    </header>
  );
}
