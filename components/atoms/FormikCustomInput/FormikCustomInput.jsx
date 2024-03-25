/* eslint-disable react/prop-types */
import { useField } from "formik";
import { composeClasses, noOp } from "libs/utils";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Icon from "../Icon/icon";
import styles from "./FormikCustomInput.module.scss";

const FormikCustomInput = ({
  className = "",
  container = "",
  iconClass,
  disabled,
  icon,
  onClickIcon,
  inputClassName,
  placeholder,
  readOnly,
  required,
  iconPosition,
  type,
  ...props
}) => {
  const [field, meta] = useField(props);

  const inputRef = React.useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={composeClasses(styles.customInputWrapper, className)}>
        <div
          className={composeClasses(
            styles.customInputWrapper__InputWrapper,
            container,
            disabled ? styles.customInputWrapper__InputDisabled : styles.customInputWrapper__InputEnabled,
            meta.touched && !meta.error ? styles.customInputWrapper__InputCorrect : meta.touched && meta.error ? styles.customInputWrapper__InputError : "",
          )}
        >
          {icon && iconPosition === "start" && <Icon className={iconClass} name={icon} onClick={onClickIcon} />}
          <input
            aria-label={props.name}
            className={composeClasses(styles.customInputWrapper__InputWrapper__Input, inputClassName, disabled ? styles.customInputWrapper__InputDisabled : "")}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            required={required}
            tabIndex={0}
            type={type === "password" && showPassword ? "text" : type}
            {...field}
            {...props}
          />
          {icon && iconPosition === "end" && <Icon className={iconClass} name={icon} onClick={onClickIcon} />}
          {type === "password" && showPassword ? (
            <Icon className={styles.pointer} name="eyes" onClick={handleShowPassword} />
          ) : (
            type === "password" && !showPassword && <Icon className={styles.pointer} name="eye" onClick={handleShowPassword} />
          )}
        </div>
      </div>
      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </>
  );
};

export default memo(FormikCustomInput);

FormikCustomInput.defaultProps = {
  className: "",
  container: "",
  disabled: false,
  icon: "",
  iconClass: "",
  iconPosition: "start",
  inputClassName: "",
  onClickIcon: noOp,
  readOnly: false,
  required: false,
};

FormikCustomInput.propTypes = {
  className: PropTypes.string,
  container: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  iconPosition: PropTypes.string,
  inputClassName: PropTypes.string,
  onClickIcon: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
};
