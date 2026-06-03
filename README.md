# Virtual Ventures

Virtual Ventures is an Astro website for a handmade craft workshop: crochet creatures, fantasy-inspired makes, laser engraved details, 3D printed helpers, patterns, stories, and small handmade treasures.

## Project Structure

```text
public/
  images/              Static brand and hero assets
scripts/
  optimise-hero.mjs    Sharp script for regenerating hero image variants
src/
  components/          Reusable Astro components
  content/             Blog content collections
  data/                Shared navigation and social link data
  layouts/             Base HTML shell
  pages/               File-based routes
  styles/              Global stylesheet
```

## Commands

Run commands from the repository root:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Image Optimisation

The homepage hero uses files in `public/images/hero/`. After replacing `hero-1.jpg`, regenerate the optimized variants with:

```sh
node scripts/optimise-hero.mjs
```
