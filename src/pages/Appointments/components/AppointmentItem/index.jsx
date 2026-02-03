import styles from "./AppointmentItem.module.scss";
import { formatDateTime } from "../../utils/helpers";
import SelectStatus from "../SelectStatus";

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

  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => onDelete?.(appointment);

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
          <SelectStatus
            value={status}
            onChange={(newStatus) => onStatusChange?.(id, newStatus)}
          />
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
