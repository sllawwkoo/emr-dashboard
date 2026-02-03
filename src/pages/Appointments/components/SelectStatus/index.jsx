import { STATUS_OPTIONS } from "../../utils/constants";
import styles from "./SelectStatus.module.scss";

function SelectStatus({ value, onChange, disabled }) {
  const handleChange = (e) => onChange?.(e.target.value);

  return (
    <select
      className={`${styles.select} ${value ? styles[`status_${value}`] : ""}`}
      value={value ?? ""}
      onChange={handleChange}
      disabled={disabled}
      aria-label="Статус прийому"
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SelectStatus;
