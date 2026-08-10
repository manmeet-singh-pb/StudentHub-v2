import { useTheme } from "../../../hooks/useTheme.js";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? "🌙" : "☀"}
      </span>
      <span className={styles.label}>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;