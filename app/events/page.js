"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { calendarEvents } from "@/lib/data";
import styles from "./page.module.css";

const filters = ["ALL", "FESTIVALS", "WORKSHOPS", "PROGRAMS"];

const typeColors = {
  festival: "#f27a21",
  workshop: "#2f4858",
  program: "#ff9b9b",
};

export default function EventsPage() {
  const [view, setView] = useState("MONTH");
  const [filter, setFilter] = useState("ALL");

  const daysInMonth = 30;
  const startDay = 2;

  return (
    <>
      <PageHero
        title="Events"
        subtitle="Join us at our programs, workshops, and festivals"
      />

      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <h2>April 2026</h2>
            <div className={styles.viewToggle}>
              {["MONTH", "AGENDA"].map((v) => (
                <button
                  key={v}
                  type="button"
                  className={view === v ? styles.active : ""}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filters}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={filter === f ? styles.filterActive : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {view === "MONTH" ? (
            <div className={styles.calendar}>
              <div className={styles.weekdays}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className={styles.days}>
                {Array.from({ length: startDay }, (_, i) => (
                  <div key={`empty-${i}`} className={styles.emptyDay} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const event = calendarEvents.find((e) => e.day === day);
                  return (
                    <div
                      key={day}
                      className={`${styles.day} ${event ? styles.hasEvent : ""}`}
                    >
                      <span className={styles.dayNum}>{day}</span>
                      {event && (
                        <span
                          className={styles.eventDot}
                          style={{ background: typeColors[event.type] }}
                          title={event.title}
                        />
                      )}
                      {event && (
                        <span className={styles.eventLabel}>{event.title}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <ul className={styles.agenda}>
              {calendarEvents.map((event) => (
                <li key={event.title}>
                  <span
                    className={styles.agendaType}
                    style={{ background: typeColors[event.type] }}
                  />
                  <div>
                    <strong>April {event.day}, 2026</strong>
                    <p>{event.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.legend}>
            <span><i style={{ background: typeColors.festival }} /> Festival</span>
            <span><i style={{ background: typeColors.workshop }} /> Workshop</span>
            <span><i style={{ background: typeColors.program }} /> Program</span>
          </div>
        </div>
      </section>
    </>
  );
}
