import { useMutation } from "@tanstack/react-query";
import constants from "api/constants";
import { showToast } from "components/atoms/ShowToast/showToast";
import queryKeys from "libs/react-query/queryKeys";
import { NotificationTypes } from "libs/utils";
import { createUser, forgotPassword, loginUser, resetPassword } from "services/auth";

const { errors } = constants;

export const useCreateUser = (data) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.createUser, data],
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      showToast("Your account has been created successfully. You can now log in.", NotificationTypes.SUCCESS);
    },
    onError: (err) => {
      const {
        response: {
          data: { code },
        },
      } = err;
      const errorMessageMap = {
        [errors.alreadyExists.code]: "Email already in use",
      };

      const errMsg = errorMessageMap[code] || "Failed to create your account. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { createUser: mutate, isPending };
};

export const useLoginUser = (data) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.loginUser, data],
    mutationFn: (data) => loginUser(data),
    onSuccess: () => {
      showToast("Login sucessful", NotificationTypes.SUCCESS);
    },
    onError: (err) => {
      const {
        response: {
          data: { code },
        },
      } = err;
      const errorMessageMap = {
        [errors.doesNotExist.code]: "Email does not exist",
        [errors.invalidDetails.code]: "Invalid email or password",
      };

      const errMsg = errorMessageMap[code] || "Failed to sign in. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { loginUser: mutate, isPending };
};

export const useForgotPassword = (data) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.forgotPassword, data],
    mutationFn: (data) => forgotPassword(data),
    onSuccess: () => {
      showToast("Reset successful. Please check your inbox and follow the instructions.", NotificationTypes.SUCCESS);
    },
    onError: (err) => {
      const {
        response: {
          data: { code },
        },
      } = err;

      const errorMessageMap = {
        [errors.doesNotExist.code]: "Email does not exist",
      };

      const errMsg = errorMessageMap[code] || "An error occurred while resetting your password. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { forgotPassword: mutate, isPending };
};

export const useResetPassword = (data) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.resetPassword, data],
    mutationFn: (data) => resetPassword(data),
    onSuccess: () => {
      showToast("Your password has been successfully reset.You can now log in with your new password.", NotificationTypes.SUCCESS);
    },
    onError: (err) => {
      const {
        response: {
          data: { code },
        },
      } = err;
      const errorMessageMap = {
        [errors.invalidDetails.code]: "Invalid email or password",
      };

      const errMsg = errorMessageMap[code] || "Failed to reset your password. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { resetPassword: mutate, isPending };
};
