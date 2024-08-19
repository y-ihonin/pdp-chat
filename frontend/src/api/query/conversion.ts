// interfaces
import { IUseMutation } from "src/types/api/queryArgs.interface";
import { IRoomListItem } from "src/types/api/IRoomsList.interface";

// helpers
import { usePost, useFetch } from "./reactQuery";
import API_ROUTES from "src/api/routes.constant";

const conversion = {
  roomCreate: (args?: IUseMutation) => {
    const { params, config } = args || {};

    return usePost(API_ROUTES.conversion.room, params, config);
  },

  getRoomsList: (args?: IUseMutation) => {
    const { params, config } = args || {};

    return useFetch<{ results: IRoomListItem[], count: number }>(API_ROUTES.conversion.rooms, params, config);
  },
};

export default conversion;
