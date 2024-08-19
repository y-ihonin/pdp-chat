import { useCallback } from "react";
import { useFormik } from "formik";
import debounce from "lodash/debounce";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";

// components
import Input from "src/shared/Input";
import Password from "src/shared/Input/Password";

// helpers
import { initialValues, validationSchema } from "./helpers";
import useUserProfile from "src/hooks/useUserProfile";
import auth from "src/api/auth";

// assets
import styles from "src/assets/styles/containers/forms/sign-in-form.module.scss";


interface ISignInFormValue {
  username: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();

  const { refetch } = useUserProfile();

  const onSubmit = (data: ISignInFormValue) => {
    auth.signIn({
      username: data.username,
      password: data.password
    }).then(async () => {
      await refetch();
      navigate("/")
    }).catch((error) => {
      alert(get(error, "response.data.message") || "Something went wrong");
    })
  }

  const methods = useFormik<ISignInFormValue>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit,
  });

  const {
    values,
    errors,
    setFieldValue,
    validateField,
    handleSubmit
  } = methods;

  // methods
  const validateFieldValue = useCallback(debounce((key: string) => validateField(key), 300), []);

  const handleFieldChange = async (key: string, value: unknown) => {
    await setFieldValue(key, value);
    validateFieldValue(key);
  };


  return (
    <form
      className={styles["sign-in-form"]}
      onSubmit={handleSubmit}
    >
      <Input
        name="username"
        error={errors.username}
        value={values.username}
        onChange={(e) => handleFieldChange("username", e.target.value)}
        label="Username"
      />
      <Password
        label="Password"
        error={errors.password}
        value={values.password}
        onChange={(e) => setFieldValue("password", e.target.value)}
      />
      <Button
        type="primary"
        htmlType="submit"
      >
        Sing in
      </Button>
    </form>
  )
}

export default SignInForm;
