import { Skeleton } from "antd";

// components
import RoomBlock from "./components/RoomBlock";

// helpers
import conversion from "src/api/query/conversion";

// assets
import styles from "../../assets/styles/containers/rooms-list.module.scss";


const RoomsList = () => {
  const { data, isLoading } = conversion.getRoomsList();

  // renders
  if (isLoading) {
    <div className={styles["rooms-list"]}>
      { Array.from({ length: 4 }).map((_, index) => (
        <Skeleton.Input block active className={styles["rooms-list__block-skeleton"]} key={index}/>
      ))}
    </div>
  }

  return (
    <>
      <div className={styles["rooms-list"]}>
        {
          data?.results?.length
            ? data.results.map((roomData) => (
              <RoomBlock
                key={roomData._id}
                roomData={roomData}
              />
            ))
            : <div>No rooms found</div>
        }
      </div>
    </>
  )
};

export default RoomsList;
