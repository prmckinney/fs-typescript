import { useEffect, useState } from "react";
import { Card } from "@mui/material";

import LocalHospital from "@mui/icons-material/LocalHospital";
import Sick from "@mui/icons-material/Sick";
import Emergency from "@mui/icons-material/Emergency";
import Heart from "@mui/icons-material/Favorite";

import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import diagnosesService from "../../services/diagnoses";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const lookupDiagnosis = (code: string, diagnoses: Diagnosis[]): string => {
  const diagnosis = diagnoses.find((n) => n.code === code);

  if (diagnosis) return diagnosis.name;
  else return "";
};

const renderHealthCheckRating = (param: HealthCheckRating) => {
  switch (param) {
    case HealthCheckRating.Healthy:
      return <Heart sx={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <Heart sx={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <Heart sx={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <Heart sx={{ color: "red" }} />;
    default:
      return assertNever(param);
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setDiagnoses(data);
    };

    getDiagnoses();
  }, []);

  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card variant="outlined">
          {entry.date} <LocalHospital />
          <br />
          <i>{entry.description}</i>
          <br />
          {renderHealthCheckRating(entry.healthCheckRating)}
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {lookupDiagnosis(code, diagnoses)}
              </li>
            ))}
          </ul>
          diagnosed by {entry.specialist}
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card variant="outlined">
          {entry.date} <Sick /> {entry.employerName}
          <br />
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {lookupDiagnosis(code, diagnoses)}
              </li>
            ))}
          </ul>
          {entry.sickLeave ? (
            <div>
              <h4>Sick Leave Granted</h4>
              <ul>Start Date: {entry.sickLeave.startDate}</ul>
              <ul>End Date: {entry.sickLeave.endDate}</ul>
            </div>
          ) : null}
          diagnosed by {entry.specialist}
        </Card>
      );
    case "Hospital":
      return (
        <Card variant="outlined">
          {entry.date} <Emergency />
          <br />
          <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {lookupDiagnosis(code, diagnoses)}
              </li>
            ))}
          </ul>
          Discharged {entry.discharge.date} - {entry.discharge.criteria}
          <br />
          diagnosed by {entry.specialist}
        </Card>
      );
    default:
      return assertNever(entry);
  }
  return "";
};

export default EntryDetails;
