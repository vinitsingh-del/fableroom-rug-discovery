(() => {
  const roomSources = [
    null,
    "./assets/mobile-bedroom-rug-v1.webp",
    null,
    "./assets/FRRU00072_render_d14b5be9-e3e0-442f-be28-3713e7a3b2e2.png",
  ];

  const synchroniseRoomImages = () => {
    const roomCards = document.querySelectorAll(".room-card");
    if (roomCards.length < roomSources.length) return false;

    roomSources.forEach((source, index) => {
      if (!source) return;
      const image = roomCards[index]?.querySelector("img");
      if (image) image.src = source;
    });

    return true;
  };

  const initialiseRoomImages = () => {
    if (synchroniseRoomImages()) return;

    const observer = new MutationObserver(() => {
      if (synchroniseRoomImages()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 5000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseRoomImages, {
      once: true,
    });
  } else {
    initialiseRoomImages();
  }
})();
