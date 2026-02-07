import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Loader from "@/components/Loader";
import frontRoutes from "@/routes/frontRoutes";
import {
  useGetAppointmentByIdQuery,
  useGetPatientsQuery,
  useGetDoctorsQuery,
  useAddNewAppointmentMutation,
  useUpdateAppointmentMutation,
} from "@/api";
import styles from "./AppointmentsForm.module.scss";
import { schema } from "./validation";
import { STATUS_OPTIONS } from "../utils/constants";
import { appointmentToFormValues } from "../utils/helpers";



function AppointmentsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data: appointment, isLoading: isLoadingAppointment, isError: isErrorAppointment } = useGetAppointmentByIdQuery(id, { skip: !id });
  const { data: patientsData } = useGetPatientsQuery({ page: 1, limit: 500 });
  const { data: doctorsData } = useGetDoctorsQuery();

  const [addAppointment, { isLoading: isAdding }] = useAddNewAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

  const isLoading = isAdding || isUpdating;

  const patientOptions = useMemo(() => {
    if (!patientsData?.ids || !patientsData?.entities) return [];
    return patientsData.ids.map((pid) => ({
      value: String(pid),
      label: patientsData.entities[pid]?.fullName ?? String(pid),
    }));
  }, [patientsData]);

  const doctorOptions = useMemo(() => {
    if (!doctorsData?.ids || !doctorsData?.entities) return [];
    return doctorsData.ids.map((did) => ({
      value: String(did),
      label: doctorsData.entities[did]?.fullName ?? String(did),
    }));
  }, [doctorsData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      date: "",
      reason: "",
      status: "scheduled",
    },
  });

  useEffect(() => {
    if (isEdit && appointment) {
      const values = appointmentToFormValues(appointment);
      if (values) reset(values);
    }
  }, [isEdit, appointment, reset]);

  const onCancel = () => {
    navigate(frontRoutes.navigate.appointments.base);
  };

  const onSubmit = async (formValues) => {
    const payload = {
      patientId: formValues.patientId,
      doctorId: formValues.doctorId,
      date: new Date(formValues.date).toISOString(),
      reason: formValues.reason.trim(),
      status: formValues.status,
    };
    if (isEdit) {
      const result = await updateAppointment({ id, ...payload });
      if (result.error) return;
    } else {
      const result = await addAppointment(payload);
      if (result.error) return;
    }
    navigate(frontRoutes.navigate.appointments.base);
  };

  const pageTitle = isEdit ? "Редагувати прийом" : "Створити прийом";
  const submitLabel = isEdit ? "Зберегти зміни" : "Створити прийом";

  if (isEdit && isLoadingAppointment) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isEdit && isErrorAppointment) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.error}>
            Помилка завантаження даних прийому. Прийом не знайдено.
          </div>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Повернутись
          </button>
        </div>
      </div>
    );
  }

  if (isEdit && !appointment) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{pageTitle}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.fields}>
            <Select
              name="patientId"
              label="Пацієнт *"
              options={patientOptions}
              error={errors.patientId?.message}
              {...register("patientId")}
            />
            <Select
              name="doctorId"
              label="Лікар *"
              options={doctorOptions}
              error={errors.doctorId?.message}
              {...register("doctorId")}
            />
            <Input
              name="date"
              label="Дата / час *"
              type="datetime-local"
              error={errors.date?.message}
              {...register("date")}
            />
            <Textarea
              name="reason"
              label="Причина *"
              placeholder="Причина візиту"
              rows={4}
              error={errors.reason?.message}
              {...register("reason")}
            />
            <Select
              name="status"
              label="Статус *"
              options={STATUS_OPTIONS}
              error={errors.status?.message}
              {...register("status")}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Відміна
            </button>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Збереження…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentsForm;
