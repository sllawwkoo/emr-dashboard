import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "./apiRoutes";
import { patientsAdapter } from "@/features/patients/patientsAdapter";
import { doctorsAdapter } from "@/features/doctors/doctorsAdapter";

const API_BASE_URL = "https://emr-dashboard-backend.onrender.com";
const API_LOCAL_URL = "http://localhost:3000/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL || API_LOCAL_URL,
  }),
  tagTypes: ["Patients", "Appointments", "Doctors"],
  endpoints: (builder) => ({
    //===== ПАЦІЄНТИ =====//
    // Отримання пацієнтів
    getPatients: builder.query({
      query: ({ page = 1, limit = 5 } = {}) =>
        apiRoutes.patients.getPaginated(page, limit),
      // перетворює масив на нормалізований state
      transformResponse: (response) => ({
        ...patientsAdapter.setAll(
          patientsAdapter.getInitialState(),
          response.data,
        ),
        meta: {
          totalPages: response.totalPages,
          page: response.page,
          limit: response.limit,
        },
      }),
      providesTags: ["Patients"],
    }),
    // Отримання пацієнта по id
    getPatientById: builder.query({
      query: (id) => apiRoutes.patients.getById(id),
      providesTags: (result, error, id) => [{ type: "Patients", id }],
    }),
    // Отримання відфільтрованих по імені пацієнтів
    getFilteredByPatientName: builder.query({
      query: (name) => apiRoutes.patients.filterByName(name),
      providesTags: ["Patients"],
    }),
    // Оновлення пацієнта після редагування
    updatePatient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: apiRoutes.patients.update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        "Patients",
        { type: "Patients", id },
      ],
    }),
    // Додавання нового пацієнта
    addNewPatient: builder.mutation({
      query: (data) => ({
        url: apiRoutes.patients.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Patients"],
    }),
    // Видалення пацієнта по id
    deletePatients: builder.mutation({
      query: (id) => ({
        url: apiRoutes.patients.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Patients",
        { type: "Patients", id },
      ],
    }),

    //===== ПРИЙОМИ =====//
    // Отримання всіх прийомів
    getAllAppointments: builder.query({
      query: ({ page = 1, limit = 5 } = {}) =>
        apiRoutes.appointments.getPaginated(page, limit),
      transformResponse: (response) => ({
        items: response.data,
        meta: {
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        },
      }),
      providesTags: ["Appointments"],
    }),
    // Фільтрування прийомів по імені пацієнта
    getFilteredAppointmentsByPatientName: builder.query({
      query: (name) => apiRoutes.appointments.filterByPatientName(name),
      providesTags: ["Appointments"],
    }),
    // Фільтрування прийомів по даті
    getFilteredAppointmentsByDate: builder.query({
      query: (date) => apiRoutes.appointments.filterByDate(date),
      providesTags: ["Appointments"],
    }),
    // Видалення прийому по id
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: apiRoutes.appointments.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Appointments",
        { type: "Appointments", id },
      ],
    }),
    // Отримання прийому по id
    getAppointmentById: builder.query({
      query: (id) => apiRoutes.appointments.getById(id),
      providesTags: (result, error, id) => [{ type: "Appointments", id }],
    }),
    // Оновлення прийому після редагування
    updateAppointment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: apiRoutes.appointments.update(id),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        "Appointments",
        { type: "Appointments", id },
      ],
    }),
    // Додавання нового прийому
    addNewAppointment: builder.mutation({
      query: (data) => ({
        url: apiRoutes.appointments.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),

    //===== ЛІКАРІ =====//
    // Отримання лікарів
    getDoctors: builder.query({
      query: () => apiRoutes.doctors.getAll,
      transformResponse: (response) =>
        doctorsAdapter.setAll(doctorsAdapter.getInitialState(), response),
      providesTags: (result) =>
        result?.ids
          ? [
            { type: "Doctors", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Doctors", id })),
          ]
          : [{ type: "Doctors", id: "LIST" }],
    }),

    // Оновлення лікаря після редагування
    updateDoctor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: apiRoutes.doctors.update(id),
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, id) => ['Doctors', { type: 'Doctors', id }]
    }),
    // Видалення лікаря по id
    deleteDoctors: builder.mutation({
      query: (id) => ({
        url: apiRoutes.doctors.delete(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Doctors",
        { type: "Doctors", id },
      ],
    }),

    // Додавання нового лікаря
    addNewDoctor: builder.mutation({
      query: (data) => ({
        url: apiRoutes.doctors.create,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  // Пацієнти
  useGetPatientsQuery,
  useGetFilteredByPatientNameQuery,
  useDeletePatientsMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
  useAddNewPatientMutation,
  // Прийоми
  useGetAllAppointmentsQuery,
  useAddNewAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetFilteredAppointmentsByDateQuery,
  useGetFilteredAppointmentsByPatientNameQuery,
  useUpdateAppointmentMutation,
  // Лікарі
  useGetDoctorsQuery,
  useDeleteDoctorsMutation,
  useAddNewDoctorMutation,
  useUpdateDoctorMutation,
} = api;
