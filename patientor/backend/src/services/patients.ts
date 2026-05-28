import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.ts";
import type {
  NonSensitivePatientData,
  NewPatientData,
  PatientData,
} from "../types.ts";

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

const addPatient = (entry: NewPatientData): PatientData => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
