import patientData from "../../data/patients.ts";
import type { NonSensitivePatientData, PatientData } from "../types.ts";

const getEntries = (): PatientData[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries,
};
