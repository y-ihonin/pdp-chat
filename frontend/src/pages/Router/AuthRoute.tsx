import { Navigate } from "react-router-dom";

// helpers
import useUserProfile from "src/hooks/useUserProfile";


const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { data, isAuthorized, isLoading } = useUserProfile();

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  if (isAuthorized && data) {
    return <Navigate to="/" replace />
  }

  return children;
};

export default AuthRoute;
