function parseDate(value) {
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

export function mapApiNewsToListItem(record) {
  const createdAt = parseDate(record.createdAt);
  return {
    id: String(record._id),
    tag: record.tag || "",
    title: record.title || "",
    description: record.description || "",
    image: record.image || "",
    dateLabel: createdAt ? formatDateLabel(createdAt) : "",
    dateTime: createdAt ? createdAt.toISOString() : "",
  };
}

export function mapApiNewsToDetail(record) {
  return mapApiNewsToListItem(record);
}

