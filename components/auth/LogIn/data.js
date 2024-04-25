export const fieldValues = [
  {
    id: crypto.randomUUID(),
    title: "email address",
    name: "email",
    type: "text",
    placeholder: "Enter your email address",
  },
  {
    id: crypto.randomUUID(),
    title: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

export const initialState = {
  email: "",
  password: "",
};
