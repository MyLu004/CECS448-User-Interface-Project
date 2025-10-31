"use client";
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../components/ShoppingCartContext";


// CONSTANT IMPORT
import type { Course } from "../../constants/courses";
import { CSCE_course as CECS, ENGL_course as ENGL } from "../../constants/courses";
import { SUBJECTS, type Subject } from "../../constants/subjects";

import { SelectField } from "../components/SelectField";

import {
  COURSE_NUMBER_QUERY_OPS,
  // type NumberQueryOp,
  CAREERS,
  type Career,
  MODES,
  type Mode,
} from "../../constants/select-option";

type CourseRow = Course["classes"][number];

export default function ClassSearch() {
  
  const SUBJECT_TO_DATA: Record<string, Course[]> = {
    "Computer Engr & Computer Sci": CECS,
    English: ENGL,
  };

  type NumberQueryOp = "contains" | "equals" | "startsWith" | "endsWith";

  // helpers
  const setLS = (k: string, v: unknown) =>
  localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));

  const digits = (s: string) => s.replace(/\D+/g, ""); // "CECS 440H" -> "440"
  const matchesCourseNumber = (
    course: Course,
    q: string,
    op: NumberQueryOp
  ) => {
    const nameDigits = digits(course.name);
    const queryDigits = digits(q);
    if (!queryDigits) return true; // no number filter entered
    switch (op) {
      case "equals":
        return nameDigits === queryDigits;
      case "startsWith":
        return nameDigits.startsWith(queryDigits);
      case "endsWith":
        return nameDigits.endsWith(queryDigits);
      case "contains":
      default:
        return nameDigits.includes(queryDigits);
    }
  };

  const [enabled, setEnabled] = useState(true);
  const [subject, setSubject] = useState<Subject>(
  () => (localStorage.getItem("subject") as Subject) ?? "Select"
);

  const [courseNumberQuery, setCourseNumberQuery] = useState<NumberQueryOp>(
    () => (localStorage.getItem("courseNumberQuery") as NumberQueryOp) ?? "contains"
  );
  const [courseNumber, setCourseNumber] = useState<string>(
    () => localStorage.getItem("courseNumber") ?? ""
  );
  const [courseCareer, setCourseCareer] = useState<Career | "">(
    () => (localStorage.getItem("courseCareer") as Career) ?? ""
  );
  const [modeOfInstruction, setModeOfInstruction] = useState<Mode | "">(
    () => (localStorage.getItem("modeOfInstruction") as Mode) ?? ""
  );

  const [courses, setCourses] = useState<Course[]>(() => {
    try { return JSON.parse(localStorage.getItem("courses") ?? "[]"); }
    catch { return []; }
  });

  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);


  useEffect(() => setLS("subject", subject), [subject]);
  useEffect(() => setLS("courseNumberQuery", courseNumberQuery), [courseNumberQuery]);
  useEffect(() => setLS("courseNumber", courseNumber), [courseNumber]);
  useEffect(() => setLS("courseCareer", courseCareer), [courseCareer]);
  useEffect(() => setLS("modeOfInstruction", modeOfInstruction), [modeOfInstruction]);
  useEffect(() => setLS("courses", courses), [courses]);

 
const clear = () => {
  setSubject("Select" as Subject);
  setCourseNumberQuery("contains" as NumberQueryOp);
  setCourseNumber("");
  setCourseCareer("" as Career | "");
  setModeOfInstruction("" as Mode | "");
  setCourses([]);
};


// improved search
function runSearch() {
  const pool = SUBJECT_TO_DATA[subject] ?? [];
  const filtered = pool.filter((c) =>
    matchesCourseNumber(c, courseNumber, courseNumberQuery as NumberQueryOp)
  );
  setCourses(filtered);
}

