import styles from "./SummaryCard.module.scss";

function SummaryCard({ title, value, accent = "primary" }) {
  return (
    <div className={`${styles.card} ${styles[`accent_${accent}`]}`}>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default SummaryCard;
