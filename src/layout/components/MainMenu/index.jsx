import { getItemsForMainMenu } from "@/layout/navigation/utils";
import { routes } from "@/routes/routes";
import styles from "./MainMenu.module.scss";
import { NavLink } from "react-router";
import SidebarAction from "../SidebarAction";

function MainMenu() {
const itemsForMainMenu = getItemsForMainMenu(routes, '')

	return (
		<nav className={styles.menu}>
			<ul className={styles.menu_list}>
				{itemsForMainMenu.map(({ path, label, icon }, index) => (
					<li
						key={index}
						className={styles.menu_item}
						>
						<SidebarAction 
							as={NavLink}
							to={path}
							icon={icon}
							label={label}
							collapsed={collapsed}
							isMobile={isMobile}
							className={({ isActive }) => (isActive ? styles.active : "")}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default MainMenu;