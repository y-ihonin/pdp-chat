// interfaces
import { IUseMutation, QueryArgsInterface } from "src/types/api/queryArgs.interface";
import { IRoomListItem } from "src/types/api/IRoomsList.interface";
import { IMessagesListItem } from "src/types/api/IMessagesList.interface";

// helpers
import { usePost, useFetch } from "./reactQuery";
import { pathToUrl } from "./reactQuery/pathToUrl";
import API_ROUTES from "src/api/routes.constant";


type QueryByIdArgs = {
  id?: string | null;
} & QueryArgsInterface;


const conversion = {
  roomCreate: (args?: IUseMutation) => {
    const { params, config } = args || {};

    return usePost(API_ROUTES.conversion.room, params, config);
  },

  getRoomsList: (args?: QueryArgsInterface) => {
    const { params, config } = args || {};

    return useFetch<{ results: IRoomListItem[], count: number }>(API_ROUTES.conversion.rooms, params, config);
  },

  getRoomMessages: (args?: QueryByIdArgs) => {
    const { params, config, id } = args || {};

    const fetchKey = id ? pathToUrl(API_ROUTES.conversion.roomMessages, { id }) : null;

    return useFetch<IMessagesListItem[]>(fetchKey, params, config);
  },

  getSingleRoom: (args?: QueryByIdArgs) => {
    const { params, config, id } = args || {};

    const fetchKey = id ? pathToUrl(API_ROUTES.conversion.roomSingle, { id }) : null;

    return useFetch<IRoomListItem>(fetchKey, params, config);
  }
};

export default conversion;
