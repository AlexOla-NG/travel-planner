import { useMutation } from "@tanstack/react-query";
import { showToast } from "components/atoms/ShowToast/showToast";
import queryKeys from "hooks/queryKeys";
import { NotificationTypes } from "libs/utils";
import { createUser } from "services/user";

export const useCreateUser = (data) => {
  const { mutate, isPending } = useMutation({
    mutationKey: [queryKeys.createUser, data],
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      showToast("User created successfully", NotificationTypes.SUCCESS);
    },
    onError: (err) => {
      showToast("Error creating user", NotificationTypes.ERROR);
      console.error("Error creating user: ", err?.response?.data?.error) || err?.message;
    },
  });

  return { mutate, isPending };
};
