import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
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
  },
  {
    title: "Volunteer",
    description:
      "Join our team of dedicated volunteers. Help organize events, lead workshops, or support our administrative work. Your time and skills are invaluable.",
    cta: "BECOME A VOLUNTEER",
    href: "/contact",
  },
  {
    title: "Partner With Us",
    description:
      "Organizations, municipalities, and businesses can partner with us to create lasting change. Let's work together to build child-friendly cities.",
    cta: "EXPLORE PARTNERSHIPS",
    href: "/contact",
  },
  {
    title: "Spread the Word",
    description:
      "Help us reach more families and communities by sharing our work. Follow us on social media and tell others about our mission.",
    cta: "SHARE OUR MISSION",
    href: "/news",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="Join us in building child-friendly cities. Every contribution makes a difference."
      />

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Ways to Help</h2>
          <p className="sectionSubtitle">
            There are many ways to support our mission of creating child-friendly
            cities
          </p>
          <div className={styles.grid}>
            {ways.map((way) => (
              <article key={way.title} className={styles.card}>
                <h3>{way.title}</h3>
                <p>{way.description}</p>
                <Button href={way.href} variant="primary">
                  {way.cta}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2>Have Questions?</h2>
          <p>
            We&apos;d love to hear from you. Reach out to learn more about how
            you can get involved.
          </p>
          <Button href="/contact" variant="secondary">
            CONTACT US
          </Button>
        </div>
      </section>
    </>
  );
}
