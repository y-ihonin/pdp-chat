import React from "react";
import { Input } from "antd";
import classNames from "classnames";

// interfaces
import { ITextArea } from "./Input.interface";

//components
import LabelErrorProvider from "../../components/LabelErrorProvider";

// assets
import styles from "../../assets/styles/shared/input.module.scss";

const { TextArea: AntTextArea } = Input;

const Textarea = (props: ITextArea) => {
  const {
    wrapperClassName,
    className,
    type = "primary",
    size = "large",
    label,
    error,
    value,
    ...rest
  } = props;

  return (
    <LabelErrorProvider
      label={label}
      error={error}
      className={wrapperClassName}
    >
      <AntTextArea
        {...rest}
        value={value || ""}
        className={classNames(
          styles["text-input"],
          className,
          styles[`text-input_${type}`]
        )}
        size={size}
        status={error ? "error" : ""}
      />
    </LabelErrorProvider>
  );
};

export default Textarea;
