import { useMemo } from "react";
import HeaderPage from "@/components/HeaderPage";
import Loader from "@/components/Loader";
import {
  useGetPatientsQuery,
  useGetDoctorsQuery,
  useGetAllAppointmentsQuery,
} from "@/api";
import { buildIdToNameMap } from "@/pages/Appointments/utils/helpers";
import { pageHeaders } from "@/utils/pageHeaders.config";
import SummaryCard from "./components/SummaryCard";
import StatusOverview from "./components/StatusOverview";
import UpcomingList from "./components/UpcomingList";
import styles from "./DashboardPage.module.scss";

const APPOINTMENTS_LIMIT = 500;
const PATIENTS_LIMIT = 500;
const UPCOMING_COUNT = 5;

function DashboardPage() {
  const { data: patientsData, isLoading: isLoadingPatients } =
    useGetPatientsQuery({ page: 1, limit: PATIENTS_LIMIT });

  const { data: doctorsData, isLoading: isLoadingDoctors } =
    useGetDoctorsQuery();

  const { data: appointmentsData, isLoading: isLoadingAppointments } =
    useGetAllAppointmentsQuery({ page: 1, limit: APPOINTMENTS_LIMIT });

  const isLoading =
    isLoadingPatients || isLoadingDoctors || isLoadingAppointments;

  const {
    totalPatients,
    totalDoctors,
    totalAppointments,
    scheduledCount,
    activeCount,
    completedCount,
    upcomingAppointments,
    patientNames,
    doctorNames,
  } = useMemo(() => {
    const patients = patientsData?.ids ?? [];
    const doctors = doctorsData?.ids ?? [];
    const items = appointmentsData?.items ?? [];
    const meta = appointmentsData?.meta ?? {};

    const totalPatients = patients.length;
    const totalDoctors = doctors.length;
    const totalAppointments = meta.total ?? items.length;

    const scheduledCount = items.filter((a) => a.status === "scheduled").length;
    const activeCount = items.filter((a) => a.status === "active").length;
    const completedCount = items.filter((a) => a.status === "completed").length;

    const now = new Date().getTime();
    const sorted = [...items]
      .filter((a) => a.date && new Date(a.date).getTime() >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const upcomingAppointments = sorted.slice(0, UPCOMING_COUNT);

    const patientNames = buildIdToNameMap(patientsData);
    const doctorNames = buildIdToNameMap(doctorsData);

    return {
      totalPatients,
      totalDoctors,
      totalAppointments,
      scheduledCount,
      activeCount,
      completedCount,
      upcomingAppointments,
      patientNames,
      doctorNames,
    };
  }, [patientsData, doctorsData, appointmentsData]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <HeaderPage
          title={pageHeaders.dashboard.title}
          description={pageHeaders.dashboard.description}
          helperText={pageHeaders.dashboard.helperText}
        />
        <div className={styles.content}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <HeaderPage
        title={pageHeaders.dashboard.title}
        description={pageHeaders.dashboard.description}
        helperText={pageHeaders.dashboard.helperText}
      />

      <div className={styles.content}>
        <section className={styles.cards}>
          <SummaryCard
            title="Пацієнти"
            value={totalPatients}
            accent="primary"
          />
          <SummaryCard
            title="Лікарі"
            value={totalDoctors}
            accent="accent"
          />
          <SummaryCard
            title="Прийоми"
            value={totalAppointments}
            accent="success"
          />
        </section>

        <section className={styles.grid}>
          <StatusOverview
            scheduledCount={scheduledCount}
            activeCount={activeCount}
            completedCount={completedCount}
          />
          <UpcomingList
            appointments={upcomingAppointments}
            patientNames={patientNames}
            doctorNames={doctorNames}
          />
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
