import { Tabs } from "antd";

// containers
import UsersList from "src/containers/UsersList";
import RoomsList from "src/containers/RoomsList";

// helpers
import useUserProfile from "src/hooks/useUserProfile";

// assets
import "../assets/styles/pages/home.scss";


function Home() {
  const { isAuthorized, isLoading } = useUserProfile();

  const tabsItems = [
    {
      label: "Users list",
      key: "1",
      children: <UsersList />,
    },
    isAuthorized && !isLoading && {
      label: "Rooms list",
      key: "2",
      children: <RoomsList />,
    },
  ].filter(Boolean);

  return (
    <div data-testid="home-page">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        items={tabsItems as unknown as { label: string; key: string; children: JSX.Element }[]}
      />
    </div>
  );
}

export default Home;
