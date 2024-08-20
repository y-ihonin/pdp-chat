import { useEffect, useRef, useState } from "react";
import conversion from "src/api/query/conversion";

// components
import MessageBlock from "./components/MessageBlock";
import MessageForm from "./components/MessageForm";

// helpers
import useUserProfile from "src/hooks/useUserProfile";

// interfaces
import { IMessagesListItem } from "src/types/api/IMessagesList.interface";

// assets
import styles from "../../assets/styles/containers/message-room.module.scss";


const MessageRoom = ({ roomId }: { roomId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessagesListItem[]>([]);

  const { data: userData, tokens } = useUserProfile();

  const { data, refetch, isLoading: isMessageLoading } = conversion.getRoomMessages({
    id: roomId,
    config: { enabled: false }
  });
  const { data: roomData, isLoading: isRoomDataLoading } = conversion.getSingleRoom({ id: roomId });

  const ws = useRef<WebSocket | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/${roomId}?token=${tokens.accessToken}`);

    socket.addEventListener("open", () => {
      refetch();
      setIsLoading(false);
    });

    socket.addEventListener("message", (event) => {
      const messageData = JSON.parse(event.data);

      setMessages((prev) => [...prev, messageData?.message]);
    });

    ws.current = socket


    return () => socket.close()
  }, [])

  const handleSubmit = (messageData: { text: string | null }) => {
    ws.current?.send(JSON.stringify({
      message: messageData.text,
      userId: userData?.id,
    }))
  }

  // effects
  useEffect(() => {
    setMessages(data || [])
  }, [data])

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // render
  if (isLoading || isMessageLoading || isRoomDataLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles["message-room"]}>
      <h1 className={styles["message-room__title"]}>{roomData?.name}</h1>
      <div className={styles["message-room__message-list"]} ref={listRef}>
        {
          messages.map((message) => (
            <MessageBlock key={message._id} message={message} />
          ))
        }
      </div>
      <MessageForm onSubmit={handleSubmit} />
    </div>
  )
};

export default MessageRoom;
