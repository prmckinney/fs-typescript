import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return props.courses.map((course) => (
    <li key={course.name}>
      <h3>
        {course.name} {course.exerciseCount}
      </h3>
      <Part {...course} />
    </li>
  ));
};

export default Content;
