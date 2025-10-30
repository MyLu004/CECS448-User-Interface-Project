// src/constants/select-options.ts
export const COURSE_NUMBER_QUERY_OPS = [
  { value: "contains",   label: "Contains" },
  { value: "equals",     label: "Equals" },
  { value: "startsWith", label: "Starts with" },
  { value: "endsWith",   label: "Ends with" },
] as const;
export type NumberQueryOp = typeof COURSE_NUMBER_QUERY_OPS[number]["value"];

export const CAREERS = [
  { value: "UGRD", label: "Undergraduate" },
  { value: "GRAD", label: "Graduate" },
  { value: "PBAC", label: "Post-baccalaureate" },
  { value: "EXTN", label: "Extension" },
] as const;
export type Career = typeof CAREERS[number]["value"];

export const MODES = [
  { value: "IN_PERSON", label: "In-Person" },
  { value: "ONLINE",    label: "Online" },
  { value: "HYBRID",    label: "Hybrid" },
] as const;
export type Mode = typeof MODES[number]["value"];
