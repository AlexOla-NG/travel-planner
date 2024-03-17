import Button from "components/atoms/Buttons/Button";
import { composeClasses } from "libs/utils";
import Image from "next/image";

import heroImg from "../../public/images/hero-image.avif";
import styles from "./LandingPage.module.scss";

// TODO: route buttons to appropriate pages: login, signup

export default function LandingPage() {
  return (
    <section className={styles.landingPage}>
      <div className={styles.textOnly}>
        <div className={styles.textContent}>
          <h1>Plan your next adventure</h1>
          <p>The all-in-one travel planner app. Effortlessly organize your trips, discover new destinations, and share your experiences with friends.</p>
        </div>
        <div className={styles.btnWrapper}>
          <Button className={composeClasses(styles.login, styles.btn)} link="#">
            Login
          </Button>
          <Button className={composeClasses(styles.signUp, styles.btn)} link="#">
            Sign Up
          </Button>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <Image alt="Hero" placeholder="blur" priority src={heroImg} />
      </div>
    </section>
  );
}
