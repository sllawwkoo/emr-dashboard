import { getItemsForMainMenu } from "@/layout/navigation/utils";
import { routes } from "@/routes/routes";
import styles from "./MainMenu.module.scss";
import { NavLink } from "react-router";

function MainMenu() {
const itemsForMainMenu = getItemsForMainMenu(routes, '')

	return ( 
		<nav className={styles.menu}>
			<ul className={styles.menu_list}>
				{itemsForMainMenu.map(({ path, label, icon }, index) => (
					<li key={index} className={styles.menu_item}>
						<NavLink to={path} className={styles.menu_link}>
							{icon({ size: 30, className: styles.menu__icon })}
							<span className={styles.menu_label}>{label}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	 );
}

export default MainMenu;