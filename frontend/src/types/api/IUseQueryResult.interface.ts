import { UseQueryResult } from "@tanstack/react-query";

export type IUseQueryResult<T> = UseQueryResult<T> & {
  remove: () => void;
}
