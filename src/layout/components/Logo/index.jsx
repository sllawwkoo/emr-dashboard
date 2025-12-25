import { Link, useLocation } from "react-router";
import ImageLogo from "@/assets/img/logo.png";
import frontRoutes from "@/routes/frontRoutes";
import styles from "./Logo.module.scss";

function Logo() {
	const location = useLocation();
	const isDashboardPage = location.pathname === "/";

	return isDashboardPage ? (
		<div className={styles.wrapper}>
			<img
				src={ImageLogo}
				alt="Logo"
			/>
		</div>
	) : (
		<Link
			to={frontRoutes.navigate.dashboard}
			className={styles.wrapper}
		>
			<img
				src={ImageLogo}
				alt="Logo"
			/>
		</Link>
	);
}

export default Logo;