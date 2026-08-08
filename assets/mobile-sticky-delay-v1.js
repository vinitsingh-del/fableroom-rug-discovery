(() => {
  const initialiseStickyCta = () => {
    const stickyCta = document.querySelector(".mobile-shopbar");
    if (!stickyCta) return;

    const mobileView = window.matchMedia("(max-width: 760px)");
    let frame = 0;

    const updateStickyCta = () => {
      frame = 0;
      const viewportHeight = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const shouldShow =
        mobileView.matches && window.scrollY >= viewportHeight * 2;

      stickyCta.classList.toggle("is-scroll-ready", shouldShow);
      stickyCta.setAttribute("aria-hidden", String(!shouldShow));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateStickyCta);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    mobileView.addEventListener?.("change", scheduleUpdate);
    updateStickyCta();
  };

  if (document.readyState === "complete") {
    initialiseStickyCta();
  } else {
    window.addEventListener("load", initialiseStickyCta, { once: true });
  }
})();
