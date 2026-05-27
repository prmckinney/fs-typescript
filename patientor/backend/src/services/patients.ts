import { v1 as uuid } from "uuid";
import patientData from "../../data/patients.ts";
import type {
  NonSensitivePatientData,
  NewPatientData,
  PatientData,
} from "../types.ts";
import { parseString, parseGender } from "../utils.ts";

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

const parseNewPatientEntry = (object: unknown): NewPatientData => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientData = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
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
  parseNewPatientEntry,
  addPatient,
};
