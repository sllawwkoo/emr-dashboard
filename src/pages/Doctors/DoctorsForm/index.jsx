import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Loader from "@/components/Loader";
import frontRoutes from "@/routes/frontRoutes";
import {
  useGetDoctorsQuery,
  useAddNewDoctorMutation,
  useUpdateDoctorMutation,
} from "@/api";
import styles from "./DoctorsForm.module.scss";
import { schema } from "./validation";
import { doctorToFormValues, formatPhoneUA } from "../utils/helpers";
import { DOCTOR_FORM_FIELDS } from "../constants/formFields";

const COMPONENT_MAP = {
  input: Input,
  textarea: Textarea,
};

function DoctorsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data: doctorsData, isLoading: isLoadingDoctors } = useGetDoctorsQuery(
    undefined,
    { skip: !id }
  );

  const doctor = isEdit && doctorsData?.entities?.[id]
    ? doctorsData.entities[id]
    : null;

  const [addDoctor, { isLoading: isAdding }] = useAddNewDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();

  const isLoading = isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      specialty: "",
      email: "",
      phone: "",
      room: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit && doctor) {
      const values = doctorToFormValues(doctor);
      if (values) reset(values);
    }
  }, [isEdit, doctor, reset]);

  const onCancel = () => {
    navigate(frontRoutes.navigate.doctors.base);
  };

  const onSubmit = async (formValues) => {
    if (isEdit) {
      const result = await updateDoctor({ id, ...formValues });
      if (result.error) return;
    } else {
      const result = await addDoctor(formValues);
      if (result.error) return;
    }
    navigate(frontRoutes.navigate.doctors.base);
  };

  const pageTitle = isEdit ? "Редагувати лікаря" : "Створити лікаря";
  const submitLabel = isEdit ? "Зберегти зміни" : "Створити лікаря";

  if (isEdit && isLoadingDoctors) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isEdit && !isLoadingDoctors && id && !doctor) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.error}>
            Помилка завантаження даних лікаря. Лікар не знайдений.
          </div>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Повернутись
          </button>
        </div>
      </div>
    );
  }

  if (isEdit && !doctor) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.fields}>
            {DOCTOR_FORM_FIELDS.map((field) => {
              const Component = COMPONENT_MAP[field.component];
              const error = errors[field.name]?.message;

              if (!Component) return null;

              if (field.name === "phone") {
                return (
                  <Controller
                    key={field.name}
                    name={field.name}
                    control={control}
                    render={({ field: rhfField }) => (
                      <Component
                        {...rhfField}
                        label={`${field.label}${field.required ? " *" : ""}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={error}
                        onChange={(e) =>
                          rhfField.onChange(formatPhoneUA(e.target.value))
                        }
                      />
                    )}
                  />
                );
              }

              return (
                <Component
                  key={field.name}
                  label={`${field.label}${field.required ? " *" : ""}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  error={error}
                  rows={field.rows}
                  {...register(field.name)}
                />
              );
            })}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Відміна
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Збереження…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorsForm;
