import { createContext, useEffect, useState } from "react";

/**
 * ThemeContext — глобальний контекст для теми
 * тут буде доступно:
 * - theme → "light" | "dark"
 * - toggleTheme → перемикач теми
 */
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
	/**
	 * ✅ Стейт теми
	 * 1) Спочатку перевіряємо:
	 *    - Чи ми у браузері
	 *    - Чи підтримується prefers-color-scheme
	 * 2) Якщо так → визначаємо системну тему
	 * 3) Якщо ні → ставимо light
	 */
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined" && window.matchMedia) {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return "light";
	});

	/**
	 * ✅ Коли theme змінюється → записуємо її в <html data-theme="">
	 * це дозволяє робити теми через CSS:
	 * html[data-theme="dark"] { ... }
	 */
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	/**
	 * ✅ Функція перемикання теми
	 */
	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
