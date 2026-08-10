import { useTheme } from "../../../hooks/useTheme.js";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? "🌙" : "☀"}
      </span>
      <span className={styles.label}>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;