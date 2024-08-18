import React, { Suspense } from "react";

// components
import Modal from "src/shared/Modal";
const CreateRoomModalContent = React.lazy(() => import("./CreateRoomModalContent"));

// interfaces
import { ICreateRoomModal } from "./CreateRoomModal.interface";

// assets
import styles from "../../../assets/styles/containers/modals/create-room-modal.module.scss";


const CreateRoomModal = (props: ICreateRoomModal) => {
  const {
    open,
    userId,
    onSubmit,
    ...rest
  } = props;

  return (
    <Modal
      title="Create messages room"
      className={styles["create-room-modal"]}
      footer={null}
      forceRender
      open={open}
      { ...rest }
    >
      <Suspense fallback={"..."}>
        {
          open
            ? (
              <CreateRoomModalContent userId={userId} onSubmit={onSubmit} onCancel={rest.onCancel} />
            )
            : null
        }
      </Suspense>
    </Modal>
  )
}

export default CreateRoomModal;
