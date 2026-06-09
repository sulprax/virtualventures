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

    function updateDrawerFooterLimit() {
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const footerVisibleAmount = Math.max(0, viewportHeight - footerRect.top);

      document.documentElement.style.setProperty(
        "--mobile-side-drawer-footer-gap",
        `${footerVisibleAmount}px`,
      );
    }

    function openDrawer() {
      updateDrawerFooterLimit();

      drawer.classList.add("is-open");
      backdrop.hidden = false;
      document.body.classList.add("has-open-mobile-side-drawer");

      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", closeLabel);
      toggle.textContent = closeLabel;
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      backdrop.hidden = true;
      document.body.classList.remove("has-open-mobile-side-drawer");

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", openLabel);
      toggle.textContent = openLabel;
    }

    toggle.addEventListener("click", () => {
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

    window.addEventListener("scroll", updateDrawerFooterLimit, {
      passive: true,
    });

    window.addEventListener("resize", updateDrawerFooterLimit);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });

    updateDrawerFooterLimit();
  });
}

setupMobileSideDrawers();