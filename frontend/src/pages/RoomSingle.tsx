import { useParams } from "react-router-dom";

// assets
import "../assets/styles/pages/home.scss";


function RoomSingle() {
  const { id } = useParams();

  console.log("id", id)

  return (
    <div>
      RoomSingle
    </div>
  );
}

export default RoomSingle;
