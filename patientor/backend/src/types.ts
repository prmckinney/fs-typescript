import { z } from "zod";

export interface DiagnosesData {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const EntrySchema = z.object({});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export type NewPatientData = z.infer<typeof NewPatientSchema>;
export interface PatientData extends NewPatientData {
  id: string;
}

export type NonSensitivePatientData = Omit<PatientData, "ssn | entries">;
