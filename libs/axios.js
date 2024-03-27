import axios from "axios";
import { showToast } from "components/atoms/ShowToast/showToast";

import { NotificationTypes } from "./utils";

const base = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

base.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    // If the user is unauthorized
    if (err.response.status === 401) {
      showToast("Unauthorized", NotificationTypes.ERROR);
    } else throw err;
  },
);

export default base;
