import styles from "./SidebarFooter.module.scss";

function SidebarFooter({ collapsed, children }) {
  return (
    <footer
      className={[styles.footer, collapsed && styles.collapsed].filter(Boolean).join(" ")}
    >
      {children}
    </footer>
  );
}

export default SidebarFooter;
