import express from "express";
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

import patientServices from "../services/patients.ts";
import type {
  Entry,
  NewEntry,
  NonSensitivePatientData,
  NewPatientData,
  PatientData,
} from "../types.ts";
import { NewEntrySchema, NewPatientSchema } from "../types.ts";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: z.prettifyError(error) });
  } else {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const data = patientServices.getNonSensitiveEntries();
  res.send(data);
});

router.get("/:id", (req, res: Response<PatientData>) => {
  const data = patientServices.getPatientEntry(req.params.id);
  if (data) res.send(data);
  else res.sendStatus(404);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientData>,
    res: Response<PatientData>,
  ) => {
    const addedEntry = patientServices.addPatient(req.body);
    res.json(addedEntry);
  },
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientServices.addEntry(req.params.id, req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
