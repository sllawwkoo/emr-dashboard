import styles from "./SidebarFooter.module.scss";

function SidebarFooter({ collapsed, children }) {
  return <footer className={styles.footer}>{children}</footer>;
}

export default SidebarFooter;
