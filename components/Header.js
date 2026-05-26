"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, isNavActive } from "@/lib/nav";
import styles from "./Header.module.css";

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDropdown(label) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/aproch-logo.png"
            alt="APROCH — Making our cities Child Friendly"
            width={190}
            height={44}
            className={styles.logoImg}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          ref={navRef}
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const active = isNavActive(pathname, item);

              if (item.children) {
                const isOpen = openDropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""} ${active ? styles.activeParent : ""}`}
                    onMouseEnter={() => {
                      if (window.innerWidth > 900) setOpenDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 900) setOpenDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      className={`${styles.navTrigger} ${active ? styles.active : ""}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      {item.label}
                      <Chevron />
                    </button>
                    <ul className={styles.dropdownMenu}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={
                              pathname === child.href ||
                              pathname.startsWith(child.href + "/")
                                ? styles.dropdownActive
                                : ""
                            }
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.active : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/get-involved"
            className={styles.donateBtn}
            onClick={() => setMenuOpen(false)}
          >
            DONATE
          </Link>
        </nav>
      </div>
    </header>
  );
}
