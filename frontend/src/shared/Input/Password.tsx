import React from "react";
import { Input } from "antd";
import classNames from "classnames";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// interfaces
import { IInputPassword } from "./Input.interface";

//components
import LabelErrorProvider from "src/components/LabelErrorProvider";

// assets
import styles from "../../assets/styles/shared/input.module.scss";


function Password(props: IInputPassword) {
  const { label, error, wrapperClassName, className } = props;

  const inputClassName = classNames(styles.input, styles["input-password"], className);

  const renderIcon = (visible: boolean) => {
    if (visible) {
      return <AiFillEyeInvisible />;
    }

    return <AiFillEye />;
  };

  return (
    <LabelErrorProvider label={label} error={error} className={wrapperClassName}>
      <Input.Password
        {...props}
        className={inputClassName}
        status={error ? "error" : ""}
        iconRender={renderIcon}
        value={props.value === null ? "" : props.value}
      />
    </LabelErrorProvider>
  );
}

export default Password;
