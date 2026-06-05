import sharp from "sharp";

const input = "public/images/about/about-dog-friendly-original.jpg";

await sharp(input)
  .resize({
    width: 1800,
    withoutEnlargement: true,
  })
  .webp({
    quality: 80,
  })
  .toFile("public/images/about/about-dog-friendly.webp");

await sharp(input)
  .resize({
    width: 1800,
    withoutEnlargement: true,
  })
  .jpeg({
    quality: 78,
    mozjpeg: true,
  })
  .toFile("public/images/about/about-dog-friendly.jpg");

console.log("Optimised about dog-friendly image created.");