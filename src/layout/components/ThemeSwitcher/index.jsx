import { useContext } from "react";
import styles from "./ThemeSwitcher.module.scss";
import { MoonIcon, SunIcon } from "../Icons";
import { ThemeContext } from "@/providers/ThemeProvider";


function ThemeSwitcher({ collapsed }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label
      className={[styles.switch, collapsed && styles.collapsed].filter(Boolean).join(" ")}
    >
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      <span className={styles.slider}>
        <span className={styles.iconLeft}>
          <SunIcon size={collapsed ? 13 : 18} />
        </span>
        <span className={styles.iconRight}>
          <MoonIcon size={collapsed ? 13 : 18} />
        </span>
      </span>
    </label>
  );
}

export default ThemeSwitcher;
