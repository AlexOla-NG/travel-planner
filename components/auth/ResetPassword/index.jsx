import Button from "components/atoms/Buttons/Button";
import FormikCustomInput from "components/atoms/FormikCustomInput/FormikCustomInput";
import { showToast } from "components/atoms/ShowToast/showToast";
import constants from "components/constants";
import { Form, Formik } from "formik";
import { useResetPassword } from "hooks/auth";
import { NotificationTypes } from "libs/utils";
import { useRouter } from "next/router";
import React from "react";

import { fieldValues, initialState } from "./data";
import styles from "./index.module.scss";
import { resetPasswordSchema } from "./schema";

const { buttonVariants, routes } = constants;
const { forgotPassword, login } = routes;

const ResetPassword = () => {
  const router = useRouter();
  const { resetPassword, isPending } = useResetPassword();

  const handleSubmit = async (values, { resetForm }) => {
    if (!router.query.resetToken) {
      showToast("Reset token not found. Routing you back to forget password page", NotificationTypes.INFO);
      return setTimeout(() => {
        router.push(forgotPassword);
      }, 3000);
    }

    const formValues = { password: values.newPassword, token: router.query.resetToken };
    !isPending &&
      resetPassword(formValues, {
        onSuccess: () => {
          resetForm();
          setTimeout(() => {
            router.push(login);
          }, 3000);
        },
      });
  };

  return (
    <main className={styles.resetPassword}>
      <div className={styles.header}>
        <h1>Reset your password</h1>
        <p>Enter a new password</p>
      </div>

      <section className={styles.formWrapper}>
        <Formik enableReinitialize initialValues={initialState} onSubmit={handleSubmit} validationSchema={resetPasswordSchema}>
          {({ dirty, isValid }) => {
            const isFormValid = dirty && isValid;
            return (
              <Form>
                {fieldValues.map((field) => {
                  const { id, title, name, type, placeholder } = field;
                  return (
                    <div className={styles.formField} key={id}>
                      <label htmlFor={title}>{title}</label>
                      <FormikCustomInput id={title} name={name} placeholder={placeholder} type={type} />
                    </div>
                  );
                })}
                <Button disabled={!isFormValid} loading={isPending} variants={[buttonVariants.success]} wrapperClassName={styles.signupBtn}>
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className={styles.btnWrapper}>
          <Button link={forgotPassword} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Resend reset mail?
          </Button>
          <Button link={login} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Login
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
