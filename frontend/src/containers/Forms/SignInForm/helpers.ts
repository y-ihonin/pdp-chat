import * as Yup from "yup";

// helpers
import { REQUIRED } from "src/globals/schemasErrorMessage.constants";

export const initialValues = {
  username: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().nullable().required(REQUIRED),
  password: Yup.string().nullable().required(REQUIRED),
});
