import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
import { IoChevronDown } from "react-icons/io5";

// helpers
import useUserProfile from "src/hooks/useUserProfile";
import { logout } from "src/helpers/logout";

// assets
import styles from "../../assets/styles/containers/header.module.scss";

const Header = () => {
  const { data, refetch, isAuthorized, isLoading } = useUserProfile();

  const handleLogout = () => {
    logout();
    refetch();
  };

  const items = [
    {
      key: "1",
      label: (
        <div onClick={handleLogout}>
          Log out
        </div>
      ),
    },
  ];

  const renderUserDropdown = () => (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      className={styles["header__user-dropdown"]}
    >
      <Button>{data?.username} <IoChevronDown /></Button>
    </Dropdown>
  )

  const renderUserBlock = () => {
    switch (true) {
      case isLoading:
        return <div>Loading...</div>;
      case isAuthorized:
        return renderUserDropdown();
      case !isAuthorized && !isLoading:
        return <Link to="/sign-in">Sign in</Link>;
    }
  }

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.header__title}>
        Web-Socket Chat
      </Link>
      <div className={styles["header-user"]}>
        {renderUserBlock()}
      </div>
    </div>
  )
}

export default Header;
