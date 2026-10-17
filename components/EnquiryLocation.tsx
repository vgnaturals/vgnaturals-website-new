import EnquiryForm from './EnquiryForm';
import styles from './EnquiryLocation.module.css';

const mapsLink = 'https://maps.app.goo.gl/DKijZJYgtTrcKpzG9';
const mapsEmbed = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d9015.217470051934!2d80.91231350993469!3d26.753462173795672!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1791693801113!5m2!1sen!2sin';

export default function EnquiryLocation() {
  return <section className={styles.section} aria-labelledby="enquiry-location-heading">
    <div className={styles.inner}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>CONNECT WITH VG NATURALS</p>
        <h2 id="enquiry-location-heading">Your next sourcing conversation starts here.</h2>
        <p>Tell us what you need, or find our business location in Lucknow.</p>
      </div>
      <div className={styles.grid}>
        <div className={styles.panel}>
          <div className={styles.panelHeading}><span className={styles.number}>01</span><div><h3>Send an enquiry</h3><p>Samples, product availability and bulk supply.</p></div></div>
          <EnquiryForm />
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeading}><span className={styles.number}>02</span><div><h3>Find us in Lucknow</h3><p>VG NATURALS PRIVATE LIMITED</p></div></div>
          <div className={styles.map}>
            <iframe src={mapsEmbed} title="Find VG Naturals on Google Maps" width="600" height="350" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
          <address className={styles.address}>1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India</address>
          <div className={styles.actions}><a href={mapsLink} className="btn">View Location &amp; Directions</a><a href="tel:+919044210088" className={styles.call}>Call +91 90442 10088</a></div>
          <p className={styles.note}>Please contact our team before planning a visit.</p>
        </div>
      </div>
    </div>
  </section>;
}
