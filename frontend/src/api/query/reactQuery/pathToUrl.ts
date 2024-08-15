import { compile } from "path-to-regexp";

export const pathToUrl = (path: string, params: Record<string, string>) => compile(path)(params);
