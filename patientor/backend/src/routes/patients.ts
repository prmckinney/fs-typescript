import express, { type Response } from "express";
import patientServices from "../services/patients.ts";
import type { NewPatientData, NonSensitivePatientData } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const data = patientServices.getNonSensitiveEntries();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry: NewPatientData =
      patientServices.parseNewPatientEntry(req.body);
    const addedEntry = patientServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
