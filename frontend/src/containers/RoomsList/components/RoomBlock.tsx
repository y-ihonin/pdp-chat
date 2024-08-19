import { Link } from "react-router-dom";
import { Button } from "antd";
import { MdOutlineMessage } from "react-icons/md";

// interfaces
import { IRoomListItem } from "src/types/api/IRoomsList.interface";

// assets
import styles from "../../../assets/styles/containers/rooms-list.module.scss";

const RoomBlock = ({ roomData }: { roomData: IRoomListItem }) => {

  return (
    <div className={styles["rooms-list__block"]}>
      <div className={styles["rooms-list__block__title"]}>
        {roomData.name}
      </div>
      <div className={styles["rooms-list__block__members"]}>
        <div className={styles["rooms-list__block__members__title"]}>
          Members:
        </div>
        <div className={styles["rooms-list__block__members__list"]}>
          {roomData.participants.map((participant) => (
            <div key={participant._id}>
              {participant.username}
            </div>
          ))}
        </div>
      </div>
      <Link
        to={`/room/${roomData._id}`}
        className={styles["rooms-list__block__open-room"]}
      >
        <Button className={styles["rooms-list__block__open-room__button"]}>
          <MdOutlineMessage />
        </Button>
      </Link>
    </div>
  )
}

export default RoomBlock;
