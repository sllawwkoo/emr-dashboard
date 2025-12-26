export const SunIcon = ({ size = 20, color = "currentColor", ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<circle
			cx="12"
			cy="12"
			r="5"
			stroke={color}
			strokeWidth="1.5"
		/>
		<path
			d="M12 1v3M12 20v3M1 12h3M20 12h3"
			stroke={color}
			strokeWidth="1.5"
		/>
		<path
			d="M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M17.66 6.34l2.12-2.12M4.22 19.78l2.12-2.12"
			stroke={color}
			strokeWidth="1.5"
		/>
	</svg>
);
