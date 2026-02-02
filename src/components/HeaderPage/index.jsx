import styles from "./HeaderPage.module.scss";

function HeaderPage({ title, description, helperText }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <p className={styles.helperText}>{helperText}</p>
    </div>
  );
}

export default HeaderPage;

