import { useState, SyntheticEvent } from "react";
import axios from "axios";

import { TextField, Button } from "@mui/material";

import { NewEntry } from "../../types";
import patientService from "../../services/patients";

const AddOccupationalHealthcare = ({
  id,
  setError,
}: {
  id: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addEntry = async (id: string, values: NewEntry) => {
    try {
      await patientService.addEntry(id, values);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log("e ==> ", e?.response?.data);
        if (
          e?.response?.data.error &&
          typeof e?.response?.data.error === "string"
        ) {
          const message = e.response.data.error;
          console.error(message);
          setError(message);
        } else {
          console.error("Unrecognized axios error");
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const handleAddEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");

    const sickLeave = startDate || endDate ? { startDate, endDate } : undefined;
    const codes = diagnosisCodes ? diagnosisCodes.split(",") : undefined;

    const newEntry: NewEntry = {
      type: "OccupationalHealthcare",
      date,
      description,
      specialist,
      employerName,
      diagnosisCodes: codes,
      sickLeave: sickLeave,
    };
    addEntry(id, newEntry);
    setDate("");
    setDescription("");
    setSpecialist("");
    setEmployerName("");
    setDiagnosisCodes("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          required={true}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          required={true}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          required={true}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          required={true}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Diagnosis Codes (comma seperated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <h3>Sick Leave</h3>
        <TextField
          label="Start Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={startDate}
          required={false}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          label="End Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={endDate}
          required={false}
          onChange={({ target }) => setEndDate(target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddOccupationalHealthcare;
