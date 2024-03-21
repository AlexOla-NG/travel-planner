import PropTypes from "prop-types";
import React from "react";

/**
 * Icon component to get and render app icons
 * @param {Object} props Component properties
 * @return {React.Component} Icon component
 */
const Icon = (props) => {
  if (props.name === "") {
    return null;
  }

  try {
    const { name, className, ...otherProps } = props;
    const Image = require(`./stock/${name}`).default;

    if (Image) {
      return <Image aria-label={name} className={`icon ${className}`} {...otherProps} />;
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Icon not found", error);
    return null;
  }
};

Icon.defaultProps = {
  className: "",
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
