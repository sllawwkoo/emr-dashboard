import { useState } from "react";
import AuthEntry from "../AuthEntry";
import CreateActions from "../CreateActions";
import MainMenu from "../MainMenu";
import SidebarFooter from "../SidebarFooter";
import SidebarHeader from "../SidebarHeader";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
      aria-expanded={!collapsed}
    >
      <SidebarHeader
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <div className={styles.scroll}>
        <MainMenu collapsed={collapsed} />
        <CreateActions collapsed={collapsed} />
      </div>
      <SidebarFooter collapsed={collapsed}>
        <AuthEntry collapsed={collapsed} />
        <ThemeSwitcher />
      </SidebarFooter>
    </aside>
  );
}

export default Sidebar;
