export const navItems = [
  {
    label: "About",
    href: "/about",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/impact", label: "Our Impact" },
    ],
  },
  {
    label: "Initiatives",
    href: "/initiatives",
    children: [
      { href: "/initiatives/city-as-my-landscape", label: "City As My Landscape" },
      { href: "/initiatives/city-on-cycles", label: "City On Cycles" },
      { href: "/initiatives/moving-experiences", label: "Moving Experiences" },
      { href: "/initiatives/parents-of-the-park", label: "Parents of the Park" },
      { href: "/initiatives/street-smart", label: "Street Smart" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  {
    label: "Learn More",
    children: [
      { href: "/resources", label: "Resources" },
      { href: "/news", label: "News" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function isNavActive(pathname, item) {
  if (item.href) {
    const onParent =
      pathname === item.href || pathname.startsWith(item.href + "/");
    if (onParent) return true;
  }
  if (item.children) {
    return item.children.some(
      (child) =>
        pathname === child.href || pathname.startsWith(child.href + "/"),
    );
  }
  return false;
}
