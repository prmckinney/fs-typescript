import { z } from "zod";

export interface DiagnosesData {
  code: string;
  name: string;
  latin?: string;
}

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.optional(z.array(z.string())),
});

type BaseEntry = z.infer<typeof BaseEntrySchema>;
export type NewBaseEntry = Omit<BaseEntry, "id">;

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<DiagnosesData["code"]>;
// }

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

// interface HealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: HealthCheckRating;
// }

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
});

// interface Discharge {
//   date: string;
//   criteria: string;
// }

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

// interface HospitalEntry extends BaseEntry {
//   type: "Hospital";
//   discharge: Discharge;
// }

const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

// interface SickLeave {
//   startDate: string;
//   endDate: string;
// }

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.optional(SickLeaveSchema),
});

// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";
//   employerName: string;
//   sickLeave?: SickLeave;
// }

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export type Entry = z.infer<typeof EntrySchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, "id">;

export const NewEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HealthCheckEntrySchema.omit({ id: true }),
]);

// export type Entry =
//   | HospitalEntry
//   | OccupationalHealthcareEntry
//   | HealthCheckEntry;

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatientData = z.infer<typeof NewPatientSchema>;

export interface PatientData extends NewPatientData {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatientData = Omit<PatientData, "ssn" | "entries">;
