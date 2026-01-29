import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
import Logo from "../Logo";
import styles from "./SidebarHeader.module.scss";

function SidebarHeader({ collapsed, isMobile, onToggle }) {
  return (
    <header
      className={`${styles.header} ${collapsed ? styles.collapsed : ""} ${isMobile ? styles.mobile : ""}`}
    >
      <div className={styles.logoWrap}>
        <Logo collapsed={collapsed} />
      </div>
      {!isMobile && (
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
      )}
    </header>
  );
}

export default SidebarHeader;
