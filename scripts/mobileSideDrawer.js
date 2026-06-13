// Shared mobile side drawer behaviour for Blog, Gallery, Shop, About and future pages.

function setupMobileSideDrawers() {
  const drawerSets = Array.from(
    document.querySelectorAll("[data-mobile-side-drawer-root]"),
  );

  drawerSets.forEach((root) => {
    if (!(root instanceof HTMLElement)) return;
    if (root.dataset.mobileSideDrawerReady === "true") return;

    const toggle = root.querySelector("[data-mobile-side-toggle]");
    const drawer = root.querySelector("[data-mobile-side-drawer]");
    const backdrop = root.querySelector("[data-mobile-side-backdrop]");
    const footer = document.querySelector(".site-footer");
    const header = document.querySelector("[data-site-header]");

    if (!(toggle instanceof HTMLButtonElement)) return;
    if (!(drawer instanceof HTMLElement)) return;
    if (!(backdrop instanceof HTMLElement)) return;

    root.dataset.mobileSideDrawerReady = "true";

    const openLabel = toggle.dataset.openLabel || toggle.textContent || "Open";
    const closeLabel = toggle.dataset.closeLabel || "Close";

    function getViewportHeight() {
      return window.visualViewport?.height || window.innerHeight;
    }

    function getHeaderHeight() {
      if (header instanceof HTMLElement) {
        const headerHeight = header.getBoundingClientRect().height;

        if (Number.isFinite(headerHeight) && headerHeight > 0) {
          return headerHeight;
        }
      }

      const cssHeaderHeight = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--site-header-height")
          .replace("px", ""),
      );

      return Number.isFinite(cssHeaderHeight) && cssHeaderHeight > 0
        ? cssHeaderHeight
        : 72;
    }

    function getFooterVisibleAmount(viewportHeight) {
      if (!(footer instanceof HTMLElement)) return 0;

      const footerRect = footer.getBoundingClientRect();

      return Math.max(0, viewportHeight - footerRect.top);
    }

    function updateDrawerLimits() {
      const viewportHeight = getViewportHeight();
      const headerHeight = getHeaderHeight();
      const footerVisibleAmount = getFooterVisibleAmount(viewportHeight);
      const isFooterZone = footerVisibleAmount > 8;

      document.documentElement.style.setProperty(
        "--vv-wallet-header-offset",
        `${Math.round(headerHeight)}px`,
      );

      "--mobile-side-drawer-footer-gap",
      "0px",

      root.classList.toggle("is-near-footer", isFooterZone);
      document.body.classList.toggle("is-mobile-side-footer-zone", isFooterZone);

      const tabHeight = toggle.offsetHeight || 144;
      const minTop = headerHeight + 12;
      const maxTop = viewportHeight - footerVisibleAmount - tabHeight - 12;
      const preferredTop =
        headerHeight +
        (viewportHeight - headerHeight - footerVisibleAmount - tabHeight) / 2;

      const safeTop = Math.max(minTop, Math.min(preferredTop, maxTop));

      root.style.setProperty(
        "--mobile-side-drawer-tab-top",
        `${Math.round(safeTop)}px`,
      );

      if (window.matchMedia("(min-width: 901px)").matches) {
        closeDrawer();
      }
    }

    function openDrawer() {
      updateDrawerLimits();

      drawer.classList.add("is-open");
      backdrop.hidden = false;

      document.body.classList.add("has-open-mobile-side-drawer");

      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", closeLabel);
      toggle.dataset.drawerState = "open";
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      backdrop.hidden = true;

      document.body.classList.remove("has-open-mobile-side-drawer");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", openLabel);
      toggle.dataset.drawerState = "closed";
    }

    toggle.addEventListener("click", () => {
      updateDrawerLimits();

      const isOpen = drawer.classList.contains("is-open");

      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener("click", closeDrawer);

    drawer.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        target.closest("[data-close-mobile-side-drawer]")
      ) {
        closeDrawer();
      }
    });

    document.addEventListener("vv:close-mobile-side-drawers", closeDrawer);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });

    window.addEventListener("scroll", updateDrawerLimits, {
      passive: true,
    });

    window.addEventListener("resize", updateDrawerLimits);

    window.visualViewport?.addEventListener("resize", updateDrawerLimits);
    window.visualViewport?.addEventListener("scroll", updateDrawerLimits);

    backdrop.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", openLabel);
    toggle.dataset.drawerState = "closed";

    updateDrawerLimits();
  });
}

setupMobileSideDrawers();
document.addEventListener("astro:page-load", setupMobileSideDrawers);