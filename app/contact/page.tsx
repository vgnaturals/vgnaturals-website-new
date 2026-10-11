const mapsLink = 'https://maps.app.goo.gl/DKijZJYgtTrcKpzG9';
const mapsEmbed = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d9015.217470051934!2d80.91231350993469!3d26.753462173795672!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1791693801113!5m2!1sen!2sin';

export default function Contact() {
  return <section className="section container">
    <p className="eyebrow">Get in touch</p>
    <h1>Contact VG Naturals</h1>
    <div className="grid md:grid-cols-2 gap-10 my-8">
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
        <a href={mapsLink} className="btn" target="_blank" rel="noreferrer">Get Directions on Google Maps</a>
      </div>
    </div>
  </section>;
}
