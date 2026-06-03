import sharp from "sharp";

const input = "public/images/hero/hero-1.jpg";

await sharp(input)
  .resize({
    width: 1920,
    height: 1080,
    fit: "cover",
    position: "center",
  })
  .jpeg({
    quality: 78,
    progressive: true,
  })
  .toFile("public/images/hero/hero-1-optimised.jpg");

await sharp(input)
  .resize({
    width: 1920,
    height: 1080,
    fit: "cover",
    position: "center",
  })
  .webp({
    quality: 78,
  })
  .toFile("public/images/hero/hero-1.webp");

await sharp(input)
  .resize({
    width: 1080,
    height: 1440,
    fit: "cover",
    position: "center",
  })
  .webp({
    quality: 76,
  })
  .toFile("public/images/hero/hero-1-mobile.webp");

console.log("Hero images optimised.");
