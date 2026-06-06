export type NavItem = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  title: string;
  links: NavItem[];
};

export const heroNav: NavItem[] = [
  { label: "Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Shop", href: "/shop/" },
];

export const mainNav: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "FAQ", href: "/faq/" },
];

export const siteNav: NavItem[] = [...heroNav, ...mainNav];

export const craftNav: NavItem[] = [
  { label: "Crochet", href: "/crochet/" },
  { label: "Laser", href: "/laser/" },
  { label: "3D Printing", href: "/3d-printing/" },
  { label: "Patterns", href: "/patterns/" },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Explore",
    links: [{ label: "Home", href: "/" }, ...siteNav],
  },
  {
    title: "Craft Paths",
    links: craftNav,
  },
  {
    title: "Helpful",
    links: [
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
];
