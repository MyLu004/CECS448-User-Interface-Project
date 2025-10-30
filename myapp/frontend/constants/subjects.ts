export const SUBJECTS = [
  "Select",
  "Accountancy",
  "Art",
  "Art History",
  "Astronomy",
  "Biology",
  "Biomedical",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Engr & Computer Sci",
  "Design",
  "Economics",
  "Electric Engineering",
  "Engineering",
  "Engineering Technology",
  "English",
  "Nursing",
  "Physics",
] as const;

export type Subject = typeof SUBJECTS[number];