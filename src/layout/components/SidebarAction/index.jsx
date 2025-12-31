import styles from "./SidebarAction.module.scss";

function SidebarAction({
	icon: Icon,
	label,
	collapsed,
	isMobile,
	as: Component = "div",
	to,
	onClick,
	className,
}) {
	// базовий клас
	let rootClass = styles.action;

	// collapsed стан
	if (collapsed) {
		rootClass += ` ${styles.collapsed}`;
	}

	// зовнішній className (опціонально)
	if (className) {
		rootClass += ` ${className}`;
	}

	return (
		<Component
			to={to}
			onClick={onClick}
			className={rootClass}
		>
			{/* ICON */}
			{Icon && (
				<Icon
					size={24}
					className={styles.icon}
				/>
			)}

			{/* LABEL */}
			<span className={styles.label}>{label}</span>

			{/* TOOLTIP (desktop + collapsed) */}
			{!isMobile && collapsed && (
				<span className={styles.tooltip}>{label}</span>
			)}
		</Component>
	);
}

export default SidebarAction;
