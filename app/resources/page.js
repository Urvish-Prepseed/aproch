import { resources } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "Resources",
};

function DownloadIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function ResourceIcon({ name }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "book-open") {
    return (
      <svg {...props}>
        <path d="M12 7v14" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Resources</h1>
          <p className={styles.heroSubtitle}>
            Tools, guides, and materials to help create child-friendly cities
          </p>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.pageInner}>
          <div className={styles.intro}>
            <h2 className={styles.sectionTitle}>Available Resources</h2>
            <p className={styles.sectionSubtitle}>
              Download our guides, toolkits, and research to support your work
              with children
            </p>
          </div>

          <div className={styles.grid}>
            {resources.map((resource) => (
              <article key={resource.title} className={styles.card}>
                <div className={styles.cardRow}>
                  <div
                    className={styles.iconBox}
                    style={{ backgroundColor: resource.accent }}
                  >
                    <ResourceIcon name={resource.icon} />
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{resource.title}</h3>
                    <p className={styles.cardText}>{resource.description}</p>
                    <button type="button" className={styles.downloadBtn}>
                      <DownloadIcon />
                      Download
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.pageInner}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Need Custom Resources?</h2>
            <p className={styles.ctaText}>
              If you need specific materials or support for your project, please
              contact us. We&apos;re happy to provide customized resources and
              guidance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
