import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
      ])
      .default("behind-the-scenes"),

    tags: z.array(z.string()).default([]),

    emoji: z.string().default("✦"),
    image: z.string().optional(),

    pinned: z.boolean().default(false),
    pinLabel: z.string().optional(),

    shopUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
};