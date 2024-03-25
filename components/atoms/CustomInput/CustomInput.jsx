/* eslint-disable react/prop-types */
import { composeClasses, noOp } from "libs/utils";
import React, { memo, useState } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Icon from "../Icon/icon";
import styles from "./CustomInput.module.scss";

const CustomInput = ({
  className = "",
  container = "",
  iconClass,
  disabled,
  enableDisabledStyle,
  error = "",
  icon,
  onClickIcon,
  name,
  inputClassName,
  onChange,
  placeholder,
  readOnly,
  required,
  iconPosition,
  type,
  value,
  min,
  ...props
}) => {
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
            disabled && enableDisabledStyle ? styles.customInputWrapper__InputDisabled : styles.customInputWrapper__InputEnabled,
            error ? styles.customInputWrapper__InputError : "",
          )}
        >
          {icon && iconPosition === "start" && <Icon className={iconClass} name={icon} onClick={onClickIcon} />}
          <input
            aria-label={name}
            className={composeClasses(
              styles.customInputWrapper__InputWrapper__Input,
              inputClassName,
              disabled && enableDisabledStyle ? styles.customInputWrapper__InputDisabled : "",
            )}
            disabled={disabled}
            min={min}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            required={required}
            tabIndex={0}
            type={type === "password" && showPassword ? "text" : type}
            value={value}
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
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default memo(CustomInput);

CustomInput.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  icon: "",
  readOnly: false,
  inputClassName: "",
  name: "",
  iconClass: "",
  container: "",
  required: false,
  iconPosition: "start",
  value: "",
  onChange: noOp,
  min: "",
  onClickIcon: undefined,
  enableDisabledStyle: true,
};
