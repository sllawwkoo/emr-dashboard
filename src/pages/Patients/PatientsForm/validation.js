import * as yup from "yup";

 export const schema = yup
  .object({
    fullName: yup.string().required("ПІБ обовʼязкове").min(2, "Мінімум 2 символи"),
    birthDate: yup.string().required("Дата народження обовʼязкова"),
    gender: yup
      .string()
      .required("Оберіть стать")
      .oneOf(["male", "female"], "Невірне значення"),
    phone: yup.string().required("Телефон обовʼязковий"),phone: yup
    .string()
    .required("Телефон обовʼязковий")
    .matches(/^\+380 \d{2} \d{3} \d{2} \d{2}$/, "Невірний формат телефону"),
    email: yup.string().required("Email обовʼязковий").email("Невірний формат email"),
    address: yup.string().required("Адреса обовʼязкова"),
    notes: yup.string(),
  })
  .required();