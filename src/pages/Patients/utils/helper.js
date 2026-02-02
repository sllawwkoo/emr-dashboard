import { formatBirthDateForInput } from "./date";

export function patientToFormValues(patient) {
  if (!patient) return null;
  return {
    fullName: patient.fullName ?? "",
    birthDate: formatBirthDateForInput(patient.birthDate),
    gender: patient.gender ?? "",
    phone: patient.phone ?? "",
    email: patient.email ?? "",
    address: patient.address ?? "",
    notes: patient.notes ?? "",
  };
}

export function formatPhoneUA(value = "") {
  const digits = value.replace(/\D/g, "");

  // +380XXXXXXXXX (12 цифр)
  let formatted = "+380";

  if (digits.length > 3) {
    formatted += " " + digits.slice(3, 5);
  }
  if (digits.length > 5) {
    formatted += " " + digits.slice(5, 8);
  }
  if (digits.length > 8) {
    formatted += " " + digits.slice(8, 10);
  }
  if (digits.length > 10) {
    formatted += " " + digits.slice(10, 12);
  }

  return formatted.trim();
}
