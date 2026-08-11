import PropTypes from "prop-types";
import styles from "./Button.module.css";

const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};

const SIZE_CLASS = {
  md: "",
  sm: styles.small,
};

const Button = ({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...rest
}) => {
  const variantClass = VARIANT_CLASS[variant] || styles.primary;
  const sizeClass = SIZE_CLASS[size] || "";
  const combinedClassName = [styles.button, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={combinedClassName} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["md", "sm"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;