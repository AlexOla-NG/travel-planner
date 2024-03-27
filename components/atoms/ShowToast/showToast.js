import { NotificationTypes } from "libs/utils";
import { toast } from "react-toastify";

export const showToast = (message, type) => {
  switch (type) {
    case NotificationTypes.SUCCESS:
      toast.success(message);
      break;
    case NotificationTypes.ERROR:
      toast.error(message);
      break;
    case NotificationTypes.INFO:
      toast.info(message);
      break;
    case NotificationTypes.WARN:
      toast.warn(message);
      break;
    default:
      toast(message);
      break;
  }
};
