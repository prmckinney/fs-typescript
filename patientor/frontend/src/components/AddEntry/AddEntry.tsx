import { useState } from "react";
import { Alert, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import AddHealthCheck from "../AddEntry/AddHealthCheck";
import AddOccupationalHealthcare from "./AddOccupationalHealthcare";
import AddHospital from "./AddHospital";

const AddEntry = ({ id }: { id: string }) => {
  const [error, setError] = useState("");
  const [entryType, setEntryType] = useState("");

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntryType(event.target.value);
  };

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
      {entryType === "HealthCheck" ? (
        <AddHealthCheck id={id} setError={setError} />
      ) : null}
      {entryType === "OccupationalHealthcare" ? (
        <AddOccupationalHealthcare id={id} setError={setError} />
      ) : null}
      {entryType === "Hospital" ? (
        <AddHospital id={id} setError={setError} />
      ) : null}
    </div>
  );
};

export default AddEntry;