function selectCourse(
    e: React.MouseEvent<HTMLAnchorElement>,
    courseName: string,
    course: CourseRow
  ) {
    e.preventDefault();
    setShoppingCart([
      ...shoppingCart,
      {
        name: courseName,
        class: course.class,
        section: course.section,
        times: course.times,
        room: course.room,
        instructor: course.instructor,
        dates: course.dates,
        status: course.status,
        units: 3.0,
      },
    ]);
  }

  function isAddedToCart(clazz: string): boolean {
    for (let item of shoppingCart) {
      if (item.class === clazz) {
        return true;
      }
    }
    return false;
  }

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log({ subject, courseNumberQuery, courseNumber }); // ← remove later

  runSearch();
}

 
  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className=" space-y-12 sm:space-y-16 ">
          <div>
            <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
              Class Search
            </h2>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-600 dark:text-gray-400">
              Select at least 2 search criteria. Select Search to view your
              search results.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:border-t-gray-900/10 sm:pb-0 dark:border-white/10 dark:sm:divide-white/10 dark:sm:border-t-white/10">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="subject"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-black"
                >
                  Subject
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <SelectField
                      id="subject"
                      value={subject}
                      options={SUBJECTS}
                      placeholder="Select subject…"
                      onValueChange={(v) => setSubject(v as Subject)}
                    />

                    {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    /> */}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="course-number"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-black"
                >
                  Course Number
                </label>
                <div className="grid grid-cols-1 sm:max-w-xs">
                  <SelectField
                    id="course-number-query"
                    value={courseNumberQuery}
                    options={COURSE_NUMBER_QUERY_OPS}
                    placeholder="Number match…"
                    onValueChange={(v) => setCourseNumberQuery(v as NumberQueryOp)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                  />
                </div>
                <div className="mt-2 sm:col-span-1 sm:mt-0">
                  <input
                    id="course-number"
                    name="course-number"
                    type="text"
                    autoComplete="course-number"
                    value={courseNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseNumber(e.currentTarget.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="course-career"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-black"
                >
                  Course Career
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <SelectField
                        id="course-career"
                        value={courseCareer ?? ""}
                        options={CAREERS}
                        placeholder="Select career…"
                        onValueChange={(v) => setCourseCareer(v as Career | "")}
                      />
                    {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    /> */}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="mode-of-instruction"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-black"
                >
                  Mode of Instruction
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <SelectField
                      id="mode-of-instruction"
                      value={modeOfInstruction ?? ""}
                      options={MODES}
                      placeholder="Select mode…"
                      onValueChange={(v) => setModeOfInstruction(v as Mode | "")}
                    />
                    {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    /> */}
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
                >
                  <CheckIcon className=" size-4 fill-black group-data-checked:block" />
                </Checkbox>
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-black"
                >
                  Show Open Classes Only
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={clear}
            className="inline-flex justify-center rounded-md px-3 py-2 text-sm bg-red-700 font-semibold text-white dark:text-black"
          >
            Clear
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Search
          </button>
        </div>
      </form >
      {courses.length === 0 ? "No Results" : ""}
      {courses.map((course) => (
        <Disclosure as="div" className="p-6" defaultOpen={true} key={course.name}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-sm/6 font-medium text-black dark:text-white group-data-hover:text-black/80 dark:group-data-hover:text-white/80">
              {course.name} - {course.title}
            </span>
            <ChevronDownIcon className="size-5 fill-black/60 dark:fill-white/60 group-data-hover:fill-black/50 dark:group-data-hover:fill-white/50 group-data-open:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-black/50 dark:text-white/50">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3 dark:text-white"
                        >
                          CLASS
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          SECTION
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          DAYS & TIMES
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          ROOM
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          INSTRUCTOR
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          MEETING DATES
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          STATUS
                        </th>
                        <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900">
                      {course.classes.map((clazz) => (
                        <tr
                          key={clazz.class}
                          className="even:bg-gray-50 dark:even:bg-gray-800/50"
                        >
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3 dark:text-white">
                            {clazz.class}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {clazz.section}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {clazz.times}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {clazz.room}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {clazz.instructor}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {clazz.dates}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            <CheckCircleIcon
                              aria-hidden="true"
                              className="size-5 text-green-700"
                            />
                          </td>
                          <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-3">
                            {isAddedToCart(clazz.class) ? (
                              <CheckIcon className="size-6 text-green-500" />
                            ) : (
                              <a
                                onClick={(e) =>
                                  selectCourse(e, course.name, clazz)
                                }
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                Select
                                <span className="sr-only">, {clazz.class}</span>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
}
