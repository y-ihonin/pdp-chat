import { useParams } from "react-router-dom";

// containers
import MessageRoom from "src/containers/MessageRoom";


function RoomSingle() {
  const { id } = useParams();

  return (
    <MessageRoom roomId={id as string} />
  );
}

export default RoomSingle;
