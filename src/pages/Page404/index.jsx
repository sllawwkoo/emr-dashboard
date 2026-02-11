import { useNavigate } from "react-router";
import frontRoutes from "@/routes/frontRoutes";
import styles from "./Page404.module.scss";

function Page404() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(frontRoutes.navigate.dashboard);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.code}>404</div>

        <h1 className={styles.title}>Сторінку не знайдено</h1>

        <p className={styles.description}>
          Можливо, ви перейшли за застарілим посиланням або ввели неправильну адресу.
        </p>

        <button
          type="button"
          className={styles.button}
          onClick={handleBack}
        >
          Повернутись на дашборд
        </button>
      </div>
    </div>
  );
}

export default Page404;
