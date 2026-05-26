import PageHero from "@/components/PageHero";
import { stats, impactStories } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "Impact",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        title="Our Impact"
        subtitle="Measuring the change we create in communities and children's lives"
      />

      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Impact Stories</h2>
          <p className="sectionSubtitle">
            Real stories of how our programs are transforming cities and
            empowering children
          </p>
          <div className={styles.stories}>
            {impactStories.map((story) => (
              <article key={story.title} className={styles.storyCard}>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <span className={styles.storyStat}>{story.stat}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
