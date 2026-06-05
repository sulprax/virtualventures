export type SearchType = "Page" | "Page Section" | "Blog Post" | "Image";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: SearchType;
  emoji: string;
  image?: string;
  imageAlt?: string;
  searchText: string;
};

export type SearchTextPart = string | null | undefined | SearchTextPart[];

function flattenSearchPart(part: SearchTextPart): string[] {
  if (!part) return [];

  if (Array.isArray(part)) {
    return part.flatMap(flattenSearchPart);
  }

  return [part];
}

export function makeSearchText(parts: SearchTextPart[]) {
  return parts
    .flatMap(flattenSearchPart)
    .join(" ")
    .toLowerCase();
}

export const staticSearchItems: SearchItem[] = [
  {
    title: "Home",
    description:
      "Virtual Ventures homepage with handmade crochet, laser engraving, 3D printing, blog posts, shop links, gallery links, patterns and creative workshop updates.",
    href: "/",
    type: "Page",
    emoji: "🏡",
    searchText: makeSearchText([
      "home",
      "virtual ventures",
      "handmade with a little everyday magic",
      "handmade crochet laser engraving 3d printing blog shop gallery patterns creative workshop everyday magic",
    ]),
  },
  {
    title: "About Virtual Ventures",
    description:
      "A UK-based handmade workshop for crochet creatures, pattern ideas, laser engraved details, 3D printed helpers, planners, tutorials and useful little creative things.",
    href: "/about/",
    type: "Page",
    emoji: "🌿",
    searchText: makeSearchText([
      "about virtual ventures",
      "uk-based handmade workshop",
      "crochet creatures original patterns laser engraved details 3d printed craft helpers planners books creative experiments",
      "pattern ideas laser engraved details 3d printed helpers planners tutorials useful little creative things",
    ]),
  },
  {
    title: "Hello from the workshop",
    description:
      "Handmade things, useful ideas and a little everyday magic. Virtual Ventures is a UK-based creative workshop for crochet creatures, custom patterns, engraved items, planners, books, tutorials, 3D printed helpers and useful little things.",
    href: "/about/#hello-from-the-workshop",
    type: "Page Section",
    emoji: "✦",
    searchText: makeSearchText([
      "hello from the workshop",
      "handmade things useful ideas everyday magic",
      "virtual ventures uk-based creative workshop crochet creatures custom patterns engraved items planners books tutorials 3d printed helpers scribble notebook",
      "designing website shaping shop planning future patterns testing ideas documenting process share creativity keep making smiles",
    ]),
  },
  {
    title: "The maker behind Virtual Ventures",
    description:
      "Crochet is the heart of the workshop, alongside laser engraving, 3D printing, website building, planners, books, tutorials and creative experiments.",
    href: "/about/#maker-behind-virtual-ventures",
    type: "Page Section",
    emoji: "🌿",
    searchText: makeSearchText([
      "who am i",
      "maker behind virtual ventures",
      "hands busy idea crochet heart workshop busy maker-brain laser engraving 3d printing website building planners books tutorials creative rabbit hole",
      "privacy safety personal details separate business public face making learning experiments finished pieces stories",
    ]),
  },
  {
    title: "Why Virtual Ventures?",
    description:
      "Virtual Ventures exists to share creativity, original patterns, successes, failures, stitch-count chaos and the story behind the work.",
    href: "/about/#why-virtual-ventures",
    type: "Page Section",
    emoji: "✨",
    searchText: makeSearchText([
      "why virtual ventures",
      "creativity shared",
      "share creativity world crochet pieces other makers patterns creating own patterns handmade business shiny finished bits successes failures stitch count dramatic 3d printer chapter",
    ]),
  },
  {
    title: "What do I make?",
    description:
      "Crochet, engraving, planners, tools, books, YouTube tutorials, STL files, digital products, physical products and useful handmade things.",
    href: "/about/#what-do-i-make",
    type: "Page Section",
    emoji: "🧶",
    searchText: makeSearchText([
      "what do i make",
      "crochet engraving planners tools tiny useful things",
      "handmade crochet items custom crochet patterns engraved pieces planners books youtube tutorials stl files 3d printed craft helpers",
      "physical digital experiments thoughtful useful handmade genuinely helpful cute useful cute",
    ]),
  },
  {
    title: "Handmade honesty",
    description:
      "AI is useful, but it is not the maker. Patterns take time, testing and real hands.",
    href: "/about/#handmade-honesty",
    type: "Page Section",
    emoji: "🧠",
    searchText: makeSearchText([
      "handmade honesty",
      "patterns take time testing real hands",
      "ai artificial intelligence useful not maker ai help rambling notes clearer wording spelling organise ideas verify code honest",
      "designs crochet work photos editing finished products created by me future patterns made tested checked improved real hands not generated",
      "ai crochet patterns worrying confident-looking instructions testing fixing actually make thing safe honest space handmade work real process community",
    ]),
  },
  {
    title: "Behind the scenes",
    description:
      "The good bits, the messy bits and the learning bits behind the making process.",
    href: "/about/#behind-the-scenes",
    type: "Page Section",
    emoji: "📝",
    searchText: makeSearchText([
      "behind the scenes",
      "good bits messy bits learning bits",
      "business pages polished final product blog making process experiments lessons broken attempts improvements tiny victories ready to sell",
      "crochet idea versions website feature laser test 3d print fails story",
    ]),
  },
  {
    title: "A tiny note about dog glitter.",
    description:
      "Virtual Ventures is made in a real home workshop. Dogs may appear in behind-the-scenes photos, and future physical crochet pieces will be clearly described as made in a dog-friendly space.",
    href: "/about/#dog-friendly-workshop",
    type: "Page Section",
    emoji: "🐾",
    image: "/images/about/about-dog-friendly.jpg",
    imageAlt:
      "A crochet blanket in progress with yarn, colour notes and two dogs resting nearby in a cosy dog-friendly home workshop.",
    searchText: makeSearchText([
      "dog-friendly workshop",
      "tiny note about dog glitter",
      "virtual ventures real home workshop dogs behind-the-scenes photos finished items handled carefully physical crochet pieces sold future clear honest dog-friendly space",
      "crochet blanket progress yarn colour notes two dogs resting nearby cosy dog-friendly home workshop",
      "dog dogs pet pets animal animals dog glitter",
    ]),
  },
  {
    title: "What comes next?",
    description:
      "Patterns, tutorials, live streams, a growing handmade shop, original crochet patterns, YouTube tutorials, planners, books, engraved items and 3D printed helpers.",
    href: "/about/#what-comes-next",
    type: "Page Section",
    emoji: "🚀",
    searchText: makeSearchText([
      "what comes next",
      "patterns tutorials live streams growing handmade shop",
      "building shop creating original crochet patterns youtube tutorials preparing planners books designing engraved items testing 3d printed helpers cosy live streams",
      "handmade corner ideas learning community-shaped future follow process trust products adventure",
    ]),
  },
  {
    title: "About closing note",
    description:
      "Virtual Ventures exists to share creativity, document the process and make handmade things that carry a little smile with them.",
    href: "/about/#about-closing-note",
    type: "Page Section",
    emoji: "☕",
    searchText: makeSearchText([
      "virtual ventures exists share creativity document process make handmade things carry smile",
    ]),
  },
  {
    title: "Blog",
    description:
      "Workshop notes, project updates, crochet progress, pattern plans, laser engraving notes, shop news and behind-the-scenes posts.",
    href: "/blog/",
    type: "Page",
    emoji: "📝",
    searchText: makeSearchText([
      "blog",
      "workshop notes project updates crochet progress pattern plans laser engraving notes shop news behind-the-scenes posts",
      "crochet patterns laser 3d printing books patterns shop website tutorials videos",
    ]),
  },
  {
    title: "Gallery",
    description:
      "A gallery of Virtual Ventures makes, crochet creatures, handmade items, laser projects, photos and creative experiments.",
    href: "/gallery/",
    type: "Page",
    emoji: "🖼️",
    searchText: makeSearchText([
      "gallery",
      "photos images makes crochet creatures handmade items laser projects 3d printing experiments",
      "finished makes behind the scenes progress photos",
    ]),
  },
  {
    title: "Shop",
    description:
      "Shop links and product pages for Virtual Ventures handmade items, crochet planners, patterns, books and creative products.",
    href: "/shop/",
    type: "Page",
    emoji: "🛒",
    searchText: makeSearchText([
      "shop",
      "products buy etsy kdp crochet planner patterns handmade items digital downloads books",
      "project planner crochet knitting notes patterns handmade shop",
    ]),
  },
  {
    title: "Contact",
    description:
      "Contact Virtual Ventures for questions, handmade projects, shop help and workshop messages.",
    href: "/contact/",
    type: "Page",
    emoji: "✉️",
    searchText: makeSearchText([
      "contact",
      "message email virtual ventures questions help handmade projects shop support workshop messages",
    ]),
  },
  {
    title: "FAQ",
    description:
      "Frequently asked questions about Virtual Ventures, handmade items, crochet, patterns, shop orders and creative projects.",
    href: "/faq/",
    type: "Page",
    emoji: "❔",
    searchText: makeSearchText([
      "faq frequently asked questions help crochet patterns shop orders handmade items delivery digital products",
    ]),
  },
  {
    title: "Crochet",
    description:
      "Crochet projects, stitch notes, patterns, handmade creatures, plushies and yarn-filled workshop updates.",
    href: "/crochet/",
    type: "Page",
    emoji: "🧶",
    searchText: makeSearchText([
      "crochet",
      "yarn stitches plushies amigurumi creatures patterns handmade hooks project planner stitch tutorials",
    ]),
  },
  {
    title: "Laser",
    description:
      "Laser engraving projects, wooden details, leather ideas, engraved gifts and workshop experiments.",
    href: "/laser/",
    type: "Page",
    emoji: "🔥",
    searchText: makeSearchText([
      "laser",
      "laser engraving engraved wood leather slate gifts xtool workshop experiments",
    ]),
  },
  {
    title: "3D Printing",
    description:
      "3D printing projects, tools, stands, helpers, prototypes and workshop experiments.",
    href: "/3d-printing/",
    type: "Page",
    emoji: "🖨️",
    searchText: makeSearchText([
      "3d printing",
      "printer tools stands helpers prototypes workshop experiments filament stl files",
    ]),
  },
  {
    title: "Patterns",
    description:
      "Crochet patterns, pattern plans, digital downloads, project notes and future designs.",
    href: "/patterns/",
    type: "Page",
    emoji: "📐",
    searchText: makeSearchText([
      "patterns",
      "crochet pattern plans digital downloads designs instructions handmade not ai generated real hands testing",
    ]),
  },
  {
    title: "Books",
    description:
      "Virtual Ventures books, planners, KDP projects and printable creative tools.",
    href: "/books/",
    type: "Page",
    emoji: "📚",
    searchText: makeSearchText([
      "books",
      "planner kdp crochet project planner knitting notes printable creative tools",
    ]),
  },
  {
    title: "Privacy",
    description: "Privacy information for Virtual Ventures.",
    href: "/privacy/",
    type: "Page",
    emoji: "🔒",
    searchText: makeSearchText([
      "privacy policy data cookies personal information virtual ventures",
    ]),
  },
  {
    title: "Terms",
    description: "Terms and information for using Virtual Ventures.",
    href: "/terms/",
    type: "Page",
    emoji: "📜",
    searchText: makeSearchText([
      "terms conditions usage website virtual ventures shop information",
    ]),
  },
  {
    title: "Dog-friendly workshop photo",
    description:
      "A crochet blanket in progress with yarn, colour notes and two dogs resting nearby in a cosy dog-friendly home workshop.",
    href: "/about/#dog-friendly-workshop",
    type: "Image",
    emoji: "🖼️",
    image: "/images/about/about-dog-friendly.jpg",
    imageAlt:
      "A crochet blanket in progress with yarn, colour notes and two dogs resting nearby in a cosy dog-friendly home workshop.",
    searchText: makeSearchText([
      "dog-friendly workshop photo",
      "crochet blanket progress yarn colour notes two dogs resting nearby cosy dog-friendly home workshop",
      "dog dogs pets yarn crochet about image photo behind the scenes",
    ]),
  },
];