import express, { type Response } from "express";
import diagnosesServices from "../services/diagnoses.ts";
import type { DiagnosesData } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosesData[]>) => {
  const data = diagnosesServices.getEntries();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
