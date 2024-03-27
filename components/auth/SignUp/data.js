export const fieldValues = [
  {
    id: crypto.randomUUID(),
    title: "first name",
    name: "firstName",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    id: crypto.randomUUID(),
    title: "last name",
    name: "lastName",
    type: "text",
    placeholder: "Enter your last name",
  },
  {
    id: crypto.randomUUID(),
    title: "email address",
    name: "email",
    type: "text",
    placeholder: "Enter your email address",
  },
  {
    id: crypto.randomUUID(),
    title: "phone number",
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter your phone number",
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
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};
