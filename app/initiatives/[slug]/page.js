import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { getInitiative, initiatives } from "@/lib/initiatives";
import styles from "./page.module.css";

export function generateStaticParams() {
  return initiatives.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const initiative = getInitiative(slug);
  if (!initiative) return { title: "Initiative" };
  return { title: initiative.title };
}

export default async function InitiativeDetailPage({ params }) {
  const { slug } = await params;
  const initiative = getInitiative(slug);

  if (!initiative) {
    notFound();
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={initiative.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <Link href="/initiatives" className={styles.back}>
            ← Back to Initiatives
          </Link>
          <Image
            src={initiative.icon}
            alt=""
            width={72}
            height={72}
            className={styles.heroIcon}
          />
          <h1>{initiative.title}</h1>
          <p>{initiative.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.twoCol}`}>
          <div>
            <h2 className="sectionTitle">About This Initiative</h2>
            <p className={styles.bodyText}>{initiative.about}</p>
            <h3 className={styles.subheading}>Our Approach</h3>
            <p className={styles.bodyText}>{initiative.approach}</p>
          </div>
          <div className={styles.impactBox}>
            <h3>Impact</h3>
            <ul>
              {initiative.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <h2 className="sectionTitle">Photo Gallery</h2>
          <div className={styles.gallery}>
            {initiative.gallery.map((src, i) => (
              <div key={src} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={`${initiative.title} photo ${i + 1}`}
                  width={400}
                  height={300}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Upcoming Events</h2>
          <div className={styles.eventsList}>
            {initiative.events.map((event) => (
              <div key={event.title} className={styles.eventCard}>
                <h4>{event.title}</h4>
                <p>{event.date}</p>
                <p className={styles.location}>{event.location}</p>
              </div>
            ))}
          </div>
          <Link href="/events" className={styles.viewEvents}>
            VIEW ALL EVENTS
          </Link>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2>Get Involved</h2>
          <p>Join us in making cities more child-friendly</p>
          <Button href="/get-involved" variant="primary">
            VOLUNTEER OR DONATE
          </Button>
        </div>
      </section>
    </>
  );
}
