import { errorMessages } from "libs/utils";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

export const signupSchema = yup.object().shape({
  firstName: yup.string().required(errorMessages.required("First name")).max(50, errorMessages.maxChar(50)),
  lastName: yup.string().required(errorMessages.required("Last name")).max(50, errorMessages.maxChar(50)),
  email: yup.string().email("Invalid email").required(errorMessages.required("Email")).max(50, errorMessages.maxChar(50)),
  phoneNumber: yup
    .string()
    .test("validate phone number", "Phone number should be valid", (value) => /^(0|\+234)(7|8|9)(0|1)\d{8}$/.test(String(value)))
    .required(errorMessages.required("Phone number"))
    .min(11, errorMessages.minChar(11))
    .max(14, errorMessages.maxChar(14)),
  password: yup
    .string()
    .required(errorMessages.required("Password"))
    .min(8, errorMessages.minChar(8))
    .minLowercase(1, errorMessages.minLowerCase(1))
    .minUppercase(1, errorMessages.minUpperCase(1))
    .minNumbers(1, errorMessages.minNumber(1))
    .minSymbols(1, errorMessages.minSymbol(1)),
});
