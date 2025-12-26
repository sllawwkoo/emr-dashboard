const joinPath = (base, path) =>
	[base, path].filter(Boolean).join("/").replace(/\/+/g, "/");


export const getItemsForMainMenu = (routes, basePath = "") =>
	routes.reduce((resList, route) => {
		const currentPath = route.index ? basePath : joinPath(basePath, route.path);

		if (route?.meta?.labelForMainMenu) {
			resList.push({
				path: currentPath,
				label: route.meta.labelForMainMenu,
				icon: route.meta.icon,
			});
		}

		if (route.children) {
			resList.push(...getItemsForMainMenu(route.children, currentPath));
		}

		return resList;
	}, []);