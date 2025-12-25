import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import styles from "./MainLayout.module.scss";

function MainLayout() {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
