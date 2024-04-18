import LandingPage from "components/landingPage/LandingPage";

import Head from "../components/atoms/Head/index";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <>
      <Head title="Welcome to travel planner app" />
      <main className={styles.main}>
        <LandingPage />
      </main>
    </>
  );
}
