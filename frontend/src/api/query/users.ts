// interfaces
import { QueryArgsInterface } from "src/types/api/queryArgs.interface";
import { IUsersListUser } from "src/types/api/IUsersList.interface";

// helpers
import { useFetch } from "./reactQuery";
import API_ROUTES from "src/api/routes.constant";

const users = {
  usersList: (args?: QueryArgsInterface) => {
    const { params, config } = args || {};

    return useFetch<{ results: IUsersListUser[], count: number }>(API_ROUTES.users.usersList, params, config);
  },
};

export default users;
