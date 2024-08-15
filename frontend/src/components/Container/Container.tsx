import { ReactNode } from "react";

// assets
import styles from "../../assets/styles/components/container.module.scss";


const Container = ({ children }: { children: ReactNode }) => {

  return (
    <div className={styles.container}>
      { children }
    </div>
  )
};

export default Container;
