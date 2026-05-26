import Image from "next/image";
import { images } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
};

const values = [
  {
    title: "Child-Centered",
    text: "Every decision we make puts children's needs, safety, and agency at the forefront. We believe children are not just future citizens, but active participants in shaping their communities today.",
    icon: "heart",
    accent: "#f27a21",
  },
  {
    title: "Community-Driven",
    text: "We work hand-in-hand with families, neighborhoods, and local organizations to create lasting change. Our programs are designed with and for the communities they serve.",
    icon: "users",
    accent: "#f4a623",
  },
  {
    title: "Impact-Focused",
    text: "We measure our success by the tangible improvements we create in children's lives and urban spaces. Every program is designed to create measurable, lasting positive change.",
    icon: "target",
    accent: "#e74c3c",
  },
];

function ValueIcon({ name }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "heart") {
    return (
      <svg {...props}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }

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

  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>About APROCH</h1>
          <p className={styles.heroSubtitle}>A Protagonist in Every Child</p>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.pageInner}>
          <h2 className={styles.sectionHeading}>Our Mission</h2>
          <p className={styles.missionText}>
            APROCH (A Protagonist in Every Child) is dedicated to transforming
            cities into child-friendly environments where every child can thrive
            as an active participant in shaping their urban landscape. Through
            our five flagship initiatives, we empower children to explore,
            learn, and reimagine their cities.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.pageInner}>
          <h2 className={styles.sectionHeading}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <article key={value.title} className={styles.valueCard}>
                <div
                  className={styles.valueIcon}
                  style={{ backgroundColor: value.accent }}
                >
                  <ValueIcon name={value.icon} />
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.pageInner}>
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <h2 className={styles.sectionHeading}>Our Story</h2>
              <p className={styles.storyText}>
                Founded with the belief that every child deserves to be the
                protagonist of their own story, APROCH began as a grassroots
                movement to reclaim urban spaces for children.
              </p>
              <p className={styles.storyTextLast}>
                Today, we operate across 15 cities, partnering with
                municipalities, schools, and community organizations to create
                child-friendly environments where exploration, play, and
                learning are central to urban life.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src={images.aboutTeam}
                alt="APROCH team and community"
                width={512}
                height={384}
                className={styles.storyImg}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
