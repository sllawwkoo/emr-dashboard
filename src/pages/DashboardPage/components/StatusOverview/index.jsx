import styles from "./StatusOverview.module.scss";

const STATUS_CONFIG = [
  {
    key: "scheduled",
    label: "Заплановано",
    variant: "warning",
  },
  {
    key: "active",
    label: "Активний",
    variant: "success",
  },
  {
    key: "completed",
    label: "Завершено",
    variant: "neutral",
  },
];

function StatusOverview({ scheduledCount = 0, activeCount = 0, completedCount = 0 }) {
  const total = scheduledCount + activeCount + completedCount;

  const items = STATUS_CONFIG.map(({ key, label, variant }) => {
    const count = key === "scheduled" ? scheduledCount : key === "active" ? activeCount : completedCount;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;

    return {
      key,
      label,
      variant,
      count,
      percent,
    };
  });

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.sectionTitle}>Статуси прийомів</h3>
      <div className={styles.bars}>
        {items.map(({ key, label, variant, count, percent }) => (
          <div key={key} className={styles.row}>
            <div className={styles.labelBlock}>
              <span className={styles.label}>{label}</span>
              <span className={styles.count}>
                {count} ({percent}%)
              </span>
            </div>
            <div className={styles.progress}>
              <div
                className={`${styles.progressFill} ${styles[`fill_${variant}`]}`}
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusOverview;
