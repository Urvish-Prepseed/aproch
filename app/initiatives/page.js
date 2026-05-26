import Image from "next/image";
import Link from "next/link";
import { initiatives } from "@/lib/initiatives";
import styles from "./page.module.css";

export const metadata = {
  title: "Initiatives",
};

export default function InitiativesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Our Initiatives</h1>
          <p className={styles.heroSubtitle}>
            Five programs working together to create child-friendly cities
          </p>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className={styles.pageInner}>
          <div className={styles.list}>
            {initiatives.map((item, index) => (
              <article
                key={item.slug}
                className={`${styles.item} ${index % 2 === 1 ? styles.itemReverse : ""}`}
              >
                <div className={styles.content}>
                  <Image
                    src={item.icon}
                    alt=""
                    width={96}
                    height={96}
                    className={styles.icon}
                  />
                  <h2 className={styles.itemTitle}>{item.title}</h2>
                  <p className={styles.itemText}>{item.listingDescription}</p>
                  <Link
                    href={`/initiatives/${item.slug}`}
                    className={styles.learnMore}
                  >
                    Learn More
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className={styles.imageWrap}>
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={520}
                    height={384}
                    className={styles.photo}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
