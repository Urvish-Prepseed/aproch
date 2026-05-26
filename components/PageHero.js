import styles from "./PageHero.module.css";

export default function PageHero({ title, subtitle, dark = true }) {
  return (
    <section className={`${styles.hero} ${dark ? styles.dark : styles.light}`}>
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
