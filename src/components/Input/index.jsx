import styles from "./Input.module.scss";

function Input({ label, error, hint, ...rest }) {
	return (
		<div className={styles.inputContainer}>
			{/*  Лейбл поля (показується тільки якщо передано label)  */}
			{label && <label className={styles.inputLabel}>{label}</label>}
			{/* Сам інпут */}
			{/* Додаткові атрибути: value, onChange, type, name — все, що прийде ззовні */}
			{/* Якщо error існує → додаємо styles.error */}
			<input
				{...rest}
				className={`${styles.inputField} ${error ? styles.error : ""}`}
			/>
			{/* Підказка (hint) — показується тільки якщо НІМАЄ помилки */}
			{hint && !error && <div className={styles.inputHint}>{hint}</div>}
			{/* Текст помилки (показується тільки при error) */}
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}

export default Input;
