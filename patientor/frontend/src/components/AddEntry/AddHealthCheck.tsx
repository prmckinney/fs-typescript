import { Select, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";

import { HealthCheckRating, NewEntry } from "../../types";

const AddHealthCheck = ({
  newEntry,
  setNewEntry,
}: {
  newEntry: NewEntry;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntry | undefined>>;
}) => {
  if (newEntry && newEntry.type !== "HealthCheck") return null;

  const handleChange = (event: SelectChangeEvent<HealthCheckRating>) => {
    event.preventDefault();
    setNewEntry((entry) =>
      entry ? { ...entry, healthCheckRating: event.target.value } : undefined,
    );
  };

  return (
    <div>
      <InputLabel id="healthCheckRatingLabel">
        Health Check Rating
        <Select
          onChange={handleChange}
          value={newEntry.healthCheckRating}
          labelId="healthCheckRatingLabel"
          required={true}
        >
          <MenuItem value={0}>Healthy</MenuItem>
          <MenuItem value={1}>LowRisk</MenuItem>
          <MenuItem value={2}>HighRisk</MenuItem>
          <MenuItem value={3}>CriticalRisk</MenuItem>
        </Select>
      </InputLabel>
    </div>
  );
};

export default AddHealthCheck;
