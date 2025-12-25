export const ArrowLeftIcon = ({
	size = 24,
	color = "currentColor",
	...props
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			color={color}
			fill="none"
			{...props}
		>
			<path
				d="M4 6L4 18"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
			></path>
			<path
				d="M8.00012 12.0005L20.0001 12.0005"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M12 8C12 8 8.00001 10.946 8 12C7.99999 13.0541 12 16 12 16"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	);
};
