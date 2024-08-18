import { Modal as AntdModal } from "antd";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";

// interfaces
import { ModalProps } from "./Modal.interface";

// assets
import styles from "../../assets/styles/shared/modal.module.scss";

function Modal(props: ModalProps) {
  const {
    children,
    className,
    wrapClassName,
    title,
    closeIcon,
    onCancel,
    closable = true,
    ...rest
  } = props;

  const modalClassName = classNames(styles["modal-custom"], className, {
    "modal-custom_open": rest.open
  });
  const modalWrapClassName = classNames("modal-custom-wrapper", wrapClassName);

  // renders
  return (
    <AntdModal
      className={modalClassName}
      wrapClassName={modalWrapClassName}
      closeIcon={<div />}
      title={
        <div className={styles["modal-custom__header"]}>
          <div className={styles["modal-custom__header-label"]}>{title}</div>
          {closable ? (
            <span
              onClick={() => onCancel && onCancel()}
              className={classNames(styles["modal-custom__header-icon"], "modal-custom__header-icon")}
            >
              {closeIcon || <IoClose />}
            </span>
          ) : null}
        </div>
      }
      closable={closable}
      onCancel={onCancel}
      centered
      {...rest}
    >
      {children}
    </AntdModal>
  );
}

export default Modal;
