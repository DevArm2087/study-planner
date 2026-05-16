export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? "☀ روشن" : "🌙 شب"}
    </button>
  );
}
