import { QueryClient } from "@tanstack/react-query";
import { showToast } from "components/atoms/ShowToast/showToast";

import { NotificationTypes } from "../utils";

/**
 * Handles errors and displays an error notification.
 *
 * @param {Error|string} error - The error object or error message.
 * @throws {TypeError} If the provided error is not an instance of Error or a string.
 */
function errorHandler(error) {
  /**
   * The error message to be displayed.
   * @type {string}
   */
  const errorMsg = error instanceof Error ? error.message : "error connecting to server";

  // Display an error notification using the showToast function.
  showToast(errorMsg, NotificationTypes.ERROR);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: errorHandler,
      // staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
