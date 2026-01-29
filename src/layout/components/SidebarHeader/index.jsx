import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
import Logo from "../Logo";
import styles from "./SidebarHeader.module.scss";

function SidebarHeader({ collapsed, onToggle }) {
  return (
    <header
      className={`${styles.header} ${collapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.logoWrap}>
        <Logo />
      </div>
      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-label={collapsed ? "Розгорнути бокову панель" : "Згорнути бокову панель"}
      >
        {collapsed ? (
          <ArrowRightIcon size={20} className={styles.toggleIcon} />
        ) : (
          <ArrowLeftIcon size={20} className={styles.toggleIcon} />
        )}
      </button>
    </header>
  );
}

export default SidebarHeader;
