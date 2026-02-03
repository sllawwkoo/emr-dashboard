import { createSelector } from "@reduxjs/toolkit";
import { doctorsAdapter } from "./doctorsAdapter";
import { api } from "@/api";

// Отримуємо slice стейту, де зберігаються пацієнти
export const selectDoctorsResult = api.endpoints.getDoctors.select();

// Отримуємо нормалізовані дані або порожній initial state
const selectDoctorsData = createSelector(
	selectDoctorsResult,
	(result) => result?.data ?? doctorsAdapter.getInitialState(),
);

// Отримуємо готові селектори:
export const {
	selectAll: selectAllDoctors, // масив лікарів
	selectById: selectDoctorById, // (state, id) => doctor
	selectEntities: selectDoctorEntities, // об'єкт { id: doctor }
	selectIds: selectDoctorIds, // масив id
} = doctorsAdapter.getSelectors((state) => selectDoctorsData(state));
