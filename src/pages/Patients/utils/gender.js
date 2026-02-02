export const GENDER_OPTIONS = [
  { value: "male", label: "Чоловіча" },
  { value: "female", label: "Жіноча" },
];

export function mapGender(value) {
  if (!value) return "—";
  const normalized = String(value).toLowerCase();
  if (normalized === "male") return "Чоловіча";
  if (normalized === "female") return "Жіноча";
  return "—";
}