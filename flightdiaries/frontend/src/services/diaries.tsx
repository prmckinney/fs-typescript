import axios from "axios";

import { apiBaseUrl } from "../constants";
import type { DiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(`${apiBaseUrl}/api/diaries`);

  return data;
};

// const create = async (object: PatientFormValues) => {
//   const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

//   return data;
// };

export default {
  getAll,
  //  create,
};
