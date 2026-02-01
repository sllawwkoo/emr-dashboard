import PatientItem from "../PatientItem";
import styles from "./PatientsList.module.scss";

/**
 * PatientsList — презентаційний компонент списку пацієнтів.
 * Props: patients, onView(id), onEdit(id), onDelete(patient)
 */
function PatientsList({ patients = [], onView, onEdit, onDelete }) {
  if (patients.length === 0) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.empty}>Пацієнтів не знайдено</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {patients.map((patient) => (
          <PatientItem
            key={patient.id}
            patient={patient}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default PatientsList;
