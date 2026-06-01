import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.ts";
import type {
  Entry,
  NewEntry,
  NonSensitivePatientData,
  NewPatientData,
  PatientData,
} from "../types.ts";

const getEntries = (): PatientData[] => {
  return patientData;
};

const getPatientEntry = (id: string): PatientData | undefined => {
  return patientData.find((entry) => entry.id === id);
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
    entries: [],
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = getPatientEntry(id);

  const entry_id: string = uuid();
  const newEntry = {
    id: entry_id,
    ...entry,
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getPatientEntry,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
};
