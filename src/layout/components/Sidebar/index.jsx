import {
	AddAppointmentIcon,
	AddDoctorIcon,
	AddPatientIcon,
	AppointmentsIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	DashboardIcon,
	DoctorsIcon,
	LoginIcon,
	PatientsIcon,
} from "../Icons";
import styles from "./Sidebar.module.scss";

function Sidebar() {
	return (
		<div>
			<div>Sidebar</div>
			<p
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<DashboardIcon size={24} />
				<PatientsIcon size={24} />
				<AppointmentsIcon size={24} />
				<DoctorsIcon size={24} />
				<AddPatientIcon size={24} />
				<AddAppointmentIcon size={24} />
				<AddDoctorIcon size={24} />
				<LoginIcon size={24} />
				<ArrowLeftIcon size={24} />
				<ArrowRightIcon size={24} />
			</p>
		</div>
	);
}

export default Sidebar;
