import Link from 'next/link';
import {ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import styles from './Footer.module.css';
const explore = [['/products','All products'],['/categories','Categories'],['/about','About us'],['/blog','Blog']];
const business = [['/bulk-supply','Bulk supply'],['/industries','Industries'],['/catalogue','Catalogue'],['/coming-soon','Coming soon'],['/contact','Contact us']];
const policies = [['/privacy-policy','Privacy'],['/terms-and-conditions','Terms'],['/shipping-policy','Shipping'],['/refund-policy','Refunds'],['/cancellation-policy','Cancellation']];
const whatsapp = 'https://wa.me/919044210088?text='+encodeURIComponent('Hello VG Naturals, I would like to discuss a product requirement.');
export default function Footer(){
 return <footer className={styles.footer}>
  <section className={styles.enquiry} aria-labelledby="footer-enquiry-heading">
   <div className={styles.enquiryInner}>
    <div><p className={styles.eyebrow}>For manufacturers, formulators & distributors</p><h2 id="footer-enquiry-heading">Let’s discuss your<br/>botanical requirement.</h2><p className={styles.intro}>Share the product, quantity and delivery city. We’ll help you with availability, samples and a bulk quotation.</p></div>
    <div className={styles.enquiryActions}>
     <Link href="/bulk-supply" className={styles.primary}>Request Bulk Quote <ArrowUpRight size={18} aria-hidden="true"/></Link>
     <Link href="/catalogue" className={styles.secondary}>Explore Product Catalogue <ArrowUpRight size={18} aria-hidden="true"/></Link>
     <p>Prefer to talk? <a href="tel:+919044210088">+91 90442 10088</a></p>
    </div>
   </div>
  </section>
  <div className={styles.inner}><div className={styles.grid}>
   <div className={styles.brand}>
    <Link href="/" className={styles.logo} aria-label="VG Naturals home"><img src="/catalogue-assets/vg-naturals-leaf-gold-logo.png" alt="VG Naturals" width={88} height={88} loading="lazy"/></Link>
    <p className={styles.tagline}>Pure • Natural • Organic Care</p><p className={styles.description}>Essential oils, hydrosols and botanical products from Lucknow, India.</p>
    <div className={styles.socials}>
     <a href="https://www.instagram.com/vgnaturalspvtltd/" aria-label="VG Naturals on Instagram"><Instagram size={19} aria-hidden="true"/></a>
     <a href="https://www.facebook.com/profile.php?id=61593880927070" aria-label="VG Naturals on Facebook"><Facebook size={19} aria-hidden="true"/></a>
     <a href={whatsapp} aria-label="Chat with VG Naturals on WhatsApp"><MessageCircle size={19} aria-hidden="true"/></a>
    </div>
   </div>
   <nav className={styles.linkGroup} aria-label="Footer explore"><h3>Explore</h3><ul>{explore.map(([href,label])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
   <nav className={styles.linkGroup} aria-label="Footer business"><h3>For business</h3><ul>{business.map(([href,label])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
   <div className={styles.contact}><h3>Get in touch</h3>
    <a href="tel:+919044210088" className={styles.contactRow}><Phone size={18} aria-hidden="true"/><span><small>Call us</small>+91 90442 10088</span></a>
    <a href="mailto:vgnaturalspvtltd@gmail.com" className={styles.contactRow}><Mail size={18} aria-hidden="true"/><span><small>Email us</small>vgnaturalspvtltd@gmail.com</span></a>
    <div className={styles.contactRow}><MapPin size={18} aria-hidden="true"/><address>1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India</address></div>
   </div>
  </div>
  <div className={styles.bottom}><p>© {new Date().getFullYear()} VG Naturals Private Limited.</p><nav aria-label="Footer policies">{policies.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav></div>
  <p className={styles.note}>Packaging and courier charges are not included. Product availability and commercial terms are subject to confirmation.</p>
  </div>
 </footer>;
}
