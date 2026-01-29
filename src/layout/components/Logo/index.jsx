import { Link, useLocation } from "react-router";
import ImageLogo from "@/assets/img/logo.png";
import frontRoutes from "@/routes/frontRoutes";
import styles from "./Logo.module.scss";

function Logo({ collapsed }) {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/";
  const wrapperClass = `${styles.wrapper}${collapsed ? ` ${styles.collapsed}` : ""}`;

  return isDashboardPage ? (
    <div className={wrapperClass}>
      <img src={ImageLogo} alt="Logo" />
    </div>
  ) : (
    <Link to={frontRoutes.navigate.dashboard} className={wrapperClass}>
      <img src={ImageLogo} alt="Logo" />
    </Link>
  );
}

export default Logo;