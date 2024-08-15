import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoMdWarning } from "react-icons/io";
import classNames from "classnames";

// interfaces
import { LabelErrorProviderProps } from "./LabelErrorProvider.interface";

// assets
import styles from "../../assets/styles/components/label-error-provider.module.scss";

function LabelErrorProvider(props: LabelErrorProviderProps) {
  const {
    error,
    label,
    info,
    fullWidth,
    children,
    className,
    disabled,
    labelPlacement = "top",
    ...rest
  } = props;

  const labelErrorClassName = classNames(
    styles["label-error-provider"],
    className,
    styles[`label-error-provider_label-placement-${labelPlacement}`],
    {
      [styles["label-error-provider__full-width"]]: !!fullWidth,
      [styles["label-error-provider__disabled"]]: !!disabled,
      [styles["label-error-provider__show-error"]]: !!error,
      ["label-error-provider__show-error"]: !!error
    }
  );

  return (
    <div className={labelErrorClassName} {...rest}>
      {label ? (
        <span className={styles["label-error-provider__label"]}>
          {label}
        </span>
      ) : null}
      {children}
      {info && !error ? (
        <div className={styles["label-error-provider__info"]}>
          <BsInfoCircleFill className={styles["label-error-provider__info-icon"]} />
          <span className={styles["label-error-provider__info-label"]}>{info}</span>
        </div>
      ) : null}
      {error ? (
        <div className={styles["label-error-provider__error"]}>
          <IoMdWarning className={styles["label-error-provider__error-icon"]} />
          <span className={styles["label-error-provider__error-label"]}>{error}</span>
        </div>
      ) : null}
    </div>
  );
}

export default LabelErrorProvider;
