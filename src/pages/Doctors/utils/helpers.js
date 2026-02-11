import { formatPhoneUA as formatPhoneFromPatients } from "@/pages/Patients/utils/helper";

export function doctorToFormValues(doctor) {
  if (!doctor) return null;
  return {
    fullName: doctor.fullName ?? "",
    specialty: doctor.specialty ?? "",
    email: doctor.email ?? "",
    phone: doctor.phone ?? "",
    room: doctor.room ?? "",
    notes: doctor.notes ?? "",
  };
}

export { formatPhoneFromPatients as formatPhoneUA };
