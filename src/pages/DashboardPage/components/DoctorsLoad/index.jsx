import { useMemo } from "react";
import { useGetDoctorsQuery, useGetAllAppointmentsQuery } from "@/api";
import styles from "./DoctorsLoad.module.scss";

const APPOINTMENTS_LIMIT = 500;

function DoctorsLoad() {
  const { data: doctorsData } = useGetDoctorsQuery();
  const { data: appointmentsData } = useGetAllAppointmentsQuery({
    page: 1,
    limit: APPOINTMENTS_LIMIT,
  });

  const doctorLoad = useMemo(() => {
    const doctorIds = doctorsData?.ids ?? [];
    const doctorEntities = doctorsData?.entities ?? {};
    const items = appointmentsData?.items ?? [];

    if (!doctorIds.length) return { list: [], maxCount: 0 };

    const countsByDoctorId = {};

    doctorIds.forEach((id) => {
      countsByDoctorId[String(id)] = 0;
    });

    items.forEach((appointment) => {
      if (appointment?.doctorId == null) return;
      const doctorIdKey = String(appointment.doctorId);
      if (countsByDoctorId[doctorIdKey] != null) {
        countsByDoctorId[doctorIdKey] += 1;
      }
    });

    const list = doctorIds
      .map((id) => {
        const doctor = doctorEntities[id];
        const key = String(id);
        return {
          id,
          fullName: doctor?.fullName ?? "—",
          count: countsByDoctorId[key] ?? 0,
        };
      })
      .sort((a, b) => b.count - a.count);

    const maxCount = list[0]?.count ?? 0;

    return { list, maxCount };
  }, [doctorsData, appointmentsData]);

  const { list, maxCount } = doctorLoad;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.sectionTitle}>Навантаження лікарів</h3>

      {list.length === 0 ? (
        <p className={styles.empty}>Лікарів не знайдено</p>
      ) : (
        <ul className={styles.list}>
          {list.map((doctor) => (
            <li key={doctor.id} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.name}>{doctor.fullName}</span>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width:
                        maxCount > 0
                          ? `${(doctor.count / maxCount) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span className={styles.count}>{doctor.count}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorsLoad;

