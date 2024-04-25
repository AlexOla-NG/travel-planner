import base from "libs/axios";

export const createUser = (data) =>
  base
    .post(`/auth/register`, data)
    .then(({ data }) => data?.data)
    .catch((error) => {
      console.error("Error creating user: ", error?.response?.data?.message) || error?.message;
      throw error;
    });

export const loginUser = (data) =>
  base
    .post(`/auth/login`, data)
    .then(({ data }) => data?.data)
    .catch((error) => {
      console.error("Error sigining in: ", error?.response?.data?.message) || error?.message;
      throw error;
    });

export const forgotPassword = (data) =>
  base
    .post(`/auth/forgot-password`, data)
    .then(({ data }) => data?.data)
    .catch((error) => {
      console.error("Error resetting password: ", error?.response?.data?.message) || error?.message;
      throw error;
    });

export const resetPassword = (data) =>
  base
    .post(`/auth/reset-password`, data)
    .then(({ data }) => data?.data)
    .catch((error) => {
      console.error("Error resetting password: ", error?.response?.data?.message) || error?.message;
      throw error;
    });
