import axios from "axios";

import { apiBaseUrl } from "../constants";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/api/diaries`);

  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/api/diaries`,
    object,
  );

  return data;
};

export default {
  getAll,
  create,
};
