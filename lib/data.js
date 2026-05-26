export const stats = [
  {
    value: "50,000+",
    label: "Children Reached",
    icon: "users",
    accent: "#f27a21",
  },
  {
    value: "200+",
    label: "Programs & Events",
    icon: "calendar",
    accent: "#f4a623",
  },
  {
    value: "15",
    label: "Cities Transformed",
    icon: "mapPin",
    accent: "#e74c3c",
  },
  {
    value: "30+",
    label: "Parent Groups",
    icon: "heart",
    accent: "#f27a21",
  },
];

export const impactStories = [
  {
    title: "Community-Driven Park Transformations",
    description:
      "Through Parents of the Park, local communities have successfully advocated for and implemented park improvements across 18 neighborhoods, creating safer and more inclusive spaces for children to play.",
    stat: "18 Parks Renovated",
    icon: "mapPin",
  },
  {
    title: "Building Cycling Infrastructure",
    description:
      "City On Cycles has trained over 3,200 children in cycling safety while successfully advocating for 15 kilometers of new bike lanes, making cities safer for young cyclists.",
    stat: "3,200 Children Trained",
    icon: "users",
  },
  {
    title: "Urban Navigation Skills",
    description:
      "Street Smart has empowered 6,500 children with the skills to safely navigate their cities. 85% of participants report increased confidence in using public transportation and exploring their neighborhoods independently.",
    stat: "6,500 Graduates",
    icon: "calendar",
  },
  {
    title: "Public Space Activations",
    description:
      "Moving Experiences has brought joy and creativity to public spaces through over 100 pop-up programs, engaging 25,000+ participants and partnering with 40+ local artists to make cities more vibrant for children.",
    stat: "25,000+ Participants",
    icon: "heart",
  },
];

export const newsArticles = [
  {
    id: "1",
    category: "Advocacy Win",
    title: "15 New Bike Lanes Approved Following City On Cycles Campaign",
    excerpt:
      "After months of advocacy, the city council has approved 15 kilometers of new protected bike lanes in child-friendly corridors.",
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1769218466585-99a5c2d8b9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "2",
    category: "Success Story",
    title: "Parents of the Park Celebrates 18th Community-Led Renovation",
    excerpt:
      "Meadow Park transformation showcases the power of parent-led advocacy and community organizing.",
    date: "March 10, 2026",
    image:
      "https://images.unsplash.com/photo-1774579892465-8bd21e18adaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "3",
    category: "Program Expansion",
    title: "Street Smart Curriculum Adopted by 20 Schools",
    excerpt:
      "Our urban navigation and safety program is now reaching children as part of regular school curriculum.",
    date: "February 28, 2026",
    image:
      "https://images.unsplash.com/photo-1657895982235-1ddb08b91dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export const eventTypeStyles = {
  festival: { bg: "#fff9e6", label: "#fff9e6" },
  workshop: { bg: "#e6f7f0", label: "#e6f7f0" },
  program: { bg: "#ffe8ed", label: "#ffe8ed" },
  training: { bg: "#f3eff9", label: "#f3eff9" },
};

export const events = [
  {
    id: "spring-street-festival",
    title: "Spring Street Festival",
    description:
      "A day of interactive art, play, and community celebration",
    dateLabel: "April 20, 2026",
    day: 20,
    month: 4,
    year: 2026,
    location: "Central Park",
    initiative: "Moving Experiences",
    type: "festival",
  },
  {
    id: "community-cycling-workshop",
    title: "Community Cycling Workshop",
    description: "Learn cycling safety and bike maintenance skills",
    dateLabel: "April 25, 2026",
    day: 25,
    month: 4,
    year: 2026,
    location: "Green Lane",
    initiative: "City On Cycles",
    type: "workshop",
  },
  {
    id: "park-planning-workshop",
    title: "Park Planning Workshop",
    description: "Community input session for park improvements",
    dateLabel: "April 28, 2026",
    day: 28,
    month: 4,
    year: 2026,
    location: "Meadow Park",
    initiative: "Parents of the Park",
    type: "workshop",
  },
  {
    id: "urban-play-day",
    title: "Urban Play Day",
    description: "Pop-up play installations across the city square",
    dateLabel: "May 5, 2026",
    day: 5,
    month: 5,
    year: 2026,
    location: "City Square",
    initiative: "Moving Experiences",
    type: "program",
  },
  {
    id: "transit-skills-workshop",
    title: "Transit Skills Workshop",
    description: "Teaching children how to navigate public transportation",
    dateLabel: "May 8, 2026",
    day: 8,
    month: 5,
    year: 2026,
    location: "Transit Center",
    initiative: "Street Smart",
    type: "training",
  },
  {
    id: "family-bike-ride",
    title: "Family Bike Ride",
    description: "A family-friendly cycling event along the river",
    dateLabel: "May 12, 2026",
    day: 12,
    month: 5,
    year: 2026,
    location: "Riverside Park",
    initiative: "City On Cycles",
    type: "program",
  },
];

/** @deprecated Use `events` — April 2026 month-view entries only */
export const calendarEvents = events.filter((e) => e.month === 4);

export const resources = [
  {
    title: "Program Guides",
    description:
      "Comprehensive guides for implementing our programs in your community",
    icon: "file-text",
    accent: "#f27a21",
  },
  {
    title: "Research & Reports",
    description:
      "Studies and findings on child-friendly urban development",
    icon: "book-open",
    accent: "#f4a623",
  },
  {
    title: "Toolkits",
    description: "Ready-to-use materials for workshops and activities",
    icon: "link",
    accent: "#e74c3c",
  },
  {
    title: "Annual Reports",
    description:
      "Our yearly impact reports and financial transparency documents",
    icon: "file-text",
    accent: "#f27a21",
  },
];

export const images = {
  hero:
    "https://images.unsplash.com/photo-1774579892465-8bd21e18adaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
  aboutTeam:
    "https://images.unsplash.com/photo-1774579892465-8bd21e18adaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  story:
    "https://images.unsplash.com/photo-1595755028742-59d7dc61a007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
};
