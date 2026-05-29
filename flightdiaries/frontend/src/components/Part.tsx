import type { CoursePart } from "../types";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <i>{props.description}</i>
        </div>
      );
    case "background":
      return (
        <div>
          <i>{props.description}</i>
          <br></br>
          Background Material: {props.backgroundMaterial}
        </div>
      );
    case "group":
      return <div>Contains {props.groupProjectCount} Group Projects</div>;
    case "special":
      return (
        <div>
          <i>{props.description}</i>
          <br></br>
          Requirements: {props.requirements.join(", ")}
        </div>
      );
  }
};

export default Part;
