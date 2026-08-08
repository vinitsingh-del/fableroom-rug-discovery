(() => {
  const setupStickyCta = (stickyCta) => {
    const mobileView = window.matchMedia("(max-width: 760px)");
    let frame = 0;
    let activationPoint =
      Math.max(window.innerHeight, document.documentElement.clientHeight) * 2;

    const updateStickyCta = () => {
      frame = 0;
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const shouldShow =
        mobileView.matches && scrollPosition >= activationPoint;

      stickyCta.classList.toggle("is-scroll-ready", shouldShow);
      stickyCta.setAttribute("aria-hidden", String(!shouldShow));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStickyCta);
    };

    const handleResize = () => {
      activationPoint =
        Math.max(window.innerHeight, document.documentElement.clientHeight) * 2;
      scheduleUpdate();
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    mobileView.addEventListener?.("change", scheduleUpdate);
    updateStickyCta();
  };

  const initialiseStickyCta = () => {
    const stickyCta = document.querySelector(".mobile-shopbar");
    if (stickyCta) {
      setupStickyCta(stickyCta);
      return;
    }

    const observer = new MutationObserver(() => {
      const mountedStickyCta = document.querySelector(".mobile-shopbar");
      if (!mountedStickyCta) return;

      observer.disconnect();
      setupStickyCta(mountedStickyCta);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseStickyCta, {
      once: true,
    });
  } else {
    initialiseStickyCta();
  }
})();
