import { useState, useEffect } from "react";
import AuthEntry from "../AuthEntry";
import CreateActions from "../CreateActions";
import MainMenu from "../MainMenu";
import SidebarFooter from "../SidebarFooter";
import SidebarHeader from "../SidebarHeader";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from "./Sidebar.module.scss";
import { useMediaQuery } from "react-responsive";

function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);
  return isTouchDevice;
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 767.98px)` });
  const isTouchDevice = useTouchDevice();
  const effectiveCollapsed = isMobile ? true : collapsed;

  return (
    <aside
      className={`${styles.sidebar} ${effectiveCollapsed ? styles.collapsed : ""}`}
      aria-expanded={!effectiveCollapsed}
    >
      <SidebarHeader
        collapsed={effectiveCollapsed}
        isMobile={isMobile}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <div className={styles.scroll}>
        <MainMenu collapsed={effectiveCollapsed} isTouchDevice={isTouchDevice} />
        <CreateActions collapsed={effectiveCollapsed} isTouchDevice={isTouchDevice} />
      </div>
      <SidebarFooter collapsed={effectiveCollapsed}>
        <AuthEntry collapsed={effectiveCollapsed} isTouchDevice={isTouchDevice} />
        <ThemeSwitcher collapsed={effectiveCollapsed} />
      </SidebarFooter>
    </aside>
  );
}

export default Sidebar;
