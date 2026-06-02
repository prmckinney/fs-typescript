import { TextField } from "@mui/material";

import { NewEntry } from "../../types";

const AddHospital = ({
  newEntry,
  setNewEntry,
}: {
  newEntry: NewEntry;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntry | undefined>>;
}) => {
  if (newEntry && newEntry.type !== "Hospital") return null;
  return (
    <div>
      <TextField
        label="Discharge Date"
        type="date"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        fullWidth
        value={newEntry.discharge.date}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry && entry.type === "Hospital"
              ? {
                  ...entry,
                  discharge: { ...entry.discharge, date: target.value },
                }
              : undefined,
          )
        }
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={newEntry.discharge.criteria}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry && entry.type === "Hospital"
              ? {
                  ...entry,
                  discharge: { ...entry.discharge, criteria: target.value },
                }
              : undefined,
          )
        }
      />
    </div>
  );
};

export default AddHospital;
