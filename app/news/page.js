import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { newsArticles } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "News",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Updates"
        subtitle="Stay informed about our latest programs, achievements, and impact"
      />

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {newsArticles.map((article) => (
              <article key={article.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={240}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{article.category}</span>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <div className={styles.meta}>
                    <time>{article.date}</time>
                    <Link href={`/news/${article.id}`}>Read More</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
