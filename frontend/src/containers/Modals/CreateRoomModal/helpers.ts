import * as Yup from "yup";

// helpers
import { REQUIRED } from "src/globals/schemasErrorMessage.constants";

export const initialValues = {
  name: null,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().nullable().required(REQUIRED),
});
