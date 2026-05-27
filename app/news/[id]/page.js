import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CalendarIcon } from "@/components/events/EventIcons";
import { getPublicNewsById } from "@/lib/newsServer";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getPublicNewsById(id);
  if (!article) return { title: "News" };
  return { title: article.title || "News" };
}

export default async function NewsArticlePage({ params }) {
  const { id } = await params;
  const article = await getPublicNewsById(id);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.topBar}>
          <Link href="/news" className={styles.back}>
            <ArrowLeftIcon size={18} />
            Back to News
          </Link>
          {article.tag ? (
            <span className={styles.tag}>{article.tag}</span>
          ) : null}
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          {article.dateLabel ? (
            <p className={styles.dateRow}>
              <CalendarIcon size={18} />
              <time dateTime={article.dateTime || undefined}>
                {article.dateLabel}
              </time>
            </p>
          ) : null}
        </header>

        <div
          className={styles.contentGrid}
          style={
            article.image ? undefined : { gridTemplateColumns: "1fr" }
          }
        >
          {article.image ? (
            <div className={styles.imageCol}>
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                priority
                className={styles.heroImg}
              />
            </div>
          ) : null}

          {article.description ? (
            <div className={styles.bodyCol}>
              <p className={styles.bodyText}>{article.description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
