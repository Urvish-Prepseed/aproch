import Image from "next/image";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
};

const values = [
  {
    title: "Child-Centered",
    text: "Every decision we make puts children's needs, safety, and agency at the forefront. We believe children are not just future citizens, but active participants in shaping their communities today.",
  },
  {
    title: "Community-Driven",
    text: "We work hand-in-hand with families, neighborhoods, and local organizations to create lasting change. Our programs are designed with and for the communities they serve.",
  },
  {
    title: "Impact-Focused",
    text: "We measure our success by the tangible improvements we create in children's lives and urban spaces. Every program is designed to create measurable, lasting positive change.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About APROCH"
        subtitle="A Protagonist in Every Child"
      />

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Our Mission</h2>
          <p className={styles.missionText}>
            APROCH (A Protagonist in Every Child) is dedicated to transforming
            cities into child-friendly environments where every child can thrive
            as an active participant in shaping their urban landscape. Through
            our five flagship initiatives, we empower children to explore, learn,
            and reimagine their cities.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className="sectionTitle">Our Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <article key={value.title} className={styles.valueCard}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.storyLayout}`}>
          <div>
            <h2 className="sectionTitle">Our Story</h2>
            <p className={styles.storyText}>
              Founded with the belief that every child deserves to be the
              protagonist of their own story, APROCH began as a grassroots
              movement to reclaim urban spaces for children.
            </p>
            <p className={styles.storyText}>
              Today, we operate across 15 cities, partnering with municipalities,
              schools, and community organizations to create child-friendly
              environments where exploration, play, and learning are central to
              urban life.
            </p>
          </div>
          <div className={styles.storyImage}>
            <Image
              src={images.aboutTeam}
              alt="APROCH Team"
              width={600}
              height={400}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
