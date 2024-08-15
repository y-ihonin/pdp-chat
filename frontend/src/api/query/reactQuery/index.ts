import { AxiosRequestConfig } from "axios";
import {
  useQuery,
  QueryKey,
} from "@tanstack/react-query";

// helpers
import axios from "src/api/axios"
import removeEmptyParams from "./removeEmptyParams";
import getQueryClient from "./getQueryClient";
import { mutationHooksFactory } from "./mutationHooksFactory";

// interfaces
import { IUseQueryResult } from "src/types/api/IUseQueryResult.interface";
import { UseQueryInterface } from "src/types/api/queryArgs.interface";

export const queryClient = getQueryClient();


type FetcherParams = {
  queryKey: QueryKey;
  offset?: number;
  config?: Record<string, unknown>;
};

export async function fetcher({ queryKey, offset, config = {} }: FetcherParams) {
  const [url, params] = queryKey as [string, Record<string, unknown>];
  const res = await axios.get(url, { params: { ...params, offset: offset || params?.offset }, ...config });

  return res?.data || {};
}

function mutationFnPost(url?: string | null, params?: Record<string, unknown>) {
  return function mutationFn(data: unknown, config?: AxiosRequestConfig) {
    return axios.post(url as string, data, { params: { ...(params || {}), ...(config || {}) } });
  }
}

function mutationFnPatch(url?: string | null, params?: Record<string, unknown>) {
  return function mutationFn(data: unknown, config?: AxiosRequestConfig) {
    return axios.patch(url as string, data, { params: { ...(params || {}), ...(config || {}) } });
  }
}

function mutationFnPut(url?: string | null, params?: Record<string, unknown>) {
  return function mutationFn(data: unknown, config?: AxiosRequestConfig) {
    return axios.put(url as string, data, { params: { ...(params || {}) }, ...(config || {}) });
  }
}

function mutationFnDelete(url?: string | null, params?: Record<string, unknown>) {
  return function mutationFn(id: unknown, config?: AxiosRequestConfig) {
    return axios.delete(`${url}/${id}`, { params: { ...(params || {}), ...(config || {}) } });
  }
}

export function useFetch<T = unknown>(
  url: string | null,
  params?: Record<string, unknown>,
  config?: UseQueryInterface
) {
  const result = useQuery({
    queryKey: [url, removeEmptyParams(params)],
    queryFn: (args) => fetcher({ ...args, config: config?.axiosConfig }),
    enabled: !!config?.enabled || !!url,
    ...(config || {}),
  }, queryClient) as IUseQueryResult<T>;

  return {
    ...result,
    remove: () => queryClient.removeQueries({ queryKey: [url, removeEmptyParams(params)] }),
  };
}

export const usePost = mutationHooksFactory(mutationFnPost);
export const usePatch = mutationHooksFactory(mutationFnPatch);
export const usePut = mutationHooksFactory(mutationFnPut);
export const useDelete = mutationHooksFactory(mutationFnDelete);
