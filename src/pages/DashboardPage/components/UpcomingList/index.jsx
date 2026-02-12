import styles from "./UpcomingList.module.scss";
import { formatDateTime } from "@/pages/Appointments/utils/helpers";
import { STATUS_LABELS } from "@/pages/Appointments/utils/constants";

function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? status;
  return (
    <span className={`${styles.badge} ${status ? styles[`badge_${status}`] : ""}`}>
      {label}
    </span>
  );
}

function UpcomingList({ appointments = [], patientNames = {}, doctorNames = {} }) {
  if (appointments.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.sectionTitle}>Найближчі прийоми</h3>
        <p className={styles.empty}>Немає майбутніх прийомів</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.sectionTitle}>Найближчі прийоми</h3>
      <ul className={styles.list}>
        {appointments.map((apt) => (
          <li key={apt.id} className={styles.item}>
            <div className={styles.row}>
              <div className={styles.cell}>
                <span className={styles.label}>Пацієнт</span>
                <span className={styles.value}>
                  {patientNames[apt.patientId] ?? "—"}
                </span>
              </div>
              <div className={styles.cell}>
                <span className={styles.label}>Лікар</span>
                <span className={styles.value}>
                  {doctorNames[apt.doctorId] ?? "—"}
                </span>
              </div>
              <div className={styles.cell}>
                <span className={styles.label}>Дата / час</span>
                <span className={styles.value}>{formatDateTime(apt.date)}</span>
              </div>
              <div className={styles.cell}>
                <StatusBadge status={apt.status} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingList;
