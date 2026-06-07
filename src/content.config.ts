import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const galleryImage = z.object({
  src: z.string(),
  title: z.string(),
  alt: z.string(),
  description: z.string().optional().default(""),
  category: z
    .enum([
      "crochet",
      "laser",
      "3d-printing",
      "books-patterns",
      "shop",
      "website",
      "behind-the-scenes",
      "patterns",
      "kdp-books",
      "tools-and-supplies",
    ])
    .default("behind-the-scenes"),
  tags: z.array(z.string()).default([]),
  colours: z.array(z.string()).default([]),

  // Media
  mediaType: z.enum(["image", "video"]).default("image"),
  videoSrc: z.string().optional(),
  poster: z.string().optional(),
  duration: z.string().optional(),
  autoplayPreview: z.boolean().default(false),

  // Layout
  shape: z
    .enum(["square", "portrait", "landscape", "banner", "tall"])
    .default("square"),

  // Controls
  gallery: z.boolean().default(true),
  latest: z.boolean().default(true),
  cover: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    author: z.string().default("Virtual Ventures"),

    category: z
      .enum([
        "crochet",
        "laser",
        "3d-printing",
        "books-patterns",
        "shop",
        "website",
        "behind-the-scenes",
        "patterns",
        "kdp-books",
        "tools-and-supplies",
      ])
      .default("behind-the-scenes"),

    tags: z.array(z.string()).default([]),

    emoji: z.string().default("✦"),

    // Old simple image field, keep this so existing code does not break
    image: z.string().optional(),

    // New image system for gallery automation
    images: z.array(galleryImage).default([]),

    pinned: z.boolean().default(false),
    pinLabel: z.string().optional(),

    shopUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};
