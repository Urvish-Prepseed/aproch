"use client";

import styles from "./page.module.css";

function MailIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const contactBlocks = [
  {
    title: "Email",
    icon: MailIcon,
    accent: "#f27a21",
    lines: ["info@aproch.org", "programs@aproch.org"],
  },
  {
    title: "Phone",
    icon: PhoneIcon,
    accent: "#f4a623",
    lines: ["+1 (555) 123-4567"],
    href: "tel:+15551234567",
  },
  {
    title: "Address",
    icon: MapPinIcon,
    accent: "#e74c3c",
    lines: ["123 Child-Friendly Street", "Urban Center, UC 12345"],
  },
];

export default function ContactForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className={styles.mainSection}>
      <div className={styles.pageInner}>
        <div className={styles.layout}>
          <div className={styles.formCol}>
            <h2 className={styles.sectionTitle}>Send us a message</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Your message"
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                SEND MESSAGE
              </button>
            </form>
          </div>

          <div className={styles.infoCol}>
            <h2 className={styles.sectionTitle}>Get in touch</h2>
            <div className={styles.infoList}>
              {contactBlocks.map((block) => {
                const Icon = block.icon;
                return (
                  <div key={block.title} className={styles.infoRow}>
                    <div
                      className={styles.iconBox}
                      style={{ backgroundColor: block.accent }}
                    >
                      <Icon />
                    </div>
                    <div>
                      <h3 className={styles.infoTitle}>{block.title}</h3>
                      {block.lines.map((line, i) => (
                        <p key={line} className={styles.infoText}>
                          {block.href && i === 0 ? (
                            <a href={block.href}>{line}</a>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.hoursBox}>
              <h3 className={styles.hoursTitle}>Office Hours</h3>
              <p className={styles.infoText}>
                Monday - Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
