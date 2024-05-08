import { useMutation } from "@tanstack/react-query";
import { showToast } from "components/atoms/ShowToast/showToast";
import constants from "components/constants";
import { useLocalStorage } from "hooks/local-storage";
import queryKeys from "libs/react-query/queryKeys";
import { NotificationTypes, getUrlQuery } from "libs/utils";
import { useRouter } from "next/router";
import { createUser, forgotPassword, loginUser, resetPassword } from "services/auth";

const { errors, localStorageKeys, routes } = constants;

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

      const errMsg = errors[code] || "Failed to create your account. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { createUser: mutate, isPending };
};

export const useLoginUser = (data) => {
  const router = useRouter();
  const { setItem } = useLocalStorage();
  const { dashboard } = routes;

  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.loginUser, data],
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      // redirect to the destination page after login
      const query = router.query;
      const { rdr } = query;

      delete query.rdr;

      const loginDestination = `${rdr}${getUrlQuery(query)}`;

      setItem(localStorageKeys.user, data);
      showToast("Login successful", NotificationTypes.SUCCESS);

      setTimeout(() => {
        router.push(rdr ? loginDestination : dashboard);
      }, 3000);
    },
    onError: (err) => {
      const {
        response: {
          data: { code },
        },
      } = err;

      const errMsg = errors[code] || "Failed to sign in. Please try again later or contact support if the issue persists.";

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

      const errMsg = errors[code] || "An error occurred while resetting your password. Please try again later or contact support if the issue persists.";

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

      const errMsg = errors[code] || "Failed to reset your password. Please try again later or contact support if the issue persists.";

      showToast(errMsg, NotificationTypes.ERROR);
    },
  });

  return { resetPassword: mutate, isPending };
};
