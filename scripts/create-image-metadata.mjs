import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const categories = [
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
];

const rl = readline.createInterface({ input, output });

function slugToTitle(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function booleanAnswer(value, fallback = true) {
  const cleanValue = value.trim().toLowerCase();

  if (!cleanValue) return fallback;
  if (["y", "yes", "true", "1"].includes(cleanValue)) return true;
  if (["n", "no", "false", "0"].includes(cleanValue)) return false;

  return fallback;
}

function yamlList(items) {
  if (items.length === 0) {
    return "      - needs-tag";
  }

  return items.map((item) => `      - ${item}`).join("\n");
}

async function ask(question, fallback = "") {
  const answer = await rl.question(
    fallback ? `${question} (${fallback}): ` : `${question}: `,
  );

  return answer.trim() || fallback;
}

async function main() {
  console.log("\n🌿 Virtual Ventures image metadata helper\n");

  const src = await ask(
    "Website image path",
    "/images/blog/example-folder/example-image.webp",
  );

  const filename = path.basename(src);
  const suggestedTitle = slugToTitle(filename);

  const title = await ask("Title", suggestedTitle);

  const category = await ask(
    `Category ${categories.join(" / ")}`,
    "behind-the-scenes",
  );

  if (!categories.includes(category)) {
    console.log(`\n⚠️ "${category}" is not in your allowed category list.`);
    console.log("Use one of these:");
    console.log(categories.join(", "));
    rl.close();
    process.exit(1);
  }

  const alt = await ask(
    "Alt text",
    `A photo of ${title.toLowerCase()} for Virtual Ventures.`,
  );

  const description = await ask(
    "Description",
    `${title} photographed for the Virtual Ventures website, blog and gallery.`,
  );

  const tags = splitList(
    await ask("Tags, comma separated, max 3", "photo-stage, handmade, behind-the-scenes"),
  );

  const colours = splitList(
    await ask("Colours, comma separated, max 3", "cream, brown, gold"),
  );

  const gallery = booleanAnswer(await ask("Show in gallery? yes/no", "yes"));
  const latest = booleanAnswer(await ask("Allow in latest photos? yes/no", "yes"));
  const cover = booleanAnswer(await ask("Use as blog cover? yes/no", "no"), false);

  const block = `  - src: "${src}"
    title: "${title}"
    alt: "${alt}"
    description: "${description}"
    category: "${category}"
    tags:
${yamlList(tags)}
    colours:
${yamlList(colours)}
    gallery: ${gallery}
    latest: ${latest}
    cover: ${cover}`;

  await fs.mkdir("tmp", { recursive: true });
  await fs.writeFile("tmp/image-metadata.yml", `${block}\n`, "utf8");

  console.log("\n✨ Copy this into your blog post under images:\n");
  console.log(block);
  console.log("\nSaved a copy here:");
  console.log("tmp/image-metadata.yml\n");

  rl.close();
}

main().catch((error) => {
  console.error("\n❌ Metadata helper failed:");
  console.error(error);
  rl.close();
  process.exit(1);
});