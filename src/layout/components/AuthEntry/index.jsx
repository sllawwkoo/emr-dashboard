import { LoginIcon } from "../Icons";
import SidebarAction from "../SidebarAction";
import styles from "./AuthEntry.module.scss";

function AuthEntry({ collapsed, isTouchDevice }) {
  return (
    <SidebarAction
      as="button"
      icon={LoginIcon}
      label="Увійти"
      collapsed={collapsed}
      isTouchDevice={isTouchDevice}
      onClick={() => { }}
      className={styles.entry}
    />
  );
}

export default AuthEntry;
