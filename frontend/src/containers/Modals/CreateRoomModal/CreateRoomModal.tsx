import React, { Suspense, useEffect } from "react";

// components
import Modal from "src/shared/Modal";
const CreateRoomModalContent = React.lazy(() => import("./CreateRoomModalContent"));

// helpers
import useUserProfile from "src/hooks/useUserProfile";

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
  const { data } = useUserProfile();

  useEffect(() => {
    if (open) {
      const payload = new Blob([JSON.stringify({ userId: data?.id })], { type: "application/json" });
      
      navigator.sendBeacon(`${process.env.REACT_APP_APP_API_URL}/analytics/open-create-room-modal`, payload);
    }
  }, [open])

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
