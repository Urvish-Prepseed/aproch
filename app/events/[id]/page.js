import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "@/components/events/EventIcons";
import { getEventPastel } from "@/lib/eventStyles";
import { getPublicEventById } from "@/lib/eventsServer";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getPublicEventById(id);
  if (!event) return { title: "Event" };
  return { title: event.title };
}

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = await getPublicEventById(id);

  if (!event) {
    notFound();
  }

  const pastel = getEventPastel(event.type);
  const timeLabel =
    event.startTime && event.endTime
      ? `${event.startTime} - ${event.endTime}`
      : event.startTime || "";
  const details = event.eventDetails || {};
  const initiativeHref = event.initiativeSlug
    ? `/initiatives/${event.initiativeSlug}`
    : "/initiatives";

  return (
    <article className={styles.page}>
      <div className={styles.pageInner}>
        <Link href="/events" className={styles.back}>
          <ArrowLeftIcon size={18} />
          Back to Events
        </Link>

        <header className={styles.header}>
          <span
            className={styles.typeBadge}
            style={{ background: pastel }}
          >
            {event.type}
          </span>
          <h1 className={styles.title}>{event.title}</h1>
          {event.description && (
            <p className={styles.subtitle}>{event.description}</p>
          )}
          <div className={styles.metaRow}>
            {event.dateLabel && (
              <p className={styles.meta}>
                <CalendarIcon size={18} />
                {event.dateLabel}
              </p>
            )}
            {timeLabel && (
              <p className={styles.meta}>
                <ClockIcon size={18} />
                {timeLabel}
              </p>
            )}
            {event.location && (
              <p className={styles.meta}>
                <MapPinIcon size={18} />
                {event.location}
              </p>
            )}
          </div>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.mainCol}>
            {event.image && (
              <div className={styles.heroImage}>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={1200}
                  height={384}
                  priority
                  className={styles.heroImg}
                />
              </div>
            )}

            {event.aboutThisEvent && (
              <div className={styles.block}>
                <h2 className={styles.sectionTitle}>About This Event</h2>
                <p className={styles.bodyText}>{event.aboutThisEvent}</p>
              </div>
            )}

            {event.activities?.length > 0 && (
              <div className={styles.block}>
                <h3 className={styles.subTitle}>Activities</h3>
                <div className={styles.activityList}>
                  {event.activities.map((item) => (
                    <div key={item} className={styles.activityRow}>
                      <span className={styles.activityBullet} aria-hidden="true" />
                      <p className={styles.activityItem}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.detailsCard}>
                <h3 className={styles.sidebarTitle}>Event Details</h3>
                <div className={styles.detailsList}>
                  {details.ageGroup && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Age Group</span>
                      <div className={styles.detailValue}>
                        <UsersIcon />
                        <span>{details.ageGroup}</span>
                      </div>
                    </div>
                  )}
                  {details.cost && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Cost</span>
                      <div className={styles.detailValue}>
                        <span>{details.cost}</span>
                      </div>
                    </div>
                  )}
                  {details.Registration && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Registration</span>
                      <div className={styles.detailValue}>
                        <span>{details.Registration}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={styles.registerCard}
                style={{ background: pastel }}
              >
                <h3 className={styles.sidebarTitle}>Register Now</h3>
                <p className={styles.registerText}>
                  Spaces are limited. Register to secure your spot.
                </p>
                <Link href="/contact" className={styles.registerBtn}>
                  REGISTER
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.bottomRow}>
          {event.initiative ? (
            <section className={styles.initiativeBlock}>
              <h3 className={styles.subTitle}>Part of {event.initiative}</h3>
              <p className={styles.bodyText}>
                This event is part of our {event.initiative} initiative, working
                to create child-friendly cities.
              </p>
              <Link href={initiativeHref} className={styles.outlineBtn}>
                LEARN MORE ABOUT OUR INITIATIVES
              </Link>
            </section>
          ) : (
            <div aria-hidden />
          )}

          <div className={styles.questionsCard}>
            <h3 className={styles.questionsTitle}>Questions?</h3>
            <p className={styles.questionsText}>
              Get in touch with our team for more information
            </p>
            <Link href="/contact" className={styles.contactBtn}>
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
