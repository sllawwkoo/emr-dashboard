import { useMemo } from "react";
import {
  useGetPatientsQuery,
  useGetDoctorsQuery,
  useGetAllAppointmentsQuery,
} from "@/api";
import { buildIdToNameMap, formatDateTime } from "@/pages/Appointments/utils/helpers";
import styles from "./RecentCompleted.module.scss";

const APPOINTMENTS_LIMIT = 500;
const PATIENTS_LIMIT = 500;
const COMPLETED_LIMIT = 3;

function RecentCompleted() {
  const { data: patientsData } = useGetPatientsQuery({
    page: 1,
    limit: PATIENTS_LIMIT,
  });
  const { data: doctorsData } = useGetDoctorsQuery();
  const { data: appointmentsData } = useGetAllAppointmentsQuery({
    page: 1,
    limit: APPOINTMENTS_LIMIT,
  });

  const { list, patientNames, doctorNames } = useMemo(() => {
    const items = appointmentsData?.items ?? [];

    const completed = [...items]
      .filter((apt) => apt.status === "completed" && apt.date)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, COMPLETED_LIMIT);

    const patientNames = buildIdToNameMap(patientsData);
    const doctorNames = buildIdToNameMap(doctorsData);

    return { list: completed, patientNames, doctorNames };
  }, [appointmentsData, patientsData, doctorsData]);

  if (list.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.sectionTitle}>Останні завершені прийоми</h3>
        <p className={styles.empty}>Немає завершених прийомів</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.sectionTitle}>Останні завершені прийоми</h3>
      <ul className={styles.list}>
        {list.map((apt) => (
          <li key={apt.id} className={styles.item}>
            <div className={styles.namesRow}>
              <span className={styles.patient}>
                {patientNames[apt.patientId] ?? "—"}
              </span>
              <span className={styles.doctor}>
                {doctorNames[apt.doctorId] ?? "—"}
              </span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.date}>{formatDateTime(apt.date)}</span>
              <span className={styles.badge}>Завершено</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentCompleted;

