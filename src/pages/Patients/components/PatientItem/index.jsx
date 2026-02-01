import styles from "./PatientItem.module.scss";

/**
 * Форматує дату в DD.MM.YYYY (ISO → локальний вигляд).
 */
function formatBirthDate(value) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

/**
 * PatientItem — рядок списку пацієнтів.
 * Props: patient, onView(id), onEdit(id), onDelete(patient)
 */
function PatientItem({ patient, onView, onEdit, onDelete }) {
  const { id, fullName, birthDate, phone } = patient ?? {};
  const formattedDate = formatBirthDate(birthDate);

  const handleView = () => onView?.(id);
  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => onDelete?.(patient);

  return (
    <div className={styles.row} role="row">
      <div className={styles.info}>
        <div className={styles.name}>{fullName ?? "—"}</div>
        <div className={styles.meta}>
          <span>{formattedDate}</span>
          {phone != null && phone !== "" && (
            <>
              <span className={styles.sep}>·</span>
              <span>{phone}</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleView}
          aria-label="Переглянути"
        >
          Переглянути
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleEdit}
          aria-label="Редагувати"
        >
          Редагувати
        </button>
        <button
          type="button"
          className={styles.actionBtnDanger}
          onClick={handleDelete}
          aria-label="Видалити"
        >
          Видалити
        </button>
      </div>
    </div>
  );
}

export default PatientItem;
