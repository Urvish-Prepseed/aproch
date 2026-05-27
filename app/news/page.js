import Image from "next/image";
import Link from "next/link";
import { getPublicNewsList } from "@/lib/newsServer";
import styles from "./page.module.css";

export const metadata = {
  title: "News",
};

export const dynamic = "force-dynamic";

const EXCERPT_MAX_WORDS = 18;

function truncateExcerpt(text, maxWords = EXCERPT_MAX_WORDS) {
  if (!text) return "";
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

function CalendarIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default async function NewsPage() {
  const items = await getPublicNewsList();
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>News & Updates</h1>
          <p className={styles.heroSubtitle}>
            Stay informed about our latest programs, achievements, and impact
          </p>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.pageInner}>
          <div className={styles.list}>
            {items.length === 0 ? (
              <p style={{ fontFamily: "var(--font-sans)", color: "#5c6b7a" }}>
                No news yet.
              </p>
            ) : (
              items.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={800}
                    height={256}
                    className={styles.cardImage}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{article.tag}</span>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  {article.description ? (
                    <p className={styles.excerpt}>
                      {truncateExcerpt(article.description)}
                    </p>
                  ) : null}
                  <div className={styles.meta}>
                    <span className={styles.date}>
                      <CalendarIcon />
                      <time dateTime={article.dateTime || undefined}>
                        {article.dateLabel || ""}
                      </time>
                    </span>
                    <span className={styles.readMore}>
                      Read More
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
