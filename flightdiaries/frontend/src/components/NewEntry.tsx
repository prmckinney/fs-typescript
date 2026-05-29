import { useState } from "react";
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

const NewEntry = ({ addDiary }: CallbackProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [comment, setComment] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log("add log...");
    const newEntry: NewDiaryEntry = {
      weather: weather,
      visibility: visibility,
      date: date,
      comment: comment,
    };

    const newDiary = await diaryService.create(newEntry);
    addDiary(newDiary);

    setDate("");
    setVisibility("great");
    setWeather("sunny");
    setComment("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            date
            <input
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            visibility
            <input
              value={visibility}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            weather
            <input
              value={weather}
              onChange={({ target }) => setWeather(target.value)}
            />
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
