import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";

const renderEntries = (patient: Patient) => {
  if (!patient.entries) return null;

  return (
    <div>
      <h2>Entries</h2>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
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
  const id = useParams().id;
  useEffect(() => {
    const getPatient = async (id: string) => {
      const data = await patientService.getPatient(id);
      setPatient(data);
    };

    if (id) getPatient(id);
  }, [id, setPatient]);

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
      {renderEntries(patient)}
    </div>
  );
};

export default PatientDetailsPage;
