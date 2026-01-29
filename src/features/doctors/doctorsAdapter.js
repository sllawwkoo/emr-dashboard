// https://redux-toolkit.js.org/api/createEntityAdapter
import { createEntityAdapter } from "@reduxjs/toolkit";

export const doctorsAdapter = createEntityAdapter({
	selectId: (doctor) => doctor.id,
	sortComparer: (a, b) => a.fullName.localeCompare(b.fullName),
});
