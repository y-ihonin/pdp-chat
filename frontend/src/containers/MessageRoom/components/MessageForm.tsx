import { useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import debounce from "lodash/debounce";
import * as Yup from "yup";
// import get from "lodash/get";

// components
import TextArea from "src/shared/Input/TextArea";

// helpers
import { REQUIRED } from "src/globals/schemasErrorMessage.constants";

// assets
import styles from "../../../assets/styles/containers/message-room.module.scss";
import { Button } from "antd";


const validationSchema = Yup.object().shape({ text: Yup.string().nullable().required(REQUIRED) });

interface IFormValues {
  text: string | null;
}

const MessageForm = ({ onSubmit }: { onSubmit: (data: IFormValues) => void }) => {
  const submitMessage = (values: IFormValues, methods: FormikHelpers<IFormValues>) => {
    onSubmit({ text: values.text });

    methods.resetForm();
  }


  const methods = useFormik<IFormValues>({
    initialValues: { text: null },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: submitMessage,
  });

  const {
    values,
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
    <div className={styles["message-room__form"]}>
      <TextArea
        placeholder="Type your message here"
        name="message"
        value={values.text}
        onChange={(e) => handleFieldChange("text", e.target.value)}
      />
      <Button onClick={() => handleSubmit()}>Send</Button>
    </div>
  )
}

export default MessageForm;
