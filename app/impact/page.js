import { stats, impactStories } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "Impact",
};

function ImpactIcon({ name, size = 40 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "users") {
    return (
      <svg {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...props}>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }

  if (name === "mapPin") {
    return (
      <svg {...props}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function ImpactPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Our Impact</h1>
          <p className={styles.heroSubtitle}>
            Measuring the change we create in communities and children&apos;s
            lives
          </p>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.pageInner}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: stat.accent }}
                >
                  <ImpactIcon name={stat.icon} />
                </div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storiesSection}>
        <div className={styles.pageInner}>
          <h2 className={styles.sectionHeading}>Impact Stories</h2>
          <p className={styles.sectionSubtitle}>
            Real stories of how our programs are transforming cities and
            empowering children
          </p>
          <div className={styles.storiesGrid}>
            {impactStories.map((story) => (
              <article key={story.title} className={styles.storyCard}>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyText}>{story.description}</p>
                <div className={styles.storyStat}>
                  <ImpactIcon name={story.icon} size={20} />
                  <span>{story.stat}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
