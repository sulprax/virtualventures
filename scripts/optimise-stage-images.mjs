import sharp from "sharp";

const images = [
  {
    input: "public/images/blog/virtual-ventures-stage/virtual-ventures-photo-stage-empty.jpg",
    output: "public/images/blog/virtual-ventures-stage/virtual-ventures-photo-stage-empty.webp",
  },
  {
    input: "public/images/blog/virtual-ventures-stage/crochet-bunny-on-virtual-ventures-stage.jpg",
    output: "public/images/blog/virtual-ventures-stage/crochet-bunny-on-virtual-ventures-stage.webp",
  },
  {
    input: "public/images/blog/virtual-ventures-stage/crochet-owl-on-virtual-ventures-stage.jpg",
    output: "public/images/blog/virtual-ventures-stage/crochet-owl-on-virtual-ventures-stage.webp",
  },
];

for (const image of images) {
  await sharp(image.input)
    .resize({
      width: 1800,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toFile(image.output);

  console.log(`Created ${image.output}`);
}

console.log("Optimised Virtual Ventures stage images created.");