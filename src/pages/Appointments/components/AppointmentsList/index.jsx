import { useMemo } from "react";
import AppointmentItem from "../AppointmentItem";
import { useGetPatientsQuery, useGetDoctorsQuery } from "@/api";
import styles from "./AppointmentsList.module.scss";
import { buildIdToNameMap } from "../../utils/helpers";


function AppointmentsList({
  appointments = [],
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const { data: patientsData } = useGetPatientsQuery({ page: 1, limit: 500 });
  const { data: doctorsData } = useGetDoctorsQuery();

  const patientNameMap = useMemo(
    () => buildIdToNameMap(patientsData),
    [patientsData]
  );
  const doctorNameMap = useMemo(
    () => buildIdToNameMap(doctorsData),
    [doctorsData]
  );

  if (appointments.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} role="row">
        <div className={styles.cellPatient}>Пацієнт</div>
        <div className={styles.cellDoctor}>Лікар</div>
        <div className={styles.cellDateTime}>Дата / час</div>
        <div className={styles.cellReason}>Причина</div>
        <div className={styles.cellStatus}>Статус</div>
        <div className={styles.cellActions}>Дії</div>
      </div>
      <div className={styles.list}>
        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            appointment={appointment}
            patientName={patientNameMap?.[appointment.patientId] || "—"}
            doctorName={doctorNameMap?.[appointment.doctorId] || "—"}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default AppointmentsList;
