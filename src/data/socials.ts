export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/virtualventureslab/", icon: "◎" },
  { label: "Bluesky", href: "https://bsky.app/profile/virtualventures.bsky.social", icon: "☁" },
  { label: "YouTube", href: "https://www.youtube.com/@VirtualVenturesStudio", icon: "▶" },
  { label: "Etsy", href: "https://www.etsy.com/uk/shop/VirtualVenturesLab", icon: "E" },
  { label: "X", href: "#", icon: "𝕏" },
  { label: "Facebook", href: "#", icon: "f" },
];

export const visibleSocials = socials.filter((social) => social.href !== "#");
