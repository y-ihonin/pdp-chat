import isObject from "lodash/isObject";

export default function removeEmptyParams(sourceObject?: Record<string, unknown>) {
  if (!sourceObject || !isObject(sourceObject) || Array.isArray(sourceObject)) {
    return {};
  }

  const objectToReturn: Record<string, unknown> = {};

  Object.keys(sourceObject).forEach((key) => {
    if (
      typeof sourceObject[key] !== "undefined" &&
      sourceObject[key] !== null &&
      sourceObject[key] !== ""
    ) {
      objectToReturn[key] = sourceObject[key];
    }
  });

  return objectToReturn;
}
