import Button from "components/atoms/Buttons/Button";
import FormikCustomInput from "components/atoms/FormikCustomInput/FormikCustomInput";
import constants from "components/constants";
import { Form, Formik } from "formik";
import { useCreateUser } from "hooks/auth";
import { useRouter } from "next/router";
import React from "react";

import { fieldValues, initialState } from "./data";
import { signupSchema } from "./schema";
import styles from "./signup.module.scss";

const { buttonVariants, routes } = constants;
const { login } = routes;

const SignUp = () => {
  const router = useRouter();
  const { createUser, isPending } = useCreateUser();

  const handleSubmit = async (values, { resetForm }) => {
    !isPending &&
      createUser(values, {
        onSuccess: () => {
          resetForm();
          setTimeout(() => {
            router.push(login);
          }, 3000);
        },
      });
  };
  return (
    <main className={styles.signup}>
      <h1>Start planning your dream getaway. Sign up today!</h1>

      <section className={styles.formWrapper}>
        <Formik enableReinitialize initialValues={initialState} onSubmit={handleSubmit} validationSchema={signupSchema}>
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
                  {isPending ? "Creating your account..." : "Create an account"}
                </Button>
              </Form>
            );
          }}
        </Formik>

        <Button link={login} variants={[buttonVariants.text]} wrapperClassName={styles.loginBtn}>
          I already have an account
        </Button>
      </section>

      <p className={styles.termsAndConditions}>
        By signing up you agree to the <span>terms & conditions</span> and <span>privacy policy</span> of Travel Planner.
      </p>
    </main>
  );
};

export default SignUp;
