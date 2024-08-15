import React from "react";

import Input from "./Input";
import Password from "./Password";
import TextArea from "./TextArea";


import {
  InputProps,
  IInputPassword,
  ITextArea,
} from "./Input.interface";

const CustomInput = Input as React.FC<InputProps> & {
  Password: typeof Password;
  TextArea: typeof TextArea;
};

export type { InputProps, IInputPassword, ITextArea };
export default CustomInput;
