import { ModalProps as AntdModalProps } from "antd";

export interface ModalProps extends Omit<AntdModalProps, "onCancel"> {
  onCancel?: () => void | null;
}
