import * as yup from "yup";

export const schema = yup
  .object({
    fullName: yup
      .string()
      .required("ПІБ обовʼязкове")
      .min(2, "Мінімум 2 символи"),
    specialty: yup.string().required("Спеціалізація обовʼязкова"),
    email: yup
      .string()
      .required("Email обовʼязковий")
      .email("Невірний формат email"),
    phone: yup
      .string()
      .required("Телефон обовʼязковий")
      .matches(
        /^\+380 \d{2} \d{3} \d{2} \d{2}$/,
        "Невірний формат телефону"
      ),
    room: yup.string().required("Кабінет обовʼязковий"),
    notes: yup.string(),
  })
  .required();
