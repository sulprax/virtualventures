# Virtual Ventures CSS Map

This folder is the styling workshop for the site. Each file should have one job. If a selector feels like it belongs somewhere else, move it instead of patching over it.

## Main rule

`main.css` is imports only. Do not add visual styles to it.

## Folder ownership

### `base/`
Core foundations used everywhere.

- `tokens.css`: colours, spacing, shadows, radii, reusable CSS variables.
- `fonts.css`: font imports, font variables, global body and heading font defaults.
- `reset.css`: browser reset and safe element defaults.
- `accessibility.css`: focus states, skip links, screen-reader helpers, reduced motion helpers.
- `animations.css`: reusable named animations only.
- `global-polish.css`: small site-wide finishing touches that are not layout-specific.
- `scrollbar.css`: scrollbar styling only.

### `layout/`
Large page skeleton pieces.

- `header.css`: sticky header shell, header background, brand/logo area, desktop header search.
- `navigation.css`: desktop nav links, active nav state, separators/stars, hamburger, mobile nav drawer.
- `footer.css`: footer layout and footer-only elements.
- `breadcrumbs.css`: breadcrumb trails only.
- `page-shell.css`: shared page containers and page-width wrappers.
- `layers.css`: z-index/layer helpers only.

### `components/`
Reusable blocks used on multiple pages.

- `page-hero.css`: shared page hero/banner styles.
- `buttons.css`: shared button styles.
- `cards.css`: generic card patterns.
- `content-cards.css`: richer content/card blocks.
- `search.css`: site search page and reusable search components, not the header search box.
- `pagination.css`: pagination only.
- `calendar.css`: calendar widgets only.
- `lightbox.css`: gallery/blog lightbox behaviour and layout.
- `mobile-filter-drawer.css`: mobile filter drawer components.
- `social-icons.css`: social icon styling only.
- `labels.css`: labels, tags and pills.
- `scrapbook-media.css`: scrapbook/photo media presentation.

### `pages/`
Styles that should only affect one page or one page type.

- `blog.css`: blog index page only.
- `blog-post.css`: standalone blog post pages only.
- `faq.css`: FAQ page only.
- `gallery.css`: gallery page only.
- `home.css`: homepage-only styling.

## Boundary rules

1. Do not style `.site-header-nav` anywhere except `layout/navigation.css`.
2. Do not style `.site-header-brand` anywhere except `layout/header.css`.
3. Do not style `.page-hero-banner` anywhere except `components/page-hero.css`, unless a page has a very small page-specific adjustment.
4. Do not put emergency fixes at the bottom of files. Move the original rule to the correct file and fix it there.
5. Avoid `!important`. Use it only for accessibility or deliberate show/hide states such as `[hidden]`.
6. If a page needs a unique section, give it a page-specific class and keep the CSS in that page stylesheet.

## Naming guide

Use clear component names:

```css
.block {}
.block__part {}
.block--variant {}
.is-active {}
.is-open {}
```

Examples:

```css
.site-header {}
.site-header-brand {}
.site-header-search {}
.site-header-nav {}
.blog-card {}
.blog-card__image {}
.blog-card.is-open {}
```

## Cleanup checklist before changing styles

Before adding a new rule:

1. Search for the selector.
2. Check which file owns it.
3. Edit the owner file.
4. Do not add a second override somewhere else.
5. Run `npm run dev` and `npm run build`.
