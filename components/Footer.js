import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
];

const getInvolved = [
  { href: "/get-involved", label: "Volunteer" },
  { href: "/get-involved", label: "Donate" },
  { href: "/get-involved", label: "Partner" },
];

const connect = [
  { href: "/contact", label: "Contact" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Image
            src="/images/aproch-logo.png"
            alt="APROCH"
            width={120}
            height={40}
          />
          <p>A Protagonist in Every Child</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Get Involved</h4>
          <ul>
            {getInvolved.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Connect</h4>
          <ul>
            {connect.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© 2026 APROCH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
