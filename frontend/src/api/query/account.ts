import { getCookie } from "cookies-next";

// interfaces
import { QueryArgsInterface } from "src/types/api/queryArgs.interface";
import { IUserProfile } from "src/types/api/IUserProfile.interface";

// helpers
import { useFetch } from "./reactQuery";
import API_ROUTES from "src/api/routes.constant";

const account = {
  useProfileMe: (args?: QueryArgsInterface) => {
    const { params, config } = args || {};

    return useFetch<IUserProfile>(API_ROUTES.account.profileMe, params, config);
  },
  useIsAuthenticated: (args?: QueryArgsInterface) => {
    const { params, config } = args || {};

    return useFetch<{ accessToken: string, refreshToken: string }>(API_ROUTES.account.isAuthenticated, params, {
      initialData: {
        accessToken: getCookie("accessToken"),
      },
      queryFn: async () => ({
        accessToken: getCookie("accessToken"),
      }),
      ...config,
    })
  },
};

export default account;
