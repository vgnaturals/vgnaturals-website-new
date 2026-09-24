import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://vgnaturals.com"),
  title: { default: "VG Naturals Pvt Ltd | Essential Oils, Hydrosols & Botanical Air Fresheners", template: "%s | VG Naturals" },
  description: "VG Naturals Private Limited supplies Lemongrass and Tulsi essential oils, hydrosols and botanical air fresheners for B2B product development and bulk requirements in India.",
  keywords: ["essential oil supplier India", "lemongrass essential oil supplier", "tulsi essential oil supplier", "hydrosol supplier India", "botanical products supplier", "bulk essential oils"],
  alternates: { canonical: "https://vgnaturals.com/" },
  openGraph: { title: "VG Naturals Pvt Ltd", description: "Essential Oils, Hydrosols & Botanical Air Fresheners from India", url: "https://vgnaturals.com/", siteName: "VG Naturals", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: company.legalName, url: "https://vgnaturals.com/", email: company.email, telephone: company.phone, logo: "https://vgnaturals.com/brand/vg-naturals-logo.png", address: { "@type": "PostalAddress", streetAddress: "1248 Royal City Phase 2, Aurangabad Jagir, B R A University", addressLocality: "Lucknow", postalCode: "226025", addressRegion: "Uttar Pradesh", addressCountry: "IN" } };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}}/><Navbar/><main>{children}</main><Footer/></body></html>;
}
