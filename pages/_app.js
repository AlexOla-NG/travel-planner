/* eslint-disable react/prop-types */

import "@styles/global.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "libs/react-query";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress />
      <Component {...pageProps} />
      <ToastContainer
        autoClose={2000}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        theme="light"
      />
    </QueryClientProvider>
  );
}
