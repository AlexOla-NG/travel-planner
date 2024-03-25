import PropTypes from "prop-types";
import React from "react";

import styles from "./ErrorMessage.module.scss";

const ErrorMessage = ({ error }) => {
  return <p className={styles.errorMessageContainer}>{error}</p>;
};

ErrorMessage.defaultProps = {
  error: "",
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
