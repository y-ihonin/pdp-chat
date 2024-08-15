import { UseQueryOptions, UseMutationOptions, DefaultError } from "@tanstack/react-query";

export interface UseQueryInterface extends Omit<UseQueryOptions, "queryKey"> {
  axiosConfig?: Record<string, unknown>;
}

export interface QueryArgsInterface {
  params?: Record<string, unknown>;
  config?: UseQueryInterface;
}

export interface UseDeleteArgsInterface<TData = unknown, TVariables = unknown> {
  id: string;
  config?: UseMutationOptions<TData, DefaultError, TVariables>;
}

export interface IUseMutation<TData = unknown, TVariables = unknown> {
  params?: Record<string, unknown>;
  config?: UseMutationOptions<TData, DefaultError, TVariables>;
  slug?: string;
}

export interface UseMutationIdInterface<TData = unknown, TVariables = unknown> {
  params?: Record<string, unknown>;
  config?: UseMutationOptions<TData, DefaultError, TVariables>;
  id?: string;
}
