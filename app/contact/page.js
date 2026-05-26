"use client";

import PageHero from "@/components/PageHero";
import styles from "./page.module.css";

export default function ContactPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch to learn more about our work or explore collaboration opportunities"
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div>
            <h2 className={styles.formTitle}>Send us a message</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit" className={styles.submitBtn}>
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className={styles.info}>
            <h2>Get in touch</h2>
            <div className={styles.infoBlock}>
              <h3>Email</h3>
              <p>
                <a href="mailto:info@aproch.org">info@aproch.org</a>
              </p>
              <p>
                <a href="mailto:programs@aproch.org">programs@aproch.org</a>
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Phone</h3>
              <p>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Address</h3>
              <p>
                123 Child-Friendly Street
                <br />
                Urban Center, UC 12345
              </p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
