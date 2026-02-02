import styles from "./AppointmentItem.module.scss";

const STATUS_LABELS = {
  scheduled: "Заплановано",
  active: "Активний",
  completed: "Завершено",
};

function formatDateTime(value) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${d}.${m}.${y} ${h}:${min}`;
}

function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? status ?? "—";
}

function AppointmentItem({
  appointment,
  patientName,
  doctorName,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const { id, date, reason, status } = appointment ?? {};
  const formattedDateTime = formatDateTime(date);
  const statusLabel = getStatusLabel(status);

  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => onDelete?.(appointment);
  const handleStart = () => onStatusChange?.(id, "active");
  const handleComplete = () => onStatusChange?.(id, "completed");

  const showStartButton = status === "scheduled";
  const showCompleteButton = status === "active";

  return (
    <div className={styles.row} role="row">
      <div className={styles.cellPatient}>
        <span className={styles.label}>Пацієнт</span>
        <span className={styles.value}>{patientName ?? "—"}</span>
      </div>
      <div className={styles.cellDoctor}>
        <span className={styles.label}>Лікар</span>
        <span className={styles.value}>{doctorName ?? "—"}</span>
      </div>
      <div className={styles.cellDateTime}>
        <span className={styles.label}>Дата / час</span>
        <span className={styles.value}>{formattedDateTime}</span>
      </div>
      <div className={styles.cellReason}>
        <span className={styles.label}>Причина</span>
        <span className={styles.value}>{reason ?? "—"}</span>
      </div>
      <div className={styles.cellStatus}>
        <span className={styles.label}>Статус</span>
        <div className={styles.statusBlock}>
          <span
            className={`${styles.badge} ${styles[`badge_${status}`]}`}
            data-status={status}
          >
            {statusLabel}
          </span>
          {showStartButton && (
            <button
              type="button"
              className={styles.statusBtn}
              onClick={handleStart}
              aria-label="Розпочати прийом"
            >
              Розпочати
            </button>
          )}
          {showCompleteButton && (
            <button
              type="button"
              className={styles.statusBtn}
              onClick={handleComplete}
              aria-label="Завершити прийом"
            >
              Завершити
            </button>
          )}
        </div>
      </div>
      <div className={styles.cellActions}>
        <span className={styles.label}>Дії</span>
        <div className={styles.actions}>
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
    </div>
  );
}

export default AppointmentItem;
