import express from "express";
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

import patientServices from "../services/patients.ts";
import type {
  NonSensitivePatientData,
  NewPatientData,
  PatientData,
} from "../types.ts";
import { NewPatientSchema } from "../types.ts";

const router = express.Router();

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const data = patientServices.getNonSensitiveEntries();
  res.send(data);
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

router.use(errorMiddleware);

export default router;
