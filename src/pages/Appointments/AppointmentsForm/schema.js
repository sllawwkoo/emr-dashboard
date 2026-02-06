import * as yup from "yup";

export const schema = yup
  .object({
    patientId: yup.string().required("Оберіть пацієнта"),
    doctorId: yup.string().required("Оберіть лікаря"),
    date: yup.string().required("Дата / час обовʼязкові"),
    reason: yup
      .string()
      .required("Причина обовʼязкова")
      .min(3, "Мінімум 3 символи"),
    status: yup
      .string()
      .required("Оберіть статус")
      .oneOf(["scheduled", "active", "completed"], "Невірний статус"),
  })
  .required();
