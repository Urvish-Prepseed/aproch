import { initiatives } from "@/lib/initiatives";

/** Map API event type to calendar UI type key */
export function apiTypeToUiType(type) {
  const map = {
    Festival: "festival",
    Workshop: "workshop",
    Program: "program",
    Training: "training",
  };
  return map[type] || String(type || "").toLowerCase();
}

export function getInitiativeSlug(initiativeName) {
  if (!initiativeName) return null;
  const found = initiatives.find(
    (i) => i.title.toLowerCase() === initiativeName.trim().toLowerCase()
  );
  return found?.slug ?? null;
}

export function formatEventTypeLabel(uiType) {
  if (!uiType) return "";
  return uiType.charAt(0).toUpperCase() + uiType.slice(1);
}

function parseEventDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDateLabel(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Normalize Mongo record for EventsCalendar UI */
export function mapApiEventToCalendarEvent(record) {
  const date = parseEventDate(record.eventDate);
  const uiType = apiTypeToUiType(record.type);
  return {
    id: String(record._id),
    title: record.title || "",
    description: record.description || "",
    dateLabel: date ? formatDateLabel(date) : "",
    day: date ? date.getDate() : 0,
    month: date ? date.getMonth() + 1 : 0,
    year: date ? date.getFullYear() : 0,
    location: record.location || "",
    initiative: record.initiative || "",
    initiativeSlug: getInitiativeSlug(record.initiative),
    type: uiType,
    typeLabel: formatEventTypeLabel(uiType),
    apiType: record.type || "",
    startTime: record.startTime || "",
    endTime: record.endTime || "",
    image: record.image || "",
    aboutThisEvent: record.aboutThisEvent || "",
    activities: Array.isArray(record.activities) ? record.activities : [],
    eventDetails: record.eventDetails || null,
  };
}

/** Full record for event detail page */
export function mapApiEventToDetail(record) {
  return mapApiEventToCalendarEvent(record);
}

export async function fetchPublicEvents() {
  const res = await fetch("/api/events", { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to load events (${res.status})`);
  }

  const json = await res.json();
  if (!json?.success || !Array.isArray(json.data)) {
    throw new Error(json?.error || "Failed to load events");
  }

  return json.data.map(mapApiEventToCalendarEvent);
}

export function getMonthGrid(year, month) {
  const startDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  return { startDay, daysInMonth };
}

export function formatMonthTitle(year, month) {
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
