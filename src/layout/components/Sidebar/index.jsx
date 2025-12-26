import AuthEntry from "../AuthEntry";
import CreateActions from "../CreateActions";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";
import Logo from "../Logo";
import MainMenu from "../MainMenu";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from "./Sidebar.module.scss";

function Sidebar() {
	return (
		<aside className={styles.sidebar}>
			<Logo />
			<MainMenu />
			<CreateActions />
			<ThemeSwitcher />
			<AuthEntry />
			<ArrowLeftIcon/>
			<ArrowRightIcon/>
		</aside>
	);
}

export default Sidebar;
