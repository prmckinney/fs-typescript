import { SyntheticEvent, useState } from "react";
import {
  Alert,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import patientService from "../../services/patients";
import { Entry, NewEntry } from "../../types";

import AddBaseEntry from "./AddBaseEntry";
import AddHealthCheck from "../AddEntry/AddHealthCheck";
import AddOccupationalHealthcare from "./AddOccupationalHealthcare";
import AddHospital from "./AddHospital";
import axios from "axios";

const AddEntry = ({
  id,
  updatePatient,
}: {
  id: string;
  updatePatient: (entry: Entry) => void;
}) => {
  const [error, setError] = useState("");
  const [entryType, setEntryType] = useState("");
  const [newEntry, setNewEntry] = useState<NewEntry | undefined>();

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntryType(event.target.value);
    switch (event.target.value) {
      case "HealthCheck": {
        setNewEntry({
          type: "HealthCheck",
          date: "",
          description: "",
          specialist: "",
          healthCheckRating: 0,
          diagnosisCodes: [],
        });
        break;
      }
      case "OccupationalHealthcare": {
        setNewEntry({
          type: "OccupationalHealthcare",
          date: "",
          description: "",
          specialist: "",
          diagnosisCodes: [],
          employerName: "",
        });
        break;
      }
      case "Hospital": {
        setNewEntry({
          type: "Hospital",
          date: "",
          description: "",
          specialist: "",
          diagnosisCodes: [],
          discharge: {
            date: "",
            criteria: "",
          },
        });
        break;
      }
    }
  };

  const addEntry = async (id: string, values: NewEntry) => {
    try {
      const newEntry = await patientService.addEntry(id, values);
      updatePatient(newEntry);
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

    if (newEntry) addEntry(id, newEntry);
  };

  console.log(newEntry);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Select onChange={handleTypeChange} value={entryType}>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
      </Select>
      {newEntry ? (
        <form onSubmit={handleAddEntry}>
          <AddBaseEntry newEntry={newEntry} setNewEntry={setNewEntry} />
          {entryType === "HealthCheck" ? (
            <AddHealthCheck newEntry={newEntry} setNewEntry={setNewEntry} />
          ) : null}
          {entryType === "OccupationalHealthcare" ? (
            <AddOccupationalHealthcare
              newEntry={newEntry}
              setNewEntry={setNewEntry}
            />
          ) : null}
          {entryType === "Hospital" ? (
            <AddHospital newEntry={newEntry} setNewEntry={setNewEntry} />
          ) : null}
          <Button type="submit" variant="contained">
            Add
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default AddEntry;
