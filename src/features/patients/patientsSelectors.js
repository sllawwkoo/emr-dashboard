import { createSelector } from "@reduxjs/toolkit";
import { patientsAdapter } from "./patientsAdapter";
import { api } from "@/api";

// Отримуємо slice стейту, де зберігаються пацієнти
export const selectPatientsResult = api.endpoints.getPatients.select({
	page: 1,
	limit: 1000,
});

// Отримуємо нормалізовані дані або порожній initial state
const selectPatientsData = createSelector(
	selectPatientsResult,
	(result) => result?.data ?? patientsAdapter.getInitialState(),
);

// Отримуємо готові селектори:
export const {
	selectAll: selectAllPatients, // масив пацієнтів
	selectById: selectPatientById, // (state, id) => patient
	selectEntities: selectPatientEntities, // об'єкт { id: patient }
	selectIds: selectPatientIds, // масив id
} = patientsAdapter.getSelectors((state) => selectPatientsData(state));
