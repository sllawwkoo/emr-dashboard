import { NavLink } from "react-router";
import styles from "./SidebarAction.module.scss";

function SidebarAction({
  icon: Icon,
  label,
  collapsed,
  isMobile,
  as: Component,
  to,
  end,
  onClick,
  className,
  activeClassName,
}) {
  let rootClass = styles.action;
  if (collapsed) rootClass += ` ${styles.collapsed}`;
  if (typeof className === "string") rootClass += ` ${className}`;

  const Wrapper = to ? NavLink : Component ?? "button";

  const computedClassName =
    to && activeClassName
      ? ({ isActive }) =>
        `${rootClass}${isActive ? ` ${activeClassName}` : ""}`.trim()
      : rootClass;

  const linkProps = to ? { to, ...(end && { end }) } : {};
  return (
    <Wrapper
      {...linkProps}
      onClick={onClick}
      className={computedClassName}
      type={!to && Wrapper === "button" ? "button" : undefined}
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
    </Wrapper>
  );
}

export default SidebarAction;
