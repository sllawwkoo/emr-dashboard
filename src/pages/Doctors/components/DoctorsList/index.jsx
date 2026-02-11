import DoctorItem from "../DoctorItem";
import styles from "./DoctorsList.module.scss";

function DoctorsList({ doctors = [], onEdit, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {doctors.map((doctor) => (
          <DoctorItem
            key={doctor.id}
            doctor={doctor}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorsList; 