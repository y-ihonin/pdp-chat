import { Button } from "antd";
import { MdOutlineMessage } from "react-icons/md";

// interfaces
import { IUsersListUser } from "src/types/api/IUsersList.interface";

// assets
import styles from "../../../assets/styles/containers/users-list.module.scss";


const UserBlock = ({ user, onClickRoomCreate }: { user: IUsersListUser, onClickRoomCreate: () => void }) => {
  
  return (
    <div className={styles["users-list__block"]}>
      <div className={styles["users-list__block__title"]}>
        {user.username}
      </div>
      <div className={styles["users-list__block__actions"]}>
        <Button className={styles["users-list__block__create-room"]} onClick={onClickRoomCreate}>
          <MdOutlineMessage className={styles["users-list__block__create-room__icon"]} />
        </Button>
      </div>
    </div>
  )
};

export default UserBlock;
