(() => {
  const catalog = window.FABLEROOM_CATALOG;

  if (!Array.isArray(catalog)) return;

  const hasStyle = (product, styles) =>
    product.styles.some((style) => styles.includes(style));

  window.FABLEROOM_CATALOG = catalog.map((product) => {
    const name = product.name.toLowerCase();
    const materials = [];

    if (name.includes("wool")) materials.push("Wool");
    if (name.includes("jute")) materials.push("Jute");
    if (/\bpet\b/.test(name)) materials.push("PET");
    if (
      name.includes("silk") ||
      name.includes("tencel") ||
      name.includes("viscose")
    ) {
      materials.push("Silk blends");
    }

    const shape = name.includes("round") ? "Round" : "Rectangle";
    const rooms = [];

    if (
      !(
        product.craft === "Hand-woven" &&
        materials.some((material) => ["Jute", "PET"].includes(material))
      )
    ) {
      rooms.push("Living room");
    }

    if (
      !materials.includes("Jute") &&
      (["Hand-tufted", "Hand-knotted"].includes(product.craft) ||
        hasStyle(product, ["Coastal", "Minimal", "Scandinavian", "Solid"]))
    ) {
      rooms.push("Bedroom");
    }

    if (
      ["Hand-woven", "Handloom"].includes(product.craft) ||
      hasStyle(product, [
        "Checks",
        "Geometric",
        "Stripes",
        "Traditional",
      ]) ||
      shape === "Round"
    ) {
      rooms.push("Dining room");
    }

    if (
      ["Hand-woven", "Handloom"].includes(product.craft) ||
      materials.some((material) => ["Jute", "PET"].includes(material)) ||
      hasStyle(product, [
        "Checks",
        "Industrial",
        "Kilim",
        "Rustic",
        "Stripes",
      ])
    ) {
      rooms.push("Hallway");
    }

    if (rooms.length === 0) rooms.push("Living room");

    return {
      ...product,
      materials: [...new Set(materials)],
      rooms: [...new Set(rooms)],
      shape,
    };
  });
})();
