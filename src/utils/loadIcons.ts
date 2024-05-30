const importAllIcons = () => {
  const icons: { [key: string]: string } = {};
  const files = import.meta.glob("../assets/icons/items/*.svg", {
    eager: true,
  });

  for (const path in files) {
    const key = path.split("/").pop()?.replace(".svg", "") || "";
    icons[key] = (files[path] as { default: string }).default;
  }

  return icons;
};

const icons = importAllIcons();

export default icons;
