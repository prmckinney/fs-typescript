import { useState, SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import axios from "axios";

import { TextField, Button } from "@mui/material";

import { HealthCheckRating, NewEntry } from "../../types";
//import type { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";

const AddHealthCheck = ({ id }: { id: string }) => {
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

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

    const newEntry: NewEntry = {
      type: "HealthCheck",
      date,
      description,
      specialist,
      healthCheckRating: parseInt(healthCheckRating) as HealthCheckRating,
      diagnosisCodes: diagnosisCodes.split(","),
    };
    addEntry(id, newEntry);
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
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
          label="Health Check Rating (0-3)"
          fullWidth
          value={healthCheckRating}
          required={true}
          type="number"
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          label="Diagnosis Codes (comma seperated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddHealthCheck;
