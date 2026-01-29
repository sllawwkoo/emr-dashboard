import { getItemsForMainMenu } from "@/layout/navigation/utils";
import { routes } from "@/routes/routes";
import SidebarAction from "../SidebarAction";
import styles from "./MainMenu.module.scss";

function MainMenu({ collapsed }) {
  const items = getItemsForMainMenu(routes, "");

  return (
    <nav className={styles.menu} aria-label="Головне меню">
      <ul className={styles.list}>
        {items.map(({ path, label, icon }, i) => (
          <li key={path || i} className={styles.item}>
            <SidebarAction
              to={path}
              end={path === "/"}
              icon={icon}
              label={label}
              collapsed={collapsed}
              activeClassName={styles.active}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainMenu;
