import classNames from "classnames";

// helpers
import useUserProfile from "src/hooks/useUserProfile";

// interfaces
import { IMessagesListItem } from "src/types/api/IMessagesList.interface";

// assets
import styles from "../../../assets/styles/containers/message-room.module.scss";


const MessageBlock = ({ message }: { message: IMessagesListItem}) => {
  const { data } = useUserProfile();

  const isMyMessage = message.user._id === data?.id;

  return (
    <div className={classNames(styles["message-room__message-block"], { [styles["message-room__message-block_my-message"]]: isMyMessage })}>
      <div className={styles["message-room__message-block__author"]}>
        { message.user.username }
      </div>
      <div className={styles["message-room__message-block__text"]}>
        { message.text }
      </div>
    </div>
  )
}

export default MessageBlock;
