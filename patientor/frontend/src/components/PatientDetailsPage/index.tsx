import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";

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
      <h4>
        {patient.ssn ? `ssn: ${patient.ssn}` : null}
        <br></br>
        occupation: {patient.occupation}
        <br></br>
        {patient.dateOfBirth ? `date of birth: ${patient.dateOfBirth}` : null}
      </h4>
    </div>
  );
};

export default PatientDetailsPage;
