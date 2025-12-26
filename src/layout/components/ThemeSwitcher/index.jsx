import { useContext } from "react";
import styles from "./ThemeSwitcher.module.scss";
import { MoonIcon, SunIcon } from "../Icons";
import { ThemeContext } from "@/providers/ThemeProvider";


function ThemeSwitcher() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				checked={theme === "dark"}
				onChange={toggleTheme}
			/>

			<span className={styles.slider}>
				{/* Іконка сонця зліва (light) */}
				<span className={styles.iconLeft}>
					<SunIcon size={18} />
				</span>

				{/* Іконка місяця справа (dark) */}
				<span className={styles.iconRight}>
					<MoonIcon size={18} />
				</span>
			</span>
		</label>
	);
}

export default ThemeSwitcher;
