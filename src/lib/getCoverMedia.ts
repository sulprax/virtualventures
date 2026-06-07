import { getCollection } from "astro:content";

export type CoverMediaItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  colours: string[];
  href: string;
  linkLabel: string;
};

export async function getCoverMedia(): Promise<CoverMediaItem[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const coverItems = posts.flatMap((post) =>
    (post.data.images ?? [])
      .filter((item) => item.cover === true)
      .map((item) => {
        const blogUrl = `/blog/${post.id.replace(/\.md$/, "")}/`;
        const href = post.data.shopUrl ?? blogUrl;

        return {
          src:
            item.mediaType === "video" ? (item.poster ?? item.src) : item.src,
          alt: item.alt,
          title: item.title,
          description: item.description ?? "",
          category: item.category,
          tags: item.tags ?? [],
          colours: item.colours ?? [],
          href,
          linkLabel: post.data.shopUrl
            ? "Click here to buy"
            : "Click here to read the blog",
        };
      }),
  );

  return Array.from(
    new Map(coverItems.map((item) => [item.src, item])).values(),
  );
}
