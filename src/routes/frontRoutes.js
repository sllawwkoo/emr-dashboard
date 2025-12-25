const makeRoutes = (name) => ({
	base: `/${name}`,
	create: `/${name}/edit`,
	edit: (id) => `/${name}/edit/${id}`,
	details: (id) => `/${name}/details/${id}`,
});

const frontRoutes = {
	pages: {
		dashboard: "/",
		patients: {
			base: "patients",
			edit: "edit/:id?",
			details: "details/:id",
		},
		doctors: {
			base: "doctors",
			edit: "edit/:id?",
			details: "details/:id",
		},
		appointments: {
			base: "appointments",
			edit: "edit/:id?",
			details: "details/:id",
		},
	},

	navigate: {
		dashboard: "/",
		patients: makeRoutes("patients"),
		doctors: makeRoutes("doctors"),
		appointments: makeRoutes("appointments"),
	},
};

export default frontRoutes;
