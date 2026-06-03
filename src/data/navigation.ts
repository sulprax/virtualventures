export type NavItem = {
  label: string;
  href: string;
};

export type FooterNavGroup = {
  title: string;
  links: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "FAQ", href: "/faq/" },
];

export const heroNav: NavItem[] = [
  { label: "Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Shop", href: "/shop/" },
];

export const craftNav: NavItem[] = [
  { label: "Crochet", href: "/crochet/" },
  { label: "Laser", href: "/laser/" },
  { label: "3D Printing", href: "/3d-printing/" },
  { label: "Patterns", href: "/patterns/" },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      ...heroNav,
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Craft Paths",
    links: craftNav,
  },
  {
    title: "Helpful",
    links: [
      { label: "About", href: "/about/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
    ],
  },
];
