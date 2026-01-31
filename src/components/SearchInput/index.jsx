import { useEffect } from "react";
import styles from "./SearchInput.module.scss";
import { useDebounce } from "@/hooks/useDebounce";
import SearchIcon from "../Icons/SearchIcon";
import CloseIcon from "../Icons/CloseIcon";


/**
 * SearchInput — універсальний інпут для пошуку з автопошуком і debounce
 *
 * Props:
 * - value       — поточне значення
 * - onChange    — onChange для керування ззовні
 * - onSearch    — автопошук (після debounce)
 * - placeholder — плейсхолдер
 * - delay       — затримка debounce (за замовчуванням 300мс)
 * - disabled    — вимкнути інпут
 */
function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Пошук...",
  delay = 300,
  disabled = false,
}) {
  // debounce-значення
  const debouncedValue = useDebounce(value, delay);

  // 🔍 Автопошук при зміні debouncedValue
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  // ❌ Очистка поля
  const handleClear = () => {
    onChange("");
  };

  return (
    <div
      className={`${styles.searchContainer} ${disabled ? styles.disabled : ""}`}
    >
      {/* Іконка пошуку зліва */}
      <div className={styles.searchIcon}>
        <SearchIcon size={20} />
      </div>

      {/* Сам інпут */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.searchInput}
      />

      {/* Кнопка очистки (показується тільки коли є текст) */}
      {value && !disabled && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <CloseIcon size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
