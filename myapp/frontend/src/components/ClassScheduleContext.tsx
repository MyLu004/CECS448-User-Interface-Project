import { createContext, useEffect, useState } from "react";

export type ClassScheduleItem = {
  name: string;
  class: string;
  section: string;
  times: string;
  room: string;
  instructor: string;
  dates: string;
  status: boolean;
  units: number;
};

type ClassScheduleCtx = {
  classSchedule: ClassScheduleItem[];
  setClassSchedule: React.Dispatch<React.SetStateAction<ClassScheduleItem[]>>;
};
const ClassScheduleContext = createContext<ClassScheduleCtx>({
  classSchedule: [],
  setClassSchedule: () => {},
});

function ClassScheduleContextProvider({ children }: { children: React.ReactNode }) {
  const [classSchedule, setClassSchedule] = useState<ClassScheduleItem[]>(() => JSON.parse(localStorage.getItem("classSchedule") ?? "[]"));

  useEffect(() => {
    localStorage.setItem("classSchedule", JSON.stringify(classSchedule));
  }, [classSchedule]);

  return (
    <ClassScheduleContext.Provider value={{ classSchedule, setClassSchedule}}>
      {children}
    </ClassScheduleContext.Provider>
  );
}

export {ClassScheduleContext, ClassScheduleContextProvider};