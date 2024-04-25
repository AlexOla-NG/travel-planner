import Button from "components/atoms/Buttons/Button";
import FormikCustomInput from "components/atoms/FormikCustomInput/FormikCustomInput";
import constants from "components/constants";
import { Form, Formik } from "formik";
import { useForgotPassword } from "hooks/auth";
import React from "react";

import { fieldValues, initialState } from "./data";
import styles from "./index.module.scss";
import { forgotPasswordSchema } from "./schema";

const { buttonVariants, routes } = constants;
const { login, signup } = routes;

const ForgotPassword = () => {
  const { forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = async (values, { resetForm }) => {
    !isPending &&
      forgotPassword(values, {
        onSuccess: () => {
          resetForm();
        },
      });
  };

  return (
    <main className={styles.forgotPassword}>
      <div className={styles.header}>
        <h1>Forgot your password?</h1>
        <p>Enter your email address, and reset instructions will be sent to you shortly</p>
      </div>

      <section className={styles.formWrapper}>
        <Formik enableReinitialize initialValues={initialState} onSubmit={handleSubmit} validationSchema={forgotPasswordSchema}>
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
          <Button link={login} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Login
          </Button>
          <Button link={signup} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Create new account
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
