import { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { Diagnosis, NewEntry } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const AddHospital = ({
  id,
  setError,
}: {
  id: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setDiagnoses(data);
    };

    getDiagnoses();
  }, []);

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
      type: "Hospital",
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes,
      discharge: { date: dischargeDate, criteria: criteria },
    };
    addEntry(id, newEntry);
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
  };

  const handleCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    setDiagnosisCodes(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value,
    );
  };

  return (
    <div>
      <form onSubmit={handleAddEntry}>
        <TextField
          label="Date"
          type="date"
          slotProps={{
            inputLabel: { shrink: true },
          }}
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
        <InputLabel required={true} id="diagnosisCodesLabel">
          Diagnosis Codes
          <Select
            onChange={handleCodeChange}
            value={diagnosisCodes}
            labelId="diagnosisCodesLabel"
            required={true}
            multiple
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem value={diagnosis.code}>
                {diagnosis.code} - {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </InputLabel>
        <TextField
          label="Discharge Date"
          type="date"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          fullWidth
          value={dischargeDate}
          required={true}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="Discharge Criteria"
          fullWidth
          value={criteria}
          required={true}
          onChange={({ target }) => setCriteria(target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddHospital;
