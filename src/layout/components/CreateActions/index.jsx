import {
  AddAppointmentIcon,
  AddDoctorIcon,
  AddPatientIcon,
} from "../Icons";
import frontRoutes from "@/routes/frontRoutes";
import SidebarAction from "../SidebarAction";
import styles from "./CreateActions.module.scss";

const ITEMS = [
  { to: frontRoutes.navigate.patients.create, icon: AddPatientIcon, label: "Новий пацієнт" },
  { to: frontRoutes.navigate.appointments.create, icon: AddAppointmentIcon, label: "Запис на прийом" },
  { to: frontRoutes.navigate.doctors.create, icon: AddDoctorIcon, label: "Новий лікар" },
];

function CreateActions({ collapsed, isTouchDevice }) {
  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        {ITEMS.map(({ to, icon, label }) => (
          <li key={to} className={styles.item}>
            <SidebarAction
              to={to}
              end
              icon={icon}
              label={label}
              collapsed={collapsed}
              isTouchDevice={isTouchDevice}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateActions;
