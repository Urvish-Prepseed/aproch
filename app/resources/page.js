import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import { resources } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources"
        subtitle="Tools, guides, and materials to help create child-friendly cities"
      />

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Available Resources</h2>
          <p className="sectionSubtitle">
            Download our guides, toolkits, and research to support your work
            with children
          </p>
          <div className={styles.grid}>
            {resources.map((resource) => (
              <article key={resource.title} className={styles.card}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button type="button" className={styles.downloadBtn}>
                  Download
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2>Need Custom Resources?</h2>
          <p>
            If you need specific materials or support for your project, please
            contact us. We&apos;re happy to provide customized resources and
            guidance.
          </p>
          <Button href="/contact" variant="primary">
            CONTACT US
          </Button>
        </div>
      </section>
    </>
  );
}
