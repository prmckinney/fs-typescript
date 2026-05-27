import { Gender } from "./types.ts";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing data: " + data);
  }
  return data;
};

export const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

export const parseGender = (data: unknown): Gender => {
  if (!data || !isString(data) || !isGender(data)) {
    throw new Error("Incorrect or missing data: " + data);
  }
  return data;
};
