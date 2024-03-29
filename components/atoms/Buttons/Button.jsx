import constants from "components/constants";
import { composeClasses, omit } from "libs/utils";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { ScaleLoader } from "react-spinners";

import styles from "./button.module.scss";

const { buttonVariants } = constants;
const propsToOmit = ["variants", "className", "wrapperClassName", "link", "loading"];

/**
 * Renders the actual content of the Button
 * @param {Object} children Render Data
 * @param {boolean} loading Loading state
 * @return {React.Component} Button component
 */
const renderContent = (children, loading) => <div>{loading ? <ScaleLoader /> : children}</div>;

/**
 * @param {Object} props Object props
 * @returns {React.Component} Button component
 */
const Button = (props) => {
  const { children, className: buttonClass, disabled, loading, variants, link, wrapperClassName } = props;

  // compose variant classnames
  const variantClassName = Array.isArray(variants)
    ? variants.filter((variant) => !!variant).reduce((className, variant) => `${className} ${styles[variant] || ""}`, "")
    : `${variants ? styles[variants] : ""}`;

  const filteredProps = omit(props, propsToOmit);

  const loadingClass = loading ? styles.loading : "";
  const className = composeClasses(styles.buttonWrapper, variantClassName, wrapperClassName, loadingClass);

  return (
    <div className={className}>
      {link ? (
        <Link className={composeClasses(styles.button, buttonClass)} {...filteredProps} href={link}>
          {renderContent(children, loading)}
        </Link>
      ) : (
        <button className={composeClasses(styles.button, buttonClass, disabled && styles.disabled)} {...filteredProps}>
          {renderContent(children, loading)}
        </button>
      )}
    </div>
  );
};

Button.defaultProps = {
  className: "",
  wrapperClassName: "",
  loading: false,
  link: "",
  variants: null,
  disabled: false,
};

const buttonTypes = PropTypes.oneOf(Object.values(buttonVariants));

Button.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  link: PropTypes.string,
  variants: PropTypes.oneOfType([buttonTypes, PropTypes.arrayOf(PropTypes.string)]),
};

export default Button;
