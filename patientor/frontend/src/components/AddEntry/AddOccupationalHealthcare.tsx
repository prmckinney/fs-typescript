import { TextField } from "@mui/material";

import { NewEntry } from "../../types";

const AddOccupationalHealthcare = ({
  newEntry,
  setNewEntry,
}: {
  newEntry: NewEntry;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntry | undefined>>;
}) => {
  if (newEntry && newEntry.type !== "OccupationalHealthcare") return null;

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event ==> ", event.target.value);

    if (newEntry.sickLeave) {
      setNewEntry((entry) =>
        entry && entry.type === "OccupationalHealthcare" && entry.sickLeave
          ? {
              ...entry,
              sickLeave: { ...entry.sickLeave, startDate: event.target.value },
            }
          : undefined,
      );
    } else {
      setNewEntry((entry) =>
        entry && entry.type === "OccupationalHealthcare"
          ? {
              ...entry,
              sickLeave: { startDate: event.target.value, endDate: "" },
            }
          : undefined,
      );
    }
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event ==> ", event.target.value);

    if (newEntry.sickLeave) {
      setNewEntry((entry) =>
        entry && entry.type === "OccupationalHealthcare" && entry.sickLeave
          ? {
              ...entry,
              sickLeave: {
                ...entry.sickLeave,
                endDate: event.target.value,
              },
            }
          : undefined,
      );
    } else {
      setNewEntry((entry) =>
        entry && entry.type === "OccupationalHealthcare"
          ? {
              ...entry,
              sickLeave: { startDate: "", endDate: event.target.value },
            }
          : undefined,
      );
    }
  };

  return (
    <div>
      <TextField
        label="Employer Name"
        fullWidth
        value={newEntry.employerName}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry ? { ...entry, employerName: target.value } : undefined,
          )
        }
      />
      <h3>Sick Leave</h3>
      <TextField
        label="Start Date"
        type="date"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        fullWidth
        value={newEntry.sickLeave ? newEntry.sickLeave.startDate : ""}
        required={false}
        onChange={handleStartDate}
      />
      <TextField
        label="End Date"
        type="date"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        fullWidth
        value={newEntry.sickLeave ? newEntry.sickLeave.endDate : ""}
        required={false}
        onChange={handleEndDate}
      />
    </div>
  );
};

export default AddOccupationalHealthcare;
