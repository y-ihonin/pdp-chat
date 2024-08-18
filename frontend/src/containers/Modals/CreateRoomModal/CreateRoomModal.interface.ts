import { ModalProps } from "src/shared/Modal";

export interface ICreateRoomModalContent {
  userId: number | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export interface ICreateRoomModal extends ModalProps, ICreateRoomModalContent {
  onCancel: () => void;
}

export interface IFormValues {
  name: string | null;
}
