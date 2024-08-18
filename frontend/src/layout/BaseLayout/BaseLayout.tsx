import { ReactNode } from "react";

// containers
import Header from "src/containers/Header";

// assets
import styles from "../../assets/styles/layout/base-layout.module.scss";


const BaseLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className={styles["base-layout"]}>
      <Header />
      <main className={styles["base-layout__body"]}>
        {children}
      </main>
    </div>
  )
};

export default BaseLayout;
