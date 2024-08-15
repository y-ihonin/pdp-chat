"use client";

//helpers
import account from "src/api/query/account";

// interfaces
import { IUserProfile } from "src/types/api/IUserProfile.interface";
import { IUseQueryResult } from "src/types/api/IUseQueryResult.interface";


export interface IUseUserProfile extends Omit<IUseQueryResult<IUserProfile>, "isLoading"> {
  tokens: {
    accessToken: string | undefined;
  };
  isAuthorized: boolean;
  isLoading: boolean;
}

export const HIRER_COMPANY_ROLES = {
  manager: 1,
  staff: 2,
};

export default function useUserProfile(args?: { initIsAuthorized?: boolean }): IUseUserProfile {
  const initIsAuthorized = args?.initIsAuthorized ?? false;

  const { data: isAuthenticated, isLoading } = account.useIsAuthenticated();
  const { data, ...rest } = account.useProfileMe({ config: { enabled: !!isAuthenticated?.accessToken } });

  return {
    ...rest,
    data,
    tokens: {
      accessToken: isAuthenticated?.accessToken,
    },
    isAuthorized: !!isAuthenticated?.accessToken || initIsAuthorized,
    isLoading: !!isLoading || (!!isAuthenticated && rest.isLoading),
  };
}
