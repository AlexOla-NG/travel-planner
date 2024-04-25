import { errorMessages } from "libs/utils";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required(errorMessages.required("New Password"))
    .min(8, errorMessages.minChar(8))
    .minLowercase(1, errorMessages.minLowerCase(1))
    .minUppercase(1, errorMessages.minUpperCase(1))
    .minNumbers(1, errorMessages.minNumber(1))
    .minSymbols(1, errorMessages.minSymbol(1)),
  confirmPassword: yup
    .string()
    .required(errorMessages.required("Confirm Password"))
    .oneOf([yup.ref("newPassword"), null], errorMessages.passwordMatch),
});
