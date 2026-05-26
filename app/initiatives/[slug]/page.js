import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryImage from "@/components/GalleryImage";
import InitiativeVideo from "@/components/InitiativeVideo";
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

function CalendarIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default async function InitiativeDetailPage({ params }) {
  const { slug } = await params;
  const initiative = getInitiative(slug);

  if (!initiative) {
    notFound();
  }

  return (
    <>
      <section
        className={styles.hero}
        style={{ backgroundColor: initiative.heroColor }}
      >
        <div className={styles.pageInner}>
          <Link href="/initiatives" className={styles.back}>
            <span aria-hidden="true">←</span> Back to Initiatives
          </Link>
          <div className={styles.heroBrand}>
            <Image
              src={initiative.icon}
              alt=""
              width={128}
              height={128}
              className={styles.heroIcon}
            />
            <div>
              <h1 className={styles.heroTitle}>{initiative.title}</h1>
              <p className={styles.heroTagline}>{initiative.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.pageInner}>
          <div className={styles.contentGrid}>
            <div className={styles.mainCol}>
              {initiative.youtubeId && (
                <InitiativeVideo
                  videoId={initiative.youtubeId}
                  thumbnail={initiative.heroImage}
                  title={initiative.title}
                />
              )}

              <div className={styles.block}>
                <h2 className={styles.sectionTitle}>About This Initiative</h2>
                <p className={styles.bodyText}>{initiative.about}</p>
              </div>

              <div className={styles.block}>
                <h3 className={styles.subTitle}>Our Approach</h3>
                <p className={styles.bodyText}>{initiative.approach}</p>
              </div>

              <div className={styles.block}>
                <h3 className={styles.subTitle}>Impact</h3>
                <ul className={styles.impactList}>
                  {initiative.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.block}>
                <h3 className={styles.subTitle}>Photo Gallery</h3>
                <div className={styles.gallery}>
                  {initiative.gallery.map((src, i) => (
                    <div key={src} className={styles.galleryItem}>
                      <GalleryImage
                        src={src}
                        alt={`${initiative.title} photo ${i + 1}`}
                        className={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarSticky}>
              <div className={styles.eventsCard}>
                <h3 className={styles.sidebarTitle}>Upcoming Events</h3>
                <div className={styles.eventsList}>
                  {initiative.events.map((event) => (
                    <div key={event.title} className={styles.eventItem}>
                      <h4 className={styles.eventTitle}>{event.title}</h4>
                      <p className={styles.eventMeta}>
                        <CalendarIcon />
                        {event.date}
                      </p>
                      <p className={styles.eventMeta}>
                        <MapPinIcon />
                        {event.location}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href="/events" className={styles.viewAllBtn}>
                  VIEW ALL EVENTS
                </Link>
              </div>

              <div className={styles.ctaCard}>
                <UsersIcon />
                <h3 className={styles.ctaTitle}>Get Involved</h3>
                <p className={styles.ctaText}>
                  Join us in making cities more child-friendly
                </p>
                <Link href="/get-involved" className={styles.ctaBtn}>
                  VOLUNTEER OR DONATE
                </Link>
              </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
