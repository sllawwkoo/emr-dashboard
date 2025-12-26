export const MoonIcon = ({ size = 20, color = "currentColor", ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<path
			d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
			stroke={color}
			strokeWidth="1.5"
		/>
	</svg>
);
