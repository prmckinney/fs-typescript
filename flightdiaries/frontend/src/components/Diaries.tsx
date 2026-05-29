import type { DiaryEntry } from "../types";

interface DiaryProps {
  diaries: DiaryEntry[];
}

const Diaries = (props: DiaryProps) => {
  console.log(props.diaries);
  return props.diaries.map((diary) => (
    <li key={diary.date}>
      <h3>{diary.date}</h3>
      Weather: {diary.weather}
      <br></br>
      Visibility: {diary.visibility}
      <br></br>
      {diary.comment}
    </li>
  ));
};

export default Diaries;
