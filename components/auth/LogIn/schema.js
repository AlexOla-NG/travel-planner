import { errorMessages } from "libs/utils";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required(errorMessages.required("Email")).max(50, errorMessages.maxChar(50)),
  password: yup
    .string()
    .required(errorMessages.required("Password"))
    .min(8, errorMessages.minChar(8))
    .minLowercase(1, errorMessages.minLowerCase(1))
    .minUppercase(1, errorMessages.minUpperCase(1))
    .minNumbers(1, errorMessages.minNumber(1))
    .minSymbols(1, errorMessages.minSymbol(1)),
});
