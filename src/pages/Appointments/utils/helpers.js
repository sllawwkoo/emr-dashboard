// ID → fullName map (patients / doctors)
export function buildIdToNameMap(entitiesData, field = "fullName") {
  if (!entitiesData?.ids || !entitiesData?.entities) return {};
  const map = {};
  entitiesData.ids.forEach((id) => {
    const entity = entitiesData.entities[id];
    if (entity?.[field] != null) map[id] = entity[field];
  });
  return map;
}

// DateTime formatter
export function formatDateTime(value) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${d}.${m}.${y} ${h}:${min}`;
}


export function isoToDatetimeLocal(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function appointmentToFormValues(appointment) {
  if (!appointment) return null;
  return {
    patientId: String(appointment.patientId ?? ""),
    doctorId: String(appointment.doctorId ?? ""),
    date: isoToDatetimeLocal(appointment.date),
    reason: appointment.reason ?? "",
    status: appointment.status ?? "scheduled",
  };
}