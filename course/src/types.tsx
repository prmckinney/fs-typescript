export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDetails extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartDetails {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartDetails {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartDetails {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
