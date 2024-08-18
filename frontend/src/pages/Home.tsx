// containers
import UsersList from "src/containers/UsersList";

// assets
import "../assets/styles/pages/home.scss";


function Home() {
  return (
    <div data-testid="home-page">
      <UsersList />
    </div>
  );
}

export default Home;
