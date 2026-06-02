import { useEffect, useState } from "react";

import {
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { Diagnosis, NewEntry } from "../../types";
import diagnosesService from "../../services/diagnoses";

const AddBaseEntry = ({
  newEntry,
  setNewEntry,
}: {
  newEntry: NewEntry;
  setNewEntry: React.Dispatch<React.SetStateAction<NewEntry | undefined>>;
}) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setDiagnoses(data);
    };

    getDiagnoses();
  }, []);

  const handleCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    setNewEntry((entry) =>
      entry
        ? {
            ...entry,
            diagnosisCodes:
              typeof event.target.value === "string"
                ? event.target.value.split(",")
                : event.target.value,
          }
        : undefined,
    );
  };

  if (!newEntry) return null;

  return (
    <div>
      <TextField
        label="Date"
        type="date"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        fullWidth
        value={newEntry.date}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry ? { ...entry, date: target.value } : undefined,
          )
        }
      />
      <TextField
        label="Description"
        fullWidth
        value={newEntry.description}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry ? { ...entry, description: target.value } : undefined,
          )
        }
      />
      <TextField
        label="Specialist"
        fullWidth
        value={newEntry.specialist}
        required={true}
        onChange={({ target }) =>
          setNewEntry((entry) =>
            entry ? { ...entry, specialist: target.value } : undefined,
          )
        }
      />
      <InputLabel id="diagnosisCodesLabel">
        Diagnosis Codes
        <Select
          onChange={handleCodeChange}
          value={newEntry.diagnosisCodes}
          labelId="diagnosisCodesLabel"
          multiple
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </InputLabel>
    </div>
  );
};

export default AddBaseEntry;
