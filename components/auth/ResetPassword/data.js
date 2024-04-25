export const fieldValues = [
  {
    id: crypto.randomUUID(),
    title: "new password",
    name: "newPassword",
    type: "password",
    placeholder: "Enter a new password",
  },
  {
    id: crypto.randomUUID(),
    title: "confirm password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm your password",
  },
];

export const initialState = {
  newPassword: "",
  confirmPassword: "",
};
