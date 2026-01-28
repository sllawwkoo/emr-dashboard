import styles from "./Select.module.scss";

function Select({ label, error, multiple, options = [], disabled, ...rest }) {
	return (
		<div className={styles.selectWrapper}>
			{/* Лейбл над селектом */}
			{label && <label className={styles.selectLabel}>{label}</label>}

			{/* Сам select */}
			<select
				{...rest}
				multiple={!!multiple}
				disabled={disabled}
				className={`${styles.select} 
					${error ? styles.error : ""} 
					${multiple ? styles.multiple : ""} 
					${disabled ? styles.disabledInput : ""}
				`}
			>
				{/* Випадаючий placeholder тільки для одиночного select */}
				{!multiple && <option value="">— Оберіть —</option>}

				{/* Опції */}
				{options.map((o) => (
					<option
						key={o.value}
						value={o.value}
					>
						{o.label}
					</option>
				))}
			</select>

			{/* Помилка */}
			{error && <div className={styles.errorMessage}>{error}</div>}
		</div>
	);
}

export default Select;
