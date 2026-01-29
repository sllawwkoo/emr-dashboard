import { LoginIcon } from "../Icons";
import SidebarAction from "../SidebarAction";
import styles from "./AuthEntry.module.scss";

function AuthEntry({ collapsed }) {
  return (
    <SidebarAction
      as="button"
      icon={LoginIcon}
      label="Увійти"
      collapsed={collapsed}
      onClick={() => { }}
      className={styles.entry}
    />
  );
}

export default AuthEntry;
