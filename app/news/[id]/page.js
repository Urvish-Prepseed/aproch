import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsArticles } from "@/lib/data";
import styles from "./page.module.css";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === id);
  if (!article) return { title: "News" };
  return { title: article.title };
}

export default async function NewsArticlePage({ params }) {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <div className="container">
        <Link href="/news" className={styles.back}>
          ← Back to News
        </Link>
        <span className={styles.category}>{article.category}</span>
        <h1>{article.title}</h1>
        <time className={styles.date}>{article.date}</time>
        <div className={styles.heroImage}>
          <Image
            src={article.image}
            alt={article.title}
            width={900}
            height={500}
            style={{ objectFit: "cover", width: "100%", borderRadius: "8px" }}
          />
        </div>
        <div className={styles.body}>
          <p>{article.excerpt}</p>
          <p>
            This story highlights the ongoing work of APROCH and our community
            partners. Together, we continue building cities where every child
            can thrive as an active protagonist in their urban environment.
          </p>
        </div>
      </div>
    </article>
  );
}
