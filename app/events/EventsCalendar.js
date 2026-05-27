"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListIcon,
  MapPinIcon,
} from "@/components/events/EventIcons";
import { getEventPastel } from "@/lib/eventStyles";
import {
  fetchPublicEvents,
  formatMonthTitle,
  getMonthGrid,
} from "@/lib/aprochEvents";
import styles from "./page.module.css";

const FILTERS = ["ALL", "FESTIVALS", "WORKSHOPS", "PROGRAMS"];
const VIEWS = ["MONTH", "AGENDA"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function pickInitialMonth(events) {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const upcoming = [...events]
    .filter((e) => e.year && e.month && e.day)
    .sort((a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime())
    .find((e) => parseEventDate(e).getTime() >= todayStart);

  if (upcoming) {
    return { year: upcoming.year, month: upcoming.month };
  }
  if (events.length > 0) {
    const first = events[0];
    return { year: first.year, month: first.month };
  }
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

function shiftMonth(year, month, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export default function EventsCalendar() {
  const [view, setView] = useState("MONTH");
  const [filter, setFilter] = useState("ALL");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayYear, setDisplayYear] = useState(() => new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(() => new Date().getMonth() + 1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublicEvents();
        if (cancelled) return;
        setEvents(data);
        const initial = pickInitialMonth(data);
        setDisplayYear(initial.year);
        setDisplayMonth(initial.month);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load events");
          setEvents([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEvents = useMemo(
    () => events.filter((e) => matchesFilter(e, filter)),
    [events, filter]
  );

  const monthEvents = useMemo(
    () =>
      filteredEvents.filter(
        (e) => e.month === displayMonth && e.year === displayYear
      ),
    [filteredEvents, displayMonth, displayYear]
  );

  const agendaEvents = useMemo(
    () =>
      [...filteredEvents].sort(
        (a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime()
      ),
    [filteredEvents]
  );

  const { startDay, daysInMonth } = useMemo(
    () => getMonthGrid(displayYear, displayMonth),
    [displayYear, displayMonth]
  );

  const monthTitle = formatMonthTitle(displayYear, displayMonth);

  function goPrevMonth() {
    const next = shiftMonth(displayYear, displayMonth, -1);
    setDisplayYear(next.year);
    setDisplayMonth(next.month);
  }

  function goNextMonth() {
    const next = shiftMonth(displayYear, displayMonth, 1);
    setDisplayYear(next.year);
    setDisplayMonth(next.month);
  }

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
            <div className={styles.monthNav}>
              <h2 className={styles.monthTitle}>{monthTitle}</h2>
              <button
                type="button"
                className={styles.monthNavBtn}
                onClick={goPrevMonth}
                aria-label="Previous month"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className={styles.monthNavBtn}
                onClick={goNextMonth}
                aria-label="Next month"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className={styles.toolbarRight}>
              <div className={styles.viewToggle}>
                <button
                  type="button"
                  className={view === "MONTH" ? styles.viewActive : ""}
                  onClick={() => setView("MONTH")}
                >
                  <CalendarIcon size={16} />
                  MONTH
                </button>
                <button
                  type="button"
                  className={view === "AGENDA" ? styles.viewActive : ""}
                  onClick={() => setView("AGENDA")}
                >
                  <ListIcon size={16} />
                  AGENDA
                </button>
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
            </div>
          </div>

          {loading ? (
            <p className={styles.statusMessage}>Loading events…</p>
          ) : error ? (
            <p className={styles.statusMessage}>{error}</p>
          ) : view === "MONTH" ? (
            <>
              <div className={styles.weekdays}>
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className={styles.days}>
                {Array.from({ length: startDay }, (_, i) => (
                  <div key={`empty-${i}`} className={styles.emptyDay} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const dayEvents = monthEvents.filter((e) => e.day === day);

                  return (
                    <div key={day} className={styles.day}>
                      <span className={styles.dayNum}>{day}</span>
                      {dayEvents.length > 0 && (
                        <div className={styles.dayEvents}>
                          {dayEvents.map((event) => (
                            <Link
                              key={event.id}
                              href={`/events/${event.id}`}
                              className={styles.eventLabel}
                              style={{
                                background: getEventPastel(event.type),
                              }}
                            >
                              {event.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : agendaEvents.length === 0 ? (
            <p className={styles.statusMessage}>No events to show.</p>
          ) : (
            <div className={styles.agenda}>
              {agendaEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className={styles.agendaCard}
                >
                  <div
                    className={styles.agendaGrid}
                    style={
                      event.image
                        ? undefined
                        : { gridTemplateColumns: "1fr" }
                    }
                  >
                    {event.image ? (
                      <div className={styles.agendaImageWrap}>
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={192}
                          className={styles.agendaImage}
                        />
                      </div>
                    ) : null}
                    <div className={styles.agendaBody}>
                      <div className={styles.agendaTop}>
                        <div>
                          <span
                            className={styles.typeBadge}
                            style={{
                              background: getEventPastel(event.type),
                            }}
                          >
                            {event.type}
                          </span>
                          <h3 className={styles.agendaTitle}>{event.title}</h3>
                        </div>
                      </div>
                      <p className={styles.agendaDesc}>{event.description}</p>
                      <div className={styles.agendaMetaRow}>
                        <span className={styles.agendaMetaItem}>
                          <CalendarIcon />
                          {event.dateLabel}
                        </span>
                        {event.location && (
                          <span className={styles.agendaMetaItem}>
                            <MapPinIcon />
                            {event.location}
                          </span>
                        )}
                        {event.initiative && (
                          <span className={styles.agendaInitiative}>
                            {event.initiative}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.legend}>
            {(["festival", "workshop", "program", "training"]).map((type) => (
              <span key={type} className={styles.legendItem}>
                <i
                  className={styles.legendSwatch}
                  style={{ background: getEventPastel(type) }}
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
