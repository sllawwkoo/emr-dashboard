import MainLayout from "@/layout/MainLayout";
import frontRoutes from "./frontRoutes";
import DashboardPage from "@/pages/DashboardPage";
import { PatientDetails, PatientsForm, PatientsPage } from "@/pages/Patients";
import { DoctorDetails, DoctorsForm, DoctorsPage } from "@/pages/Doctors";
import { AppointmentDetails, AppointmentsForm, AppointmentsPage } from "@/pages/Appointments";
import Page404 from "@/pages/Page404";


export const routes = [
	{
		path: frontRoutes.pages.dashboard,
		Component: MainLayout,
		children: [
			{
				index: true,
				Component: DashboardPage,
				meta: {
					labelForMainMenu: "Дашборд",
					// icon: "home-icon",
				},
			},
			{
				path: frontRoutes.pages.patients.base,
				children: [
					{
						index: true,
						Component: PatientsPage,
						meta: {
							labelForMainMenu: "Пацієнти",
							icon: "patient-icon",
						},
					},
					{
						path: frontRoutes.pages.patients.edit,
						Component: PatientsForm,
					},
					{
						path: frontRoutes.pages.patients.details,
						Component: PatientDetails,
					},
				],
			},
			{
				path: frontRoutes.pages.doctors.base,
				children: [
					{
						index: true,
						Component: DoctorsPage,
						meta: {
							labelForMainMenu: "Лікарі",
							icon: "doctor-icon",
						},
					},
					{
						path: frontRoutes.pages.doctors.edit,
						Component: DoctorsForm,
					},
					{
						path: frontRoutes.pages.doctors.details,
						Component: DoctorDetails,
					},
				],
			},
			{
				path: frontRoutes.pages.appointments.base,
				children: [
					{
						index: true,
						Component: AppointmentsPage,
						meta: {
							labelForMainMenu: "Прийоми",
							icon: "appointments-icon",
						},
					},
					{
						path: frontRoutes.pages.appointments.edit,
						Component: AppointmentsForm,
					},
					{
						path: frontRoutes.pages.appointments.details,
						Component: AppointmentDetails,
					},
				],
			},
		],
	},
	{
		path: "*",
		Component: Page404,
	},
];
