import Cookies from "js-cookie";

// helpers
import { queryClient } from "src/api/query/reactQuery";
import API_ROUTES from "src/api/routes.constant";

export const logout = () => {
  Cookies.remove("accessToken");
  queryClient.removeQueries({ queryKey: [API_ROUTES.account.isAuthenticated, {}] });
};
