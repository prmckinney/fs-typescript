import diagnosesData from "../../data/diagnoses.ts";
import type { DiagnosesData } from "../types.ts";

const getEntries = (): DiagnosesData[] => {
  return diagnosesData;
};

export default {
  getEntries,
};
