// interfaces
import { IUseMutation } from "src/types/api/queryArgs.interface";

// helpers
import { usePost } from "./reactQuery";
import API_ROUTES from "src/api/routes.constant";

const conversion = {
  roomCreate: (args?: IUseMutation) => {
    const { params, config } = args || {};

    return usePost(API_ROUTES.conversion.room, params, config);
  },
};

export default conversion;
