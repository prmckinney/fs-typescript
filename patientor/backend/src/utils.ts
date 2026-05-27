export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseString = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing data: " + data);
  }
  return data;
};
