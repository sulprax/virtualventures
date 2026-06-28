/* =========================================================
   SITE HEADER SCROLL BEHAVIOUR

   Owns:
   - adding/removing .is-scrolled on the header
   - showing/hiding the round back-to-top button
   - keeping the back-to-top button above the footer

   Does not own:
   - desktop navigation styling
   - mobile drawer behaviour
   - page hero/slideshow styling
   ========================================================= */

(() => {
  const DESKTOP_MEDIA_QUERY = "(min-width: 901px)";
  const COMPACT_TRIGGER_SELECTOR =
    "[data-compact-header-trigger], .hero, .page-hero-banner, .blog-hero-banner, .cover-slideshow";

  let animationFrameId = 0;

  function getScrollY() {
    return (
      document.scrollingElement?.scrollTop ??
      window.scrollY ??
      document.documentElement.scrollTop ??
      document.body.scrollTop ??
      0
    );
  }

  function getSiteHeader() {
    return document.querySelector("[data-site-header]");
  }

  function getCompactHeaderTrigger() {
    return document.querySelector(COMPACT_TRIGGER_SELECTOR);
  }

  function isDesktopViewport() {
    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
  }

  function shouldUseCompactHeader(header, scrollY) {
    if (!(header instanceof HTMLElement)) return false;
    if (!isDesktopViewport()) return false;

    const trigger = getCompactHeaderTrigger();
    const headerHeight = Math.max(64, header.getBoundingClientRect().height || 0);

    if (trigger instanceof HTMLElement) {
      const triggerRect = trigger.getBoundingClientRect();
      const triggerOffsetTop = trigger.offsetTop || 0;
      const triggerHeight = trigger.offsetHeight || triggerRect.height || 0;

      const triggerHasPassedHeader = triggerRect.bottom <= headerHeight + 8;
      const scrollHasPassedTrigger =
        scrollY >= triggerOffsetTop + Math.max(0, triggerHeight - headerHeight - 8);

      return triggerHasPassedHeader || scrollHasPassedTrigger;
    }

    return scrollY > 80;
  }

  function updateBackToTop(scrollY) {
    const backToTopButton = document.querySelector(".back-to-top-button");

    if (backToTopButton instanceof HTMLElement) {
      backToTopButton.classList.toggle("is-visible", scrollY > 180);
    }
  }

  function updateFloatingControls(scrollY) {
    const floatingQuickControls = document.querySelector(
      "[data-floating-quick-controls]",
    );
    const footer = document.querySelector(".site-footer");

    if (!(floatingQuickControls instanceof HTMLElement)) return;
    if (!(footer instanceof HTMLElement)) return;

    const windowHeight = window.innerHeight;
    const controlGap = 24;
    const footerTop = footer.offsetTop;
    const controlsHeight = floatingQuickControls.offsetHeight;
    const controlsBottomPosition = scrollY + windowHeight - controlGap;

    if (controlsBottomPosition + controlsHeight >= footerTop) {
      floatingQuickControls.classList.add("is-above-footer");
      floatingQuickControls.style.top = `${footerTop - controlsHeight - controlGap}px`;
      floatingQuickControls.style.bottom = "auto";
    } else {
      floatingQuickControls.classList.remove("is-above-footer");
      floatingQuickControls.style.top = "auto";
      floatingQuickControls.style.bottom = "1.25rem";
    }
  }

  function updateSiteHeaderState() {
    animationFrameId = 0;

    const header = getSiteHeader();
    const scrollY = getScrollY();
    const compactHeader = shouldUseCompactHeader(header, scrollY);

    if (header instanceof HTMLElement) {
      header.classList.toggle("is-scrolled", compactHeader);
    }

    updateBackToTop(scrollY);
    updateFloatingControls(scrollY);
  }

  function requestSiteHeaderUpdate() {
    if (animationFrameId) return;

    animationFrameId = window.requestAnimationFrame(updateSiteHeaderState);
  }

  function setupSiteHeaderScroll() {
    requestSiteHeaderUpdate();
  }

  window.addEventListener("scroll", requestSiteHeaderUpdate, { passive: true });
  document.addEventListener("scroll", requestSiteHeaderUpdate, { passive: true });
  window.visualViewport?.addEventListener("scroll", requestSiteHeaderUpdate, {
    passive: true,
  });

  window.addEventListener("resize", requestSiteHeaderUpdate);
  window.visualViewport?.addEventListener("resize", requestSiteHeaderUpdate);
  window.addEventListener("load", requestSiteHeaderUpdate);
  window.addEventListener("pageshow", requestSiteHeaderUpdate);

  document.addEventListener("DOMContentLoaded", setupSiteHeaderScroll);
  document.addEventListener("astro:page-load", setupSiteHeaderScroll);
  document.addEventListener("visibilitychange", requestSiteHeaderUpdate);

  setupSiteHeaderScroll();
})();
