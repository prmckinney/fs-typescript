import { useState } from "react";
import axios from "axios";

import diaryService from "../services/diaries";
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "../types";

interface CallbackProps {
  addDiary: (diary: DiaryEntry) => void;
}

const isWeather = (weather: string): weather is Weather => {
  return Object.values(Weather).includes(weather as Weather);
};

const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility).includes(visibility as Visibility);
};

const NewEntry = ({ addDiary }: CallbackProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("add log...");
    try {
      if (isWeather(weather) && isVisibility(visibility)) {
        const newEntry: NewDiaryEntry = {
          weather: weather,
          visibility: visibility,
          date: date,
          comment: comment,
        };

        const newDiary = await diaryService.create(newEntry);
        addDiary(newDiary);

        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setError("");
      } else {
        setError("Visibility or Weather have invalid type");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error[0].message);
      }
    }
  };

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <form onSubmit={submit}>
        <div>
          <label>
            date
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility:
            {Object.values(Visibility).map((key) => {
              return (
                <span>
                  <input
                    type="radio"
                    name="visibility"
                    value={key}
                    id={key}
                    onChange={() => setVisibility(key)}
                  />
                  <label htmlFor={key}>{key}</label>
                </span>
              );
            })}
          </label>
        </div>
        <div>
          <label>
            Weather:
            {Object.values(Weather).map((key) => {
              return (
                <span>
                  <input
                    type="radio"
                    name="weather"
                    value={key}
                    id={key}
                    onChange={() => setWeather(key)}
                  />
                  <label htmlFor={key}>{key}</label>
                </span>
              );
            })}
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <button type="submit">add entry</button>
      </form>
    </div>
  );
};

export default NewEntry;
