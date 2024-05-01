import Button from "components/atoms/Buttons/Button";
import FormikCustomInput from "components/atoms/FormikCustomInput/FormikCustomInput";
import constants from "components/constants";
import { Form, Formik } from "formik";
import { useLoginUser } from "hooks/auth";
import { useRouter } from "next/router";
import React from "react";

import { fieldValues, initialState } from "./data";
import styles from "./index.module.scss";
import { loginSchema } from "./schema";

const { buttonVariants, routes } = constants;
const { forgotPassword, signup, home } = routes;

const Login = () => {
  const router = useRouter();
  const { loginUser, isPending } = useLoginUser();

  const handleSubmit = async (values, { resetForm }) => {
    !isPending &&
      loginUser(values, {
        onSuccess: () => {
          resetForm();
          setTimeout(() => {
            router.push(home);
          }, 3000);
        },
      });
  };

  return (
    <main className={styles.login}>
      <h1>Resume planning your dream getaway. Login to your account</h1>

      <section className={styles.formWrapper}>
        <Formik enableReinitialize initialValues={initialState} onSubmit={handleSubmit} validationSchema={loginSchema}>
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
                  {isPending ? "Confirming your details..." : "Login"}
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className={styles.btnWrapper}>
          <Button link={forgotPassword} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Forgot password?
          </Button>
          <Button link={signup} variants={[buttonVariants.text]} wrapperClassName={styles.secondaryBtn}>
            Create new account
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Login;
