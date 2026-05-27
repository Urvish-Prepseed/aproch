"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@/components/events/EventIcons";
import { getEventPastel } from "@/lib/eventStyles";
import {
  formatMonthTitle,
  getMonthGrid,
} from "@/lib/aprochEvents";
import styles from "./HomeEventsCarousel.module.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** Always 6 rows × 7 columns so calendar height never changes */
const CALENDAR_CELL_COUNT = 42;

function eventTimestamp(event) {
  if (!event.year || !event.month || !event.day) return 0;
  return new Date(event.year, event.month - 1, event.day).getTime();
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
    .sort((a, b) => eventTimestamp(a) - eventTimestamp(b))
    .find((e) => eventTimestamp(e) >= todayStart);

  if (upcoming) {
    return { year: upcoming.year, month: upcoming.month };
  }
  if (events.length > 0) {
    return { year: events[0].year, month: events[0].month };
  }
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

function shiftMonth(year, month, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export default function HomeEventsCarousel({ events }) {
  const viewportRef = useRef(null);
  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth() + 1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (events?.length) {
      const initial = pickInitialMonth(events);
      setDisplayYear(initial.year);
      setDisplayMonth(initial.month);
    }
  }, [events]);

  /** Carousel: all events, sorted by date */
  const carouselEvents = useMemo(
    () => [...(events || [])].sort((a, b) => eventTimestamp(a) - eventTimestamp(b)),
    [events]
  );

  /** Calendar: only events in the selected month */
  const monthEvents = useMemo(
    () =>
      (events || []).filter(
        (e) => e.month === displayMonth && e.year === displayYear
      ),
    [events, displayMonth, displayYear]
  );

  const { startDay, daysInMonth } = useMemo(
    () => getMonthGrid(displayYear, displayMonth),
    [displayYear, displayMonth]
  );

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startDay; i += 1) {
      cells.push({ type: "empty", key: `lead-${i}` });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ type: "day", day, key: `day-${day}` });
    }
    const trailing = CALENDAR_CELL_COUNT - cells.length;
    for (let i = 0; i < trailing; i += 1) {
      cells.push({ type: "empty", key: `trail-${i}` });
    }
    return cells;
  }, [startDay, daysInMonth]);

  const monthTitle = formatMonthTitle(displayYear, displayMonth);

  const scrollToIndex = useCallback(
    (index) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const clamped = Math.max(
        0,
        Math.min(index, carouselEvents.length - 1)
      );
      viewport.scrollTo({
        left: clamped * viewport.clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(clamped);
    },
    [carouselEvents.length]
  );

  const syncIndexFromScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || carouselEvents.length === 0) return;
    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setActiveIndex(
      Math.max(0, Math.min(index, carouselEvents.length - 1))
    );
  }, [carouselEvents.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.addEventListener("scroll", syncIndexFromScroll, {
      passive: true,
    });
    return () =>
      viewport.removeEventListener("scroll", syncIndexFromScroll);
  }, [syncIndexFromScroll]);

  if (!events?.length) {
    return null;
  }

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < carouselEvents.length - 1;

  function goPrevSlide(e) {
    e.preventDefault();
    e.stopPropagation();
    scrollToIndex(activeIndex - 1);
  }

  function goNextSlide(e) {
    e.preventDefault();
    e.stopPropagation();
    scrollToIndex(activeIndex + 1);
  }

  function goPrevMonth(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = shiftMonth(displayYear, displayMonth, -1);
    setDisplayYear(next.year);
    setDisplayMonth(next.month);
  }

  function goNextMonth(e) {
    e.preventDefault();
    e.stopPropagation();
    const next = shiftMonth(displayYear, displayMonth, 1);
    setDisplayYear(next.year);
    setDisplayMonth(next.month);
  }

  return (
    <section className={styles.section} aria-labelledby="home-events-title">
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 id="home-events-title" className="sectionTitle">
              Events
            </h2>
            <p className="sectionSubtitle">
              Upcoming programs, workshops, and festivals
            </p>
          </div>
          <Link href="/events" className={styles.viewAll}>
            View all events
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.layout}>
          <div className={styles.carouselCol}>
            <div className={styles.carousel}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={goPrevSlide}
                disabled={!canGoPrev}
                aria-label="Previous event"
              >
                <ChevronLeftIcon size={20} />
              </button>

              <div
                ref={viewportRef}
                className={styles.viewport}
                aria-roledescription="carousel"
                aria-label="Event highlights"
              >
                {carouselEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={styles.slide}
                  >
                    <article className={styles.agendaCard}>
                      <div
                        className={
                          event.image
                            ? styles.agendaGrid
                            : `${styles.agendaGrid} ${styles.agendaGridNoImage}`
                        }
                      >
                        {event.image ? (
                          <div className={styles.agendaImageWrap}>
                            <Image
                              src={event.image}
                              alt=""
                              width={560}
                              height={220}
                              className={styles.agendaImage}
                            />
                          </div>
                        ) : null}
                        <div className={styles.agendaBody}>
                          <span
                            className={styles.typeBadge}
                            style={{
                              background: getEventPastel(event.type),
                            }}
                          >
                            {event.typeLabel || event.type}
                          </span>
                          <h3 className={styles.agendaTitle}>{event.title}</h3>
                          {event.description && (
                            <p className={styles.agendaDesc}>
                              {event.description}
                            </p>
                          )}
                          <div className={styles.agendaMetaRow}>
                            {event.dateLabel && (
                              <span className={styles.agendaMetaItem}>
                                <CalendarIcon />
                                {event.dateLabel}
                              </span>
                            )}
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
                    </article>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className={`${styles.navBtn} ${styles.navBtnNext}`}
                onClick={goNextSlide}
                disabled={!canGoNext}
                aria-label="Next event"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>

          <aside className={styles.calendarCol} aria-label="Events calendar">
            <div className={styles.miniCalendar}>
              <div className={styles.monthNav}>
                <h3 className={styles.monthTitle}>{monthTitle}</h3>
                <button
                  type="button"
                  className={styles.monthNavBtn}
                  onClick={goPrevMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon size={14} />
                </button>
                <button
                  type="button"
                  className={styles.monthNavBtn}
                  onClick={goNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRightIcon size={14} />
                </button>
              </div>

              <div className={styles.weekdays}>
                {WEEKDAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className={styles.days}>
                {calendarCells.map((cell) => {
                  if (cell.type === "empty") {
                    return (
                      <div
                        key={cell.key}
                        className={styles.emptyDay}
                        aria-hidden="true"
                      />
                    );
                  }

                  const dayEvents = monthEvents.filter((e) => e.day === cell.day);

                  return (
                    <div key={cell.key} className={styles.day}>
                      <span className={styles.dayNum}>{cell.day}</span>
                      {dayEvents.length > 0 && (
                        <div className={styles.dayMarkers}>
                          <Link
                            href={`/events/${dayEvents[0].id}`}
                            className={styles.eventLabel}
                            style={{
                              background: getEventPastel(dayEvents[0].type),
                            }}
                            title={dayEvents[0].title}
                          >
                            {dayEvents[0].title}
                          </Link>
                          {dayEvents.length > 1 && (
                            <span className={styles.moreEvents}>
                              +{dayEvents.length - 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
