import constants from "api/constants";

const { errors } = constants;

/**
 * The different constants/types used for managing component/app related properties
 */
export default {
  buttonVariants: {
    outline: "outline",
    success: "success",
    outlineSuccess: "outlineSuccess",
    icon: "icon",
    disabled: "disabled",
    primary: "primary",
    secondaryLemonYellow: "secondaryLemonYellow",
    text: "text",
  },
  routes: {
    home: "/",
    login: "/auth/login",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    dashboard: "/dashboard",
  },
  errors: {
    [errors.alreadyExists.code]: "Email already in use",
    [errors.doesNotExist.code]: "Email does not exist",
    [errors.invalidDetails.code]: "Invalid email or password",
    [errors.authFailed.code]: "Authentication failed",
  },
  localStorageKeys: {
    user: "travel-planner-user",
  },
};
