"use client";

import { useMemo, useState } from "react";
import { eventTypeStyles, events } from "@/lib/data";
import styles from "./page.module.css";

const FILTERS = ["ALL", "FESTIVALS", "WORKSHOPS", "PROGRAMS"];
const VIEWS = ["MONTH", "AGENDA"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const APRIL_YEAR = 2026;
const APRIL_START_DAY = 3;
const APRIL_DAYS = 30;

function CalendarIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function matchesFilter(event, filter) {
  if (filter === "ALL") return true;
  if (filter === "FESTIVALS") return event.type === "festival";
  if (filter === "WORKSHOPS") return event.type === "workshop";
  if (filter === "PROGRAMS") return event.type === "program";
  return true;
}

function parseEventDate(event) {
  return new Date(event.year, event.month - 1, event.day);
}

export default function EventsCalendar() {
  const [view, setView] = useState("MONTH");
  const [filter, setFilter] = useState("ALL");

  const filteredEvents = useMemo(
    () => events.filter((e) => matchesFilter(e, filter)),
    [filter],
  );

  const aprilEvents = useMemo(
    () =>
      filteredEvents.filter((e) => e.month === 4 && e.year === APRIL_YEAR),
    [filteredEvents],
  );

  const agendaEvents = useMemo(
    () =>
      [...filteredEvents].sort(
        (a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime(),
      ),
    [filteredEvents],
  );

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.pageInner}>
          <h1 className={styles.heroTitle}>Events</h1>
          <p className={styles.heroSubtitle}>
            Join us at our programs, workshops, and festivals
          </p>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.pageInner}>
          <div className={styles.toolbar}>
            <h2 className={styles.monthTitle}>April 2026</h2>
            <div className={styles.viewToggle}>
              {VIEWS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={view === v ? styles.viewActive : ""}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filters}>
            {FILTERS.map((f) => (
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
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className={styles.days}>
                {Array.from({ length: APRIL_START_DAY }, (_, i) => (
                  <div key={`empty-${i}`} className={styles.emptyDay} />
                ))}
                {Array.from({ length: APRIL_DAYS }, (_, i) => {
                  const day = i + 1;
                  const event = aprilEvents.find((e) => e.day === day);
                  const typeStyle = event
                    ? eventTypeStyles[event.type]
                    : null;

                  return (
                    <div key={day} className={styles.day}>
                      <span className={styles.dayNum}>{day}</span>
                      {event && (
                        <span
                          className={styles.eventLabel}
                          style={{ background: typeStyle.label }}
                        >
                          {event.title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.agenda}>
              {agendaEvents.map((event) => {
                const typeStyle = eventTypeStyles[event.type];
                return (
                  <article key={event.id} className={styles.agendaCard}>
                    <span
                      className={styles.typeBadge}
                      style={{ background: typeStyle.bg }}
                    >
                      {event.type}
                    </span>
                    <h3 className={styles.agendaTitle}>{event.title}</h3>
                    <p className={styles.agendaDesc}>{event.description}</p>
                    <p className={styles.agendaMeta}>
                      <CalendarIcon />
                      {event.dateLabel}
                    </p>
                    <p className={styles.agendaMeta}>
                      <MapPinIcon />
                      {event.location}
                    </p>
                    <p className={styles.agendaInitiative}>{event.initiative}</p>
                  </article>
                );
              })}
            </div>
          )}

          <div className={styles.legend}>
            {(["festival", "workshop", "program", "training"]).map((type) => (
              <span key={type} className={styles.legendItem}>
                <i
                  className={styles.legendSwatch}
                  style={{ background: eventTypeStyles[type].bg }}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
