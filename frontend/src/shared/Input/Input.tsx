import React from "react";
import { Input as AntdInput } from "antd";
import classNames from "classnames";
import { IoMdCloseCircle } from "react-icons/io";

// interfaces
import { InputProps } from "./Input.interface";

//components
import LabelErrorProvider from "../../components/LabelErrorProvider";

// assets
import styles from "../../assets/styles/shared/input.module.scss";

const Input = (props: InputProps) => {
  const {
    value,
    onChange,
    placeholder,
    wrapperClassName = "",
    name,
    className,
    size = "large",
    label,
    error,
    addonBefore,
    addonAfter,
    onClear,
    fullWidth,
    ...rest
  } = props;

  const inputClassName = classNames(
    styles.input,
    className,
    { [styles["input_width-addon-before"]]: !!addonBefore },
    { [styles["input_width-addon-after"]]: !!addonAfter }
  );

  const inputAddonAfterClassName = classNames(
    styles.input__addon,
    styles.input__addon_after,
    { [styles["input__addon_pointer-none"]]: !onClear }
  );

  const showClearIcon = onClear && value;

  return (
    <LabelErrorProvider
      label={label}
      error={error}
      className={wrapperClassName}
      fullWidth={fullWidth}
    >
      <div className={styles["input-base-wrapper"]}>
        {addonBefore && (
          <span className={`${styles.input__addon} ${styles.input__addon_before}`}>
            {addonBefore}
          </span>
        )}
        <AntdInput
          {...rest}
          className={inputClassName}
          status={error ? "error" : ""}
          size={size}
          name={name}
          placeholder={placeholder}
          value={value as string | undefined}
          onChange={onChange}
        />
        {(!!addonAfter || !!showClearIcon) && (
          <span className={inputAddonAfterClassName}>
            {showClearIcon ? (
              <IoMdCloseCircle onClick={onClear} className={styles["input__addon-clear"]} />
            ) : (
              addonAfter
            )}
          </span>
        )}
      </div>
    </LabelErrorProvider>
  );
};

export default Input;
