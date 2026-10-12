import type {Metadata} from 'next';
export const metadata:Metadata={"title": "Contact VG Naturals | Lucknow", "description": "Contact VG Naturals in Lucknow for botanical product enquiries, retail packs and bulk supply requirements.", "alternates": {"canonical": "/contact"}};
import PageHero from '@/components/PageHero';
import Link from 'next/link';
const mapsLink = 'https://maps.app.goo.gl/DKijZJYgtTrcKpzG9';
const mapsEmbed = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d9015.217470051934!2d80.91231350993469!3d26.753462173795672!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1791693801113!5m2!1sen!2sin';

export default function Contact() {
  return <><PageHero eyebrow="Contact" title="Let’s Talk Botanicals" description="For product questions, retail packs and B2B sourcing enquiries, connect with the VG Naturals team in Lucknow."/><section className="section container contact-page">
    <div className="contact-actions"><a href="tel:+919044210088"><span>Call our team</span><strong>+91 90442 10088</strong></a><a href="https://wa.me/919044210088"><span>Start a conversation</span><strong>WhatsApp Us →</strong></a><Link href="/bulk-supply"><span>Business sourcing</span><strong>Request Bulk Quote →</strong></Link></div>
    <div className="contact-layout">
      <div className="card p-7">
        <h2>VG NATURALS PRIVATE LIMITED</h2>
        <p className="my-4">1248 ROYAL CITY PHASE 2, AURANGABAD JAGIR, B R A University, Lucknow-226025, Uttar Pradesh, India</p>
        <p><a href="tel:+919044210088">+91 90442 10088</a></p>
        <p className="my-3 break-words"><a href="mailto:vgnaturalspvtltd@gmail.com">vgnaturalspvtltd@gmail.com</a></p>
        <a href="https://wa.me/919044210088" className="btn mt-5">WhatsApp Us</a>
      </div>
      <div className="card p-5 sm:p-7 min-w-0">
        <h2>Location</h2>
        <p className="my-5">Lucknow, Uttar Pradesh, India</p>
        <div className="overflow-hidden rounded-xl border border-green-100 mb-5">
          <iframe
            src={mapsEmbed}
            title="VG Naturals location on Google Maps"
            width="600"
            height="450"
            className="block w-full h-[320px] sm:h-[400px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a href={mapsLink} className="btn" rel="noreferrer">Get Directions on Google Maps</a>
      </div>
    </div>
  </section></>;
}
