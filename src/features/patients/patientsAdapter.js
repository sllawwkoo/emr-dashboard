import { createEntityAdapter } from "@reduxjs/toolkit";

export const patientsAdapter = createEntityAdapter({
	selectId: (patient) => patient.id,
	// Keep the "all IDs" array sorted based on patient titles
	sortComparer: (a, b) => a.fullName.localeCompare(b.fullName),
});
