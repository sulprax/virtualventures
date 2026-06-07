import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const DEFAULT_INPUT_DIRS = ["public/images"];

const SKIP_FOLDERS = [
  "public/images/brand",
  "public/images/logos",
  "public/images/icons",
];

const shouldDeleteOriginals = process.argv.includes("--delete-originals");
const ignoredFolders = new Set(["node_modules", ".git", "dist", ".astro"]);

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalisePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

function shouldSkipFile(filePath) {
  const cleanPath = normalisePath(filePath);
  return SKIP_FOLDERS.some((folder) => cleanPath.startsWith(folder));
}

async function walkFolder(folderPath) {
  const files = [];

  if (!(await pathExists(folderPath))) {
    return files;
  }

  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    const cleanPath = normalisePath(fullPath);

    if (entry.isDirectory()) {
      if (ignoredFolders.has(entry.name)) continue;

      if (SKIP_FOLDERS.some((folder) => cleanPath.startsWith(folder))) {
        continue;
      }

      files.push(...(await walkFolder(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function makeWebpPath(filePath) {
  const extension = path.extname(filePath);
  return filePath.slice(0, -extension.length) + ".webp";
}

async function convertImage(filePath) {
  if (shouldSkipFile(filePath)) {
    return { status: "skipped", filePath };
  }

  const extension = path.extname(filePath).toLowerCase();

  if (!IMAGE_EXTENSIONS.has(extension)) {
    return { status: "skipped", filePath };
  }

  const webpPath = makeWebpPath(filePath);

  await sharp(filePath)
    .rotate()
    .resize({
      width: 3000,
      height: 3000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 86,
      effort: 5,
    })
    .toFile(webpPath);

  if (shouldDeleteOriginals) {
    await fs.unlink(filePath);
  }

  return {
    status: "converted",
    filePath,
    webpPath,
    deletedOriginal: shouldDeleteOriginals,
  };
}

async function main() {
  console.log("🌿 Virtual Ventures image converter starting...");

  const allFiles = [];

  for (const folder of DEFAULT_INPUT_DIRS) {
    const folderFiles = await walkFolder(folder);
    allFiles.push(...folderFiles);
  }

  const imageFiles = allFiles.filter((filePath) =>
    IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  );

  if (imageFiles.length === 0) {
    console.log(
      "No jpg, jpeg, or png files found. The cupboard is already tidy ✨",
    );
    return;
  }

  for (const imageFile of imageFiles) {
    const result = await convertImage(imageFile);

    if (result.status === "converted") {
      console.log(
        `✅ ${result.filePath} → ${result.webpPath}${
          result.deletedOriginal ? " | old file deleted" : ""
        }`,
      );
    }
  }

  console.log("Done. Images are now WebP-shaped little moon biscuits 🌙");
}

main().catch((error) => {
  console.error("❌ Image conversion failed:");
  console.error(error);
  process.exit(1);
});