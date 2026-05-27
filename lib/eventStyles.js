/** Pastel tokens from Figma — https://jolt-edit-44752845.figma.site/events */
export const eventPastels = {
  festival: "#fff9e6",
  workshop: "#e6f7f0",
  program: "#ffe8ed",
  training: "#f3eff9",
};

export const eventPrimary = "#030213";

export function getEventPastel(type) {
  return eventPastels[type] || eventPastels.program;
}
