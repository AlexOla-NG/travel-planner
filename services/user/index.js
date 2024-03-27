import base from "libs/axios";

export const createUser = (data) => base.post(`/users`, data).then(({ data }) => data?.data);
