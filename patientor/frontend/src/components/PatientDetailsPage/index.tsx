import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Diagnosis, Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./entry";

const lookupDiagnosis = (code: string, diagnoses: Diagnosis[]): string => {
  const diagnosis = diagnoses.find((n) => n.code === code);

  if (diagnosis) return diagnosis.name;
  else return "";
};

const renderGender = (param: Gender) => {
  switch (param) {
    case Gender.Male:
      return <MaleIcon fontSize="large" />;
    case Gender.Female:
      return <FemaleIcon fontSize="large" />;
    case Gender.Other:
      return <TransgenderIcon fontSize="large" />;
  }
};

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    const getDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setDiagnoses(data);
    };

    getDiagnoses();
  }, []);

  useEffect(() => {
    const getPatient = async (id: string) => {
      const data = await patientService.getPatient(id);
      setPatient(data);
    };

    if (id) getPatient(id);
  }, [id]);

  if (!patient) return null;

  return (
    <div className="App">
      <h1>
        {patient.name}
        {renderGender(patient.gender)}
      </h1>
      <p>
        {patient.ssn ? `ssn: ${patient.ssn}` : null}
        <br></br>
        occupation: {patient.occupation}
        <br></br>
        {patient.dateOfBirth ? `date of birth: ${patient.dateOfBirth}` : null}
      </p>
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} />
      ))}
    </div>
  );
};

export default PatientDetailsPage;
