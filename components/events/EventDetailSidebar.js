"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/events/[id]/page.module.css";

/**
 * Keeps Event Details + Register cards sticky until the initiative block
 * scrolls up to the sidebar (matches Figma behavior).
 */
export default function EventDetailSidebar({ stopId, children }) {
  const stickyRef = useRef(null);
  const [isPinned, setIsPinned] = useState(true);

  useEffect(() => {
    const stopEl = document.getElementById(stopId);
    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    function updatePin() {
      if (!stopEl) {
        setIsPinned(true);
        return;
      }
      const headerOffset =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height"
          ),
          10
        ) || 72;
      const stickyBottom =
        headerOffset + 24 + stickyEl.getBoundingClientRect().height;
      const stopTop = stopEl.getBoundingClientRect().top;
      setIsPinned(stopTop > stickyBottom);
    }

    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin);

    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, [stopId]);

  return (
    <div
      ref={stickyRef}
      className={isPinned ? styles.sidebarPinned : styles.sidebarReleased}
    >
      {children}
    </div>
  );
}
