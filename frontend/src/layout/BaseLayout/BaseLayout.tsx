import { ReactNode } from "react";

// assets
import styles from "../../assets/styles/layout/base-layout.module.scss";


const BaseLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className={styles["base-layout"]}>
      <header className={styles["base-layout__header"]}>
        Header
      </header>
      <main className={styles["base-layout__body"]}>
        {children}
      </main>
    </div>
  )
};

export default BaseLayout;
