import { useState, useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "./constants";
import type { DiaryEntry } from "./types";
import Diaries from "./components/Diaries";
import diaryService from "./services/diaries";
import NewEntry from "./components/NewEntry";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchPatientList();
  }, []);

  const addDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <div>
      <NewEntry addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
