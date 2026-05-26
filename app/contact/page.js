import ContactForm from "./ContactForm";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            Get in touch to learn more about our work or explore collaboration
            opportunities
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
