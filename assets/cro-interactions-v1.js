(() => {
  const mobileView = window.matchMedia("(max-width: 760px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const helpStorageKey = "fableroom-rug-help-seen";

  const safeStorage = {
    get() {
      try {
        return window.sessionStorage.getItem(helpStorageKey);
      } catch {
        return null;
      }
    },
    set() {
      try {
        window.sessionStorage.setItem(helpStorageKey, "true");
      } catch {
        // Browsing must continue even when storage is unavailable.
      }
    },
  };

  const labelElement = (element, action, placement) => {
    if (!element) return;
    const label =
      element.getAttribute("aria-label") ||
      element.textContent?.replace(/\s+/g, " ").trim() ||
      action;

    element.dataset.croAction = action;
    element.dataset.croLabel = label;
    element.dataset.croPlacement = placement;
  };

  const applyCopyPolish = () => {
    if (document.documentElement.dataset.rugCopyPolished) return;
    document.documentElement.dataset.rugCopyPolished = "true";

    const setText = (selector, copy) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = copy;
    };

    const replaceTextNode = (selector, currentCopy, revisedCopy) => {
      const element = document.querySelector(selector);
      if (!element) return;

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        if (node.nodeValue?.trim() === currentCopy) {
          node.nodeValue = node.nodeValue.replace(currentCopy, revisedCopy);
        }
        node = walker.nextNode();
      }
    };

    setText(
      ".craft-film-content .eyebrow",
      "60-RUG STYLE DISCOVERY",
    );
    replaceTextNode(
      ".craft-film-content h2",
      "One discovery hub.",
      "One rug discovery hub.",
    );
    replaceTextNode(
      ".craft-film-content h2",
      "Two ways into the range.",
      "Two ways to find your rug.",
    );
    setText(
      ".craft-film-intro",
      "Filter 60 rugs by the style you love or how each rug is made. Every result opens the matching FableRoom rug.",
    );
    setText(
      ".discovery-section .section-heading > p",
      "Start with the room you are furnishing, then compare the right rug sizes, textures and practical finishes.",
    );
    setText(
      ".shop-intro h2",
      "Every rug style. A clearer way to choose.",
    );
    setText(
      ".price-edit-heading h3",
      "Beautiful rugs for every budget.",
    );
    setText(
      ".price-edit-heading > span",
      "Four clear rug price ranges",
    );
    replaceTextNode(
      ".range-map .section-heading h2",
      "your right rug.",
      "the right rug.",
    );
    replaceTextNode(
      ".finder-pin b",
      "One clearer edit.",
      "One focused rug edit.",
    );
    setText(
      ".finder-lead",
      "Choose your room, mood and preferred finish. We will create a focused FableRoom rug edit in three quick steps.",
    );
    setText(".finder-result small", "Your rug match");
    replaceTextNode(
      ".craft-copy h2",
      "every style.",
      "every rug.",
    );
    setText(
      ".craft-copy > p:not(.eyebrow)",
      "Rug construction shapes the feel, detail and price. Here is the practical difference—without the jargon.",
    );
    setText(".craft-list article:nth-child(1) h3", "Hand-woven rugs");
    setText(
      ".craft-list article:nth-child(1) p",
      "Low-profile, tactile and versatile. Hand-woven rugs suit busy rooms, relaxed interiors and natural textures.",
    );
    setText(".craft-list article:nth-child(2) h3", "Hand-tufted rugs");
    setText(
      ".craft-list article:nth-child(2) p",
      "Plush underfoot with expressive colour and sculpted detail. Hand-tufted rugs balance comfort with visual impact.",
    );
    setText(".craft-list article:nth-child(3) h3", "Hand-knotted rugs");
    setText(
      ".craft-list article:nth-child(3) p",
      "Individually knotted for exceptional detail and lasting quality. Hand-knotted rugs are the heirloom choice.",
    );
    setText(".guide-grid article:nth-child(1) h3", "Choose the right rug size");
    setText(".guide-grid article:nth-child(2) h3", "Choose rug fibre for real life");
    setText(".guide-grid article:nth-child(3) h3", "Let your rug connect the room");
  };

  const applyCroLabels = () => {
    const sections = [
      ["#top", "hero"],
      [".craft-film-section", "style-discovery"],
      ["#find", "room-discovery"],
      ["#shop", "rug-catalogue"],
      ["#colour-shop", "colour-discovery"],
      [".price-edit-section", "price-discovery"],
      ["#craft", "range-discovery"],
      ["#guide", "rug-finder"],
    ];

    for (const [selector, name] of sections) {
      const section = document.querySelector(selector);
      if (!section) continue;
      section.dataset.croSection = name;
      if (!section.getAttribute("aria-label")) {
        section.setAttribute("aria-label", name.replace(/-/g, " "));
      }
    }

    document
      .querySelectorAll('.site-header a[href], .mobile-menu a[href]')
      .forEach((element) => labelElement(element, "navigation", "header"));

    document
      .querySelectorAll('.product-card a[href*="/products/"]')
      .forEach((element) => labelElement(element, "view-rug", "product-card"));

    document
      .querySelectorAll(".product-media button")
      .forEach((element) => labelElement(element, "save-rug", "product-card"));

    document
      .querySelectorAll(
        ".filter-axis-tabs button, .filter-option-row button, .colour-filter-row button, .discovery-filter-row button, .finder-panel fieldset button",
      )
      .forEach((element) =>
        labelElement(element, "select-filter", "rug-discovery"),
      );

    document
      .querySelectorAll(".price-ticket")
      .forEach((element) => {
        labelElement(element, "shop-price-range", "price-discovery");
        if (!element.getAttribute("aria-label")) {
          element.setAttribute(
            "aria-label",
            `Shop rugs ${element.querySelector("strong")?.textContent || "by price"}`,
          );
        }
      });

    document
      .querySelectorAll(
        ".hero-cut-button, .hero-product-cta, .colour-card-cta, .finder-result > a, .craft-film-cta, .mobile-shopbar a",
      )
      .forEach((element) => labelElement(element, "primary-cta", "page"));

    document.querySelectorAll('a[href^="#"]').forEach((element) => {
      const targetId = element.getAttribute("href")?.slice(1);
      if (targetId && !document.getElementById(targetId)) {
        element.dataset.croTargetMissing = "true";
      }
    });
  };

  const setupInteractionTracking = () => {
    if (document.documentElement.dataset.croTrackingReady) return;
    document.documentElement.dataset.croTrackingReady = "true";

    document.addEventListener(
      "click",
      (event) => {
        const target = event.target.closest?.("[data-cro-action]");
        if (!target) return;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "cro_interaction",
          cro_action: target.dataset.croAction,
          cro_label: target.dataset.croLabel,
          cro_placement: target.dataset.croPlacement,
        });
      },
      { passive: true },
    );
  };

  const setupMobilePriceMotion = () => {
    const rail = document.querySelector(".price-edit-rail");
    if (!rail || rail.dataset.autoMotionReady) return;
    rail.dataset.autoMotionReady = "true";

    const originals = [...rail.querySelectorAll(".price-ticket")];
    let timer = 0;
    let visible = false;
    let pausedUntil = 0;

    const removeClones = () => {
      rail.querySelectorAll(".price-ticket-clone").forEach((clone) => clone.remove());
      rail.scrollLeft = Math.min(rail.scrollLeft, rail.scrollWidth);
    };

    const ensureClones = () => {
      if (!mobileView.matches || rail.querySelector(".price-ticket-clone")) return;
      originals.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.add("price-ticket-clone");
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        clone.querySelectorAll("a, button").forEach((control) => {
          control.setAttribute("tabindex", "-1");
        });
        rail.appendChild(clone);
      });
    };

    const pause = () => {
      pausedUntil = Date.now() + 5000;
    };

    const advance = () => {
      if (
        !mobileView.matches ||
        reducedMotion.matches ||
        !visible ||
        document.hidden ||
        Date.now() < pausedUntil
      ) {
        return;
      }

      ensureClones();
      const firstCard = originals[0];
      if (!firstCard) return;

      const gap = parseFloat(getComputedStyle(rail).gap) || 9;
      const step = firstCard.getBoundingClientRect().width + gap;
      const loopWidth = rail.scrollWidth / 2;

      rail.scrollBy({ left: step, behavior: "smooth" });
      window.setTimeout(() => {
        if (rail.scrollLeft >= loopWidth - 2) {
          rail.scrollLeft -= loopWidth;
        }
      }, 480);
    };

    const restart = () => {
      window.clearInterval(timer);
      if (mobileView.matches && !reducedMotion.matches) {
        ensureClones();
        timer = window.setInterval(advance, 1700);
      } else {
        removeClones();
      }
    };

    ["pointerdown", "touchstart", "wheel", "focusin"].forEach((eventName) => {
      rail.addEventListener(eventName, pause, { passive: true });
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.22 },
    );
    visibilityObserver.observe(rail);

    mobileView.addEventListener?.("change", restart);
    reducedMotion.addEventListener?.("change", restart);
    restart();
  };

  const createRugHelp = () => {
    if (document.querySelector(".cro-rug-help")) return;

    const help = document.createElement("aside");
    help.className = "cro-rug-help";
    help.setAttribute("role", "dialog");
    help.setAttribute("aria-modal", "false");
    help.setAttribute("aria-labelledby", "cro-rug-help-title");
    help.innerHTML = `
      <button class="cro-rug-help-close" type="button" aria-label="Close rug help">×</button>
      <div class="cro-rug-help-rugs" aria-hidden="true">
        <img src="./assets/FRRU00065_render.png" alt="" />
        <img src="./assets/FRRU00032A_1.png" alt="" />
        <img src="./assets/FRRU00246P.png" alt="" />
      </div>
      <div class="cro-rug-help-copy">
        <small>Still not sure?</small>
        <h2 id="cro-rug-help-title">Let us help find your rug.</h2>
        <p>Tell the FableRoom team about your room, size and style for a clearer starting point.</p>
        <div class="cro-rug-help-actions">
          <a href="https://fableroom.com/pages/contact">Reach our rug team <span>→</span></a>
          <button type="button">Keep browsing</button>
        </div>
      </div>
    `;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      help.classList.add("is-closing");
      safeStorage.set();
      document.removeEventListener("keydown", handleEscape);
      window.setTimeout(() => help.remove(), reducedMotion.matches ? 0 : 220);
    };

    help.querySelector(".cro-rug-help-close").addEventListener("click", dismiss);
    help
      .querySelector(".cro-rug-help-actions button")
      .addEventListener("click", dismiss);
    help.querySelector(".cro-rug-help-actions a").addEventListener("click", () => {
      safeStorage.set();
    });

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      dismiss();
    };
    document.addEventListener("keydown", handleEscape);

    document.body.appendChild(help);
    labelElement(
      help.querySelector(".cro-rug-help-actions a"),
      "contact-rug-team",
      "scroll-depth-help",
    );
    labelElement(
      help.querySelector(".cro-rug-help-close"),
      "dismiss-help",
      "scroll-depth-help",
    );
    labelElement(
      help.querySelector(".cro-rug-help-actions button"),
      "dismiss-help",
      "scroll-depth-help",
    );
    window.requestAnimationFrame(() => help.classList.add("is-visible"));
  };

  const setupScrollDepthHelp = () => {
    if (safeStorage.get()) return;
    let shown = false;
    let frame = 0;

    const checkDepth = () => {
      frame = 0;
      if (shown) return;
      const viewport = Math.max(window.innerHeight, 1);
      if (window.scrollY < viewport * 7) return;

      shown = true;
      safeStorage.set();
      createRugHelp();
      window.removeEventListener("scroll", scheduleDepthCheck);
    };

    const scheduleDepthCheck = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(checkDepth);
    };

    window.addEventListener("scroll", scheduleDepthCheck, { passive: true });
    checkDepth();
  };

  const initialise = () => {
    const mount = () => {
      if (!document.querySelector("#shop")) return false;
      applyCopyPolish();
      applyCroLabels();
      setupInteractionTracking();
      setupMobilePriceMotion();
      setupScrollDepthHelp();
      return true;
    };

    if (mount()) return;
    const observer = new MutationObserver(() => {
      if (!mount()) return;
      observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
