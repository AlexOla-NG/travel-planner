import Button from "components/atoms/Buttons/Button";
import constants from "components/constants";
import Image from "next/image";

import heroImg from "../../public/images/hero-image.avif";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  const { buttonVariants } = constants;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.landingPage}>
      <div className={styles.textOnly}>
        <div className={styles.textContent}>
          <h1>Plan your next adventure</h1>
          <p>The all-in-one travel planner app. Effortlessly organize your trips, discover new destinations, and share your experiences with friends.</p>
        </div>
        <div className={styles.btnWrapper}>
          <Button link="#" onClick={handleClick} variants={buttonVariants.primary}>
            Login
          </Button>
          <Button link="#" variants={buttonVariants.secondaryLemonYellow}>
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
