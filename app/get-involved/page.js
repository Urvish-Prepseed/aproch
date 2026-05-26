import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Get Involved",
};

const ways = [
  {
    title: "Donate",
    description:
      "Your financial support helps us create more programs, reach more children, and transform more cities. Every donation, no matter the size, makes a real impact.",
    cta: "MAKE A DONATION",
    href: "/get-involved",
    icon: "heart",
    accent: "#f27a21",
  },
  {
    title: "Volunteer",
    description:
      "Join our team of dedicated volunteers. Help organize events, lead workshops, or support our administrative work. Your time and skills are invaluable.",
    cta: "BECOME A VOLUNTEER",
    href: "/contact",
    icon: "users",
    accent: "#f4a623",
  },
  {
    title: "Partner With Us",
    description:
      "Organizations, municipalities, and businesses can partner with us to create lasting change. Let's work together to build child-friendly cities.",
    cta: "EXPLORE PARTNERSHIPS",
    href: "/contact",
    icon: "building",
    accent: "#e74c3c",
  },
  {
    title: "Spread the Word",
    description:
      "Help us reach more families and communities by sharing our work. Follow us on social media and tell others about our mission.",
    cta: "SHARE OUR MISSION",
    href: "/news",
    icon: "handHeart",
    accent: "#f27a21",
  },
];

function WayIcon({ name }) {
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

  if (name === "building") {
    return (
      <svg {...props}>
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c.6 0 1.1.2 1.4.6L17 20" />
      <path d="M12 12V3" />
      <path d="m8 6 4-4 4 4" />
    </svg>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Get Involved</h1>
          <p className={styles.heroSubtitle}>
            Join us in building child-friendly cities. Every contribution makes
            a difference.
          </p>
        </div>
      </section>

      <section className={styles.waysSection}>
        <div className={styles.pageInner}>
          <h2 className={styles.waysTitle}>Ways to Help</h2>
          <p className={styles.waysSubtitle}>
            There are many ways to support our mission of creating child-friendly
            cities
          </p>
          <div className={styles.grid}>
            {ways.map((way) => (
              <article key={way.title} className={styles.card}>
                <div
                  className={styles.cardIcon}
                  style={{ backgroundColor: way.accent }}
                >
                  <WayIcon name={way.icon} />
                </div>
                <h3 className={styles.cardTitle}>{way.title}</h3>
                <p className={styles.cardText}>{way.description}</p>
                <Link
                  href={way.href}
                  className={styles.cardBtn}
                  style={{ backgroundColor: way.accent }}
                >
                  {way.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.questionsSection}>
        <div className={styles.pageInner}>
          <div className={styles.questionsInner}>
            <h2 className={styles.questionsTitle}>Have Questions?</h2>
            <p className={styles.questionsText}>
              We&apos;d love to hear from you. Reach out to learn more about how
              you can get involved.
            </p>
            <Link href="/contact" className={styles.contactBtn}>
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
