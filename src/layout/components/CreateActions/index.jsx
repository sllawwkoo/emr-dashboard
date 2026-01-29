import {
  AddAppointmentIcon,
  AddDoctorIcon,
  AddPatientIcon,
} from "../Icons";
import frontRoutes from "@/routes/frontRoutes";
import SidebarAction from "../SidebarAction";
import styles from "./CreateActions.module.scss";

const ITEMS = [
  { to: frontRoutes.navigate.patients.create, icon: AddPatientIcon, label: "Створити пацієнта" },
  { to: frontRoutes.navigate.appointments.create, icon: AddAppointmentIcon, label: "Створити прийом" },
  { to: frontRoutes.navigate.doctors.create, icon: AddDoctorIcon, label: "Створити лікаря" },
];

function CreateActions({ collapsed }) {
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
              activeClassName={styles.active}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateActions;
