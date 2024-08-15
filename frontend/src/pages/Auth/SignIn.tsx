// components
import SignInForm from "src/containers/Forms/SignInForm";
import Container from "src/components/Container";

// assets
import styles from "src/assets/styles/pages/auth/sign-in.module.scss";


function SignIn() {
  return (
    <div className={styles["sign-in"]}>
      <Container>
        <div className={styles["sign-in__wrapper"]}>
          <SignInForm />
        </div>
      </Container>
    </div>
  );
}

export default SignIn;
