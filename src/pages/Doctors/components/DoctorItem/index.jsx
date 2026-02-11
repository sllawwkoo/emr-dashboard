import styles from "./DoctorItem.module.scss";

function DoctorItem({ doctor, onEdit, onDelete }) {
  const { id, fullName, specialty, email, phone, room, notes } = doctor ?? {};

  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => onDelete?.(doctor);

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{fullName ?? "—"}</h3>
          <p className={styles.specialty}>{specialty ?? "—"}</p>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{email || "—"}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Телефон</span>
            <span className={styles.value}>{phone || "—"}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Кабінет</span>
            <span className={styles.value}>{room || "—"}</span>
          </div>
        </div>

        <div className={styles.notesBlock}>
          <span className={styles.notesLabel}>Нотатки</span>
          <p className={notes ? styles.notesText : styles.notesEmpty}>
            {notes || "Немає нотаток"}
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={handleEdit}
          aria-label="Редагувати лікаря"
        >
          Редагувати
        </button>
        <button
          type="button"
          className={styles.actionBtnDanger}
          onClick={handleDelete}
          aria-label="Видалити лікаря"
        >
          Видалити
        </button>
      </div>
    </article>
  );
}

export default DoctorItem;  