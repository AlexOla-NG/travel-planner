import { errorMessages } from "libs/utils";
import * as yup from "yup";

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required(errorMessages.required("Email")).max(50, errorMessages.maxChar(50)),
});
