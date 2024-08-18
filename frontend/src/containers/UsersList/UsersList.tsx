import { useState } from "react";
import { Skeleton } from "antd";

// components
import UserBlock from "./components/UserBlock";
import CreateRoomModal from "src/containers/Modals/CreateRoomModal";

// helpers
import users from "src/api/query/users";

// assets
import styles from "../../assets/styles/containers/users-list.module.scss";


const MODAL_INITIAL_STATE = { open: false, userId: null };

const UsersList = () => {
  const [modalCreateRoomState, setModalCreateRoomState] = useState<
    { open: boolean, userId: null | number}>(MODAL_INITIAL_STATE);

  const { data, isLoading, refetch } = users.usersList();

  // renders
  if (isLoading) {
    <div className={styles["users-list"]}>
      { Array.from({ length: 4 }).map((_, index) => (
        <Skeleton.Input block active className={styles["users-list__block-skeleton"]} key={index}/>
      ))}
    </div>
  }

  return (
    <>
      <div className={styles["users-list"]}>
        {
          data?.count
            ? data.results.map((user) => (
              <UserBlock
                key={user.id}
                user={user}
                onClickRoomCreate={() => {
                  setModalCreateRoomState({ open: true, userId: user.id })
                }} />
            ))
            : <div>No users found</div>
        }
      </div>
      <CreateRoomModal
        {...modalCreateRoomState}
        onCancel={() => setModalCreateRoomState(MODAL_INITIAL_STATE)}
        onSubmit={() => refetch()}
      />
    </>
  )
}

export default UsersList;
