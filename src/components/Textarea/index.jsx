import styles from "./Textarea.module.scss";

function Textarea({ label, error, disabled, rows = 4, ...rest }) {
	return (
		<div className={styles.textareaContainer}>
			{/* Лейбл над textarea */}
			{label && <label className={styles.textareaLabel}>{label}</label>}

			{/* Сам textarea */}
			<textarea
				{...rest}
				rows={rows}
				disabled={disabled}
				className={`${styles.textarea} 
					${error ? styles.error : ""} 
					${disabled ? styles.disabledInput : ""}
				`}
			/>

			{/* Повідомлення про помилку */}
			{error && <div className={styles.textareaErrorMessage}>{error}</div>}
		</div>
	);
}

export default Textarea;
