import { Link } from "react-router-dom";

// assets
import "../assets/styles/pages/home.scss";


function Home() {
  return (
    <div data-testid="home-page">
      <h1>Home</h1>
      <Link to="/sign-in">Sign in</Link>
    </div>
  );
}

export default Home;
