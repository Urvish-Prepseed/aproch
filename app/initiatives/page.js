import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { initiatives } from "@/lib/initiatives";
import styles from "./page.module.css";

export const metadata = {
  title: "Initiatives",
};

export default function InitiativesPage() {
  return (
    <>
      <PageHero
        title="Our Initiatives"
        subtitle="Five programs working together to create child-friendly cities"
      />

      <section className="section">
        <div className="container">
          <div className={styles.list}>
            {initiatives.map((item, index) => (
              <article
                key={item.slug}
                className={`${styles.item} ${index % 2 === 1 ? styles.reverse : ""}`}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={560}
                    height={380}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <div className={styles.content}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={56}
                    height={56}
                    className={styles.icon}
                  />
                  <h2>{item.title}</h2>
                  <p className={styles.tagline}>{item.tagline}</p>
                  <p className={styles.description}>{item.about}</p>
                  <Link href={`/initiatives/${item.slug}`} className={styles.link}>
                    Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
