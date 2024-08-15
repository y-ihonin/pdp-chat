import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// interfaces
import { IUserProfile } from "src/types/api/IUserProfile.interface";

// helpers
import axios from "./axios";
import API_ROUTES from "./routes.constant";
import { queryClient } from "./query/reactQuery";


export default {
  async signIn(data: { username: string; password: string }, config?: AxiosRequestConfig) {
    const response = await axios.post<IUserProfile>(API_ROUTES.auth.signIn, data, config);

    if (response.data) {
      Cookies.set("accessToken", response?.data?.accessToken);
    }

    await queryClient.setQueryData([API_ROUTES.account.isAuthenticated, {}], () => ({
      accessToken: response.data.accessToken,
    }));

    return response;
  },
}
