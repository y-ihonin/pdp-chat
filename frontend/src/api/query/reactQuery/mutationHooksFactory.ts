import { AxiosRequestConfig } from "axios";
import {
  useMutation as useReactQueryMutation,
  UseMutationOptions,
  DefaultError,
  UseMutationResult,
} from "@tanstack/react-query";


export type TFetcherFunction = (data: unknown) => Promise<unknown>;

type TMutationFn = (
  url?: string | null,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
  ) => (data?: unknown, axiosConfig?: AxiosRequestConfig) => Promise<unknown>;

export type TUseMutationResult<TData = unknown, TVariables = unknown> = Omit<UseMutationResult<{ data: TData }, DefaultError, TVariables | unknown>, "mutateAsync"> & {
  mutateAsync: (data?: unknown, axiosConfig?: AxiosRequestConfig) => Promise<{ data: TData }>;
};

export function mutationHooksFactory(mutationFn: TMutationFn) {
  const useMutation = <TData = unknown, TVariables = unknown>(
    url?: string | null,
    params?: Record<string, unknown>,
    options?: UseMutationOptions<TData, DefaultError, TVariables> & { axiosConfig?: AxiosRequestConfig }
  ) => useReactQueryMutation<TData, DefaultError, TVariables>(
    {
      mutationFn: mutationFn(url, params, options?.axiosConfig),
      mutationKey: [url],
      ...(options || {})
    } as unknown as UseMutationOptions<TData, DefaultError, TVariables>
  ) as TUseMutationResult<TData, TVariables>;

  return useMutation;
}
