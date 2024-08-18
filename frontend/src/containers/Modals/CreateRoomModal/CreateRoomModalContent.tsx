import { useCallback } from "react";
import { useFormik } from "formik";
import { Button, notification } from "antd";
import debounce from "lodash/debounce";

// components
import Input from "src/shared/Input/Input";

// helpers
import conversion from "src/api/query/conversion";
import { initialValues, validationSchema } from "./helpers";

// interfaces
import { ICreateRoomModalContent, IFormValues } from "./CreateRoomModal.interface";

// assets
import styles from "../../../assets/styles/containers/modals/create-room-modal.module.scss";


const CreateRoomModalContent = ({ userId, onSubmit, onCancel }: ICreateRoomModalContent) => {
  const { mutateAsync, isPending } = conversion.roomCreate();

  const handleFormSubmit = (data: IFormValues) => {
    mutateAsync({
      participants: [userId],
      name: data.name,
    }).then(() => {
      onSubmit();
      onCancel();
    }).catch(() => {
      notification.open({ message: "Something went wrong", });
    });
  };

  const methods = useFormik<IFormValues>({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleFormSubmit,
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
    <div className={styles["create-room-modal-content"]}>
      <form
        className={styles["create-room-modal-content__form"]}
        onSubmit={handleSubmit}
      >
        <Input
          name="username"
          error={errors.name}
          value={values.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          label="Room name"
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={isPending}
        >
          Create room
        </Button>
      </form>
    </div>
  )
}

export default CreateRoomModalContent;
