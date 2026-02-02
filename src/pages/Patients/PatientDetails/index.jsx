import { useParams, useNavigate } from "react-router";
import Loader from "@/components/Loader";
import { useGetPatientByIdQuery } from "@/api";
import styles from "./PatientDetails.module.scss";
import { formatBirthDate } from "../utils/date";
import { mapGender } from "../utils/gender";


function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: patient,
    isLoading,
    isError,
    error,
  } = useGetPatientByIdQuery(id, {
    skip: !id,
  });

  const fullName = patient?.fullName || "—";
  const birthDate = formatBirthDate(patient?.birthDate);
  const gender = mapGender(patient?.gender);
  const phone = patient?.phone || "—";
  const email = patient?.email || "—";
  const address = patient?.address || "—";
  const hasNotes =
    typeof patient?.notes === "string" && patient.notes.trim().length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.cardTitle}>
          Загальна інформація про пацієнта
        </h1>

        {isLoading && <Loader />}

        {isError && (
          <div className={styles.error}>
            Помилка завантаження даних пацієнта:{" "}
            {error?.message || "Невідома помилка"}
          </div>
        )}

        {!isLoading && !isError && patient && (
          <>
            <ul className={styles.fields} aria-label="Дані пацієнта">
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>ПІБ</span>
                <span className={styles.fieldValue}>{fullName}</span>
              </li>
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Дата народження</span>
                <span className={styles.fieldValue}>{birthDate}</span>
              </li>
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Стать</span>
                <span className={styles.fieldValue}>{gender}</span>
              </li>
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Телефон</span>
                <span className={styles.fieldValue}>{phone}</span>
              </li>
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Email</span>
                <span className={styles.fieldValue}>{email}</span>
              </li>
              <li className={styles.fieldRow}>
                <span className={styles.fieldLabel}>Адреса</span>
                <span className={styles.fieldValue}>{address}</span>
              </li>
            </ul>

            {hasNotes && (
              <div className={styles.notesBlock}>
                <span className={styles.notesLabel}>Додатково</span>
                <p className={styles.notes}>{patient.notes}</p>
              </div>
            )}

          </>
        )}

        <div className={styles.backWrap}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Повернутись назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
