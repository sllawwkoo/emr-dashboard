import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Loader from "@/components/Loader";
import frontRoutes from "@/routes/frontRoutes";
import {
  useGetPatientByIdQuery,
  useAddNewPatientMutation,
  useUpdatePatientMutation,
} from "@/api";
import styles from "./PatientsForm.module.scss";
import { schema } from "./validation";
import { GENDER_OPTIONS } from "../utils/gender";
import { patientToFormValues, formatPhoneUA } from "../utils/helper";
import { PATIENT_FORM_FIELDS } from "../constants/formFields";


const COMPONENT_MAP = {
  input: Input,
  select: Select,
  textarea: Textarea,
};


function PatientsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    data: patient,
    isLoading: isLoadingPatient,
    isError: isErrorPatient,
  } = useGetPatientByIdQuery(id, { skip: !id });

  const [addPatient, { isLoading: isAdding }] = useAddNewPatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

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
      birthDate: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit && patient) {
      const values = patientToFormValues(patient);
      if (values) reset(values);
    }
  }, [isEdit, patient, reset]);

  const onCancel = () => {
    navigate(frontRoutes.navigate.patients.base);
  };

  const onSubmit = async (formValues) => {
    if (isEdit) {
      const result = await updatePatient({ id, ...formValues });
      if (result.error) return;
    } else {
      const result = await addPatient(formValues);
      if (result.error) return;
    }
    navigate(frontRoutes.navigate.patients.base);
  };

  const pageTitle = isEdit ? "Редагувати пацієнта" : "Створити пацієнта";
  const submitLabel = isEdit ? "Зберегти зміни" : "Додати пацієнта";

  if (isEdit && isLoadingPatient) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isEdit && isErrorPatient) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.error}>
            Помилка завантаження даних пацієнта. Пацієнт не знайдений.
          </div>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Повернутись
          </button>
        </div>
      </div>
    );
  }

  if (isEdit && !patient) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.fields}>
            {PATIENT_FORM_FIELDS.map((field) => {
              const Component = COMPONENT_MAP[field.component];
              const error = errors[field.name]?.message;

              if (!Component) return null;

              // Маска телефону → Controller
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

              // Звичайні поля (input / select / textarea)
              return (
                <Component
                  key={field.name}
                  label={`${field.label}${field.required ? " *" : ""}`}
                  type={field.type}
                  options={field.options}
                  placeholder={field.placeholder}
                  error={error}
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

export default PatientsForm;
