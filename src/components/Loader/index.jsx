import { ThreeDot } from "react-loading-indicators";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.wrapper}>
      <ThreeDot
        variant="pulsate"
        size="medium"
        color="var(--bg-button-primary)"
      />
    </div>
  );
}

export default Loader;
