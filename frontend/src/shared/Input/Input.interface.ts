import React, { ReactNode } from "react";
import { InputProps as AntdInputProps } from "antd";
import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input";

// interfaces
import { LabelErrorProviderProps } from "../../components/LabelErrorProvider";


export interface InputProps
  extends Omit<LabelErrorProviderProps, "children" | "addonAfter">,
    Omit<AntdInputProps, "value"> {
  wrapperClassName?: string;
  children?: React.ReactNode;
  onClear?: () => void;
  addonAfter?: ReactNode | string;
  showClearIcon?: boolean;
  value?: string | null;
}

export interface IInputPassword extends Omit<LabelErrorProviderProps, "children">, Omit<AntdInputProps, "value"> {
  wrapperClassName?: string;
  children?: React.ReactNode;
  value?: string | null;
}

export interface ITextArea
  extends Omit<LabelErrorProviderProps, "children">,
    Omit<AntdTextAreaProps, "value"> {
  wrapperClassName?: string;
  rows?: number;
  type?: "primary" | "secondary" | "text";
  value?: string | null;
}
