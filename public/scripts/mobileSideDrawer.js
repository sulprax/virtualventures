// Shared mobile side drawer behaviour for Blog, Gallery, Shop and future pages.

function setupMobileSideDrawers() {
  const drawerSets = Array.from(
    document.querySelectorAll("[data-mobile-side-drawer-root]"),
  );

  drawerSets.forEach((root) => {
    const toggle = root.querySelector("[data-mobile-side-toggle]");
    const drawer = root.querySelector("[data-mobile-side-drawer]");
    const backdrop = root.querySelector("[data-mobile-side-backdrop]");
    const footer = document.querySelector(".site-footer");

    if (!(toggle instanceof HTMLButtonElement)) return;
    if (!(drawer instanceof HTMLElement)) return;
    if (!(backdrop instanceof HTMLElement)) return;

    const openLabel = toggle.dataset.openLabel || toggle.textContent || "Open";
    const closeLabel = toggle.dataset.closeLabel || "Close";

    function updateDrawerLimits() {
      const viewportHeight = window.innerHeight;
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--site-header-height")
          .replace("px", ""),
      ) || 76;

      let footerVisibleAmount = 0;

      if (footer instanceof HTMLElement) {
        const footerRect = footer.getBoundingClientRect();
        footerVisibleAmount = Math.max(0, viewportHeight - footerRect.top);
      }

      const isNearFooter = footerVisibleAmount > 0;

      document.documentElement.style.setProperty(
        "--mobile-side-drawer-footer-gap",
        `${footerVisibleAmount}px`,
      );

      document.body.classList.toggle("is-mobile-side-footer-zone", isNearFooter);
      root.classList.toggle("is-near-footer", isNearFooter);

      const tabHeight = toggle.offsetHeight || 140;
      const minTop = headerHeight + 12;
      const maxTop = viewportHeight - footerVisibleAmount - tabHeight - 12;
      const preferredTop = viewportHeight / 2 - tabHeight / 2;
      const safeTop = Math.max(minTop, Math.min(preferredTop, maxTop));

      root.style.setProperty("--mobile-side-drawer-tab-top", `${safeTop}px`);
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

      updateDrawerLimits();
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

    window.addEventListener("scroll", updateDrawerLimits, {
      passive: true,
    });

    window.addEventListener("resize", updateDrawerLimits);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });

    updateDrawerLimits();
  });
}

setupMobileSideDrawers();
