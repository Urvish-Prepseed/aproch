import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { stats, images } from "@/lib/data";
import { initiatives } from "@/lib/initiatives";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1>Nourishing Futures: Our Mission, Their Smiles</h1>
          <p>
            Building child-friendly cities through public programs, festivals,
            and community engagement. Every child deserves to be a protagonist
            in their own story.
          </p>
          <Button href="/get-involved" variant="primary">
            JOIN OUR CAUSE →
          </Button>
        </div>
      </section>

      <section className={`section ${styles.intro}`}>
        <div className="container">
          <p className={styles.introText}>
            APROCH (A Protagonist in Every Child) transforms cities into playgrounds of possibility. Through our five flagship initiatives, we empower children to explore, learn, and shape their urban environments. From cycling workshops to park activations, we&apos;re building communities where every child can thrive.
          </p>
        </div>
      </section>

      <section className={`section ${styles.initiatives}`}>
        <div className="container">
          <div className={styles.initiativesContent}>
            <div className={styles.initiativesHeader}>
              <h2 className="sectionTitle">Our Initiatives</h2>
              <p className="sectionSubtitle">
                Five programs creating child-friendly cities
              </p>
            </div>
            <div className={styles.initiativeGrid}>
            {initiatives.map((item) => (
              <Link
                key={item.slug}
                href={`/initiatives/${item.slug}`}
                className={styles.initiativeCard}
              >
                <div className={styles.initiativeCardTop}>
                  <div className={styles.initiativeIcon}>
                    <Image
                      src={item.icon}
                      alt=""
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.tagline}</p>
                </div>
                <span className={styles.learnMore}>
                  Learn More
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.impactBand}>
        <div className={styles.impactContainer}>
          <div className={styles.impactLayout}>
          <div className={styles.impactCopy}>
            <h2 className={styles.impactTitle}>Our Impact</h2>
            <p className={styles.impactSubtitle}>
              Through our programs, we&apos;ve reached thousands of children
              across 15 cities, transforming urban spaces into inclusive
              environments where every child can play, learn, and grow.
            </p>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyBg} aria-hidden="true">
          <Image
            src={images.story}
            alt=""
            fill
            sizes="100vw"
            className={styles.storyBgImage}
          />
        </div>
        <div className={styles.storyOverlay} aria-hidden="true" />
        <div className={styles.storyInner}>
          <div className={styles.storyCopy}>
            <h2 className={styles.storyTitle}>
              Every child deserves a city that works for them
            </h2>
            <p className={styles.storyText}>
              We work with communities, municipalities, and families to create
              urban environments where children feel safe, empowered, and
              inspired.
            </p>
            <Link href="/about" className={styles.storyBtn}>
              OUR STORY <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>
            Join our Cause! Everyone can help.
          </h2>
          <p className={styles.ctaText}>
            Your support enables us to create more programs, reach more
            children, and transform more cities into child-friendly spaces.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/get-involved" className={styles.ctaBtnDonate}>
              DONATE NOW
            </Link>
            <Link href="/get-involved" className={styles.ctaBtnVolunteer}>
              BECOME A VOLUNTEER
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
