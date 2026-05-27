import express, { type Response } from "express";
import patientServices from "../services/patients.ts";
import type { NonSensitivePatientData } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const data = patientServices.getNonSensitiveEntries();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
