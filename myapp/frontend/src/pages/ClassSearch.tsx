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
import { useContext, useEffect, useRef, useState } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";

const set1 = [
  {
    name: "CECS 440",
    title: "Computer Architecture",
    classes: [
      {
        class: "3196",
        section: "01-SEM Regular",
        times: "TuTh 8:00AM - 8:50AM",
        room: "ECS Room 412",
        instructor: "Jelena Trajkovic",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "3197",
        section: "02-LAB Regular",
        times: "TuTh 9:00AM - 10:15AM",
        room: "ECS Room 412",
        instructor: "Jelena Trajkovic",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "CECS 440H",
    title: "Computer Architecture",
    classes: [
      {
        class: "4843",
        section: "01-SEM Regular",
        times: "TuTh 8:00AM - 8:50AM",
        room: "ECS Room 412",
        instructor: "Jelena Trajkovic",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "4844",
        section: "02-LAB Regular",
        times: "TuTh 9:00AM - 10:15AM",
        room: "ECS Room 412",
        instructor: "Jelena Trajkovic",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "CECS 443",
    title: "Software Project Management and Testing",
    classes: [
      {
        class: "6567",
        section: "01-SEM Regular",
        times: "TuTh 6:30PM - 7:45PM",
        room: "ECS Room 308",
        instructor: "Daniel Link",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "CECS 449",
    title: "Computer Graphics",
    classes: [
      {
        class: "10162",
        section: "01-SEM Regular",
        times: "MoWe 12:30PM - 1:45PM",
        room: "ECS Room 411",
        instructor: "Neal Terrell",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
];

const set2 = [
  {
    name: "ENGL 305",
    title: "Intermediate Creative Writing: Fiction",
    classes: [
      {
        class: "7772",
        section: "01-LEC Regular",
        times: "MoWe 2:00PM - 3:15PM",
        room: "ED2  Room 216",
        instructor: "Kiana Shaley",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "ENGL 306",
    title: "Intermediate Creative Writing: Poetry",
    classes: [
      {
        class: "6879",
        section: "01-LEC Regular",
        times: "MoWe 9:30AM - 10:45AM",
        room: "LA3  Room 206",
        instructor: "Clint Margrave",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "7773",
        section: "02-LEC Regular",
        times: "TuTh 2:00PM - 3:15PM",
        room: "LA3  Room 206",
        instructor: "Clint Margrave",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "ENGL 309",
    title: "Applied Composition For Educators-K-8",
    classes: [
      {
        class: "1422",
        section: "03-SEM Regular",
        times: "TuTh 2:00PM - 3:15PM",
        room: "CINE  Room 203",
        instructor: "Tammy Locklin",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "1423",
        section: "04-SEM Regular",
        times: "We 4:00PM - 6:45PM",
        room: "HC  Room 135",
        instructor: "Margaret Karteron",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "3489",
        section: "05-SEM Regular",
        times: "Tu 4:00PM - 6:45PM",
        room: "LA3  Room 203",
        instructor: "Stephanie Johnson",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
  {
    name: "ENGL 310",
    title: "Applied Composition",
    classes: [
      {
        class: "1424",
        section: "01-SEM Regular",
        times: "MoWe 12:30PM - 1:45PM",
        room: "LA1  Room 310",
        instructor: "Violet Gregory",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "2236",
        section: "01-ACT Regular",
        times: "TBA",
        room: "Online",
        instructor: "Violet Gregory",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "1425",
        section: "03-SEM Regular",
        times: "MoWe 11:00AM - 12:15PM",
        room: "LA2  Room 207",
        instructor: "E. Jann Harris",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
      {
        class: "2237",
        section: "04-ACT Regular",
        times: "TBA",
        room: "Online",
        instructor: "E. Jann Harris",
        dates: "08/25/2025 - 12/10/2025",
        status: true,
      },
    ],
  },
];

export default function ClassSearch() {
  const [enabled, setEnabled] = useState(true);
  const [subject, setSubject] = useState(
    () => localStorage.getItem("subject") ?? "Select"
  );
  const [courseNumberQuery, setCourseNumberQuery] = useState(
    () => localStorage.getItem("courseNumberQuery") ?? "Select"
  );
  const [courseNumber, setCourseNumber] = useState(
    () => localStorage.getItem("courseNumber") ?? ""
  );
  const [courseCareer, setCourseCareer] = useState(
    () => localStorage.getItem("courseCareer") ?? "Select"
  );
  const [modeOfInstruction, setModeOfInstruction] = useState(
    () => localStorage.getItem("modeOfInstruction") ?? "Select"
  );
  const [courses, setCourses] = useState(() =>
    JSON.parse(localStorage.getItem("courses") ?? "[]")
  );
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  useEffect(() => localStorage.setItem("subject", subject));
  useEffect(() => localStorage.setItem("courseNumberQuery", courseNumberQuery));
  useEffect(() => localStorage.setItem("courseNumber", courseNumber));
  useEffect(() => localStorage.setItem("courseCareer", courseCareer));
  useEffect(() => localStorage.setItem("modeOfInstruction", modeOfInstruction));
  useEffect(() => localStorage.setItem("courses", JSON.stringify(courses)));

  function selectSubject(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSubject(e.target.value);
  }

  function selectCourseNumberQuery(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setCourseNumberQuery(e.target.value);
  }

  function selectCourseNumber(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setCourseNumber(e.target.value);
  }

  function selectCourseCareer(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setCourseCareer(e.target.value);
  }

  function selectModeOfInstruction(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setModeOfInstruction(e.target.value);
  }

  function clear(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSubject("Select");
    localStorage.setItem("subject", "Select");
    setCourseNumberQuery("Select");
    localStorage.setItem("courseNumberQuery", "Select");
    setCourseNumber("");
    localStorage.setItem("courseNumber", "");
    setCourseCareer("Select");
    localStorage.setItem("courseCareer", "Select");
    setModeOfInstruction("Select");
    localStorage.setItem("modeOfInstruction", "Select");
    setCourses([]);
    localStorage.setItem("courses", "[]");
  }

  function search(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (
      subject === "Computer Engr & Computer Sci" &&
      courseNumberQuery === "contains" &&
      courseNumber === "44"
    ) {
      setCourses(set1);
    } else if (
      subject === "English" &&
      courseNumberQuery === "contains" &&
      courseNumber === "3"
    ) {
      setCourses(set2);
    } else {
      setCourses([]);
    }
  }

  function selectCourse(
    e: React.MouseEvent<HTMLAnchorElement>,
    courseName: string,
    course
  ) {
    e.preventDefault();
    setShoppingCart([
      ...shoppingCart,
      {
        name: courseName,
        class: course.class,
        section: course.section,
        times: course.time,
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

  return (
    <div className="">
      <form>
        <div className=" space-y-12 sm:space-y-16">
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
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                >
                  Subject
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <select
                      id="subject"
                      name="subject"
                      autoComplete="subject-name"
                      onChange={selectSubject}
                      value={subject}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                    >
                      <option>Select</option>
                      <option>Accountancy</option>
                      <option>Art</option>
                      <option>Art History</option>
                      <option>Astronomy</option>
                      <option>Biology</option>
                      <option>Biomedical</option>
                      <option>Chemical Engineering</option>
                      <option>Civil Engineering</option>
                      <option>Computer Engr & Computer Sci</option>
                      <option>Design</option>
                      <option>Economics</option>
                      <option>Electric Engineering</option>
                      <option>Engineering</option>
                      <option>Engineering Technology</option>
                      <option>English</option>
                      <option>Nursing</option>
                      <option>Physics</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="course-number"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                >
                  Course Number
                </label>
                <div className="grid grid-cols-1 sm:max-w-xs">
                  <select
                    id="course-number-query"
                    name="course-number-query"
                    autoComplete="course-number-query"
                    onChange={selectCourseNumberQuery}
                    value={courseNumberQuery}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                  >
                    <option>Select</option>
                    <option>contains</option>
                    <option>greater than or equal to</option>
                    <option>is exactly</option>
                    <option>less than or equal to</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                  />
                </div>
                <div className="mt-2 sm:col-span-1 sm:mt-0">
                  <input
                    id="course-number"
                    name="course-number"
                    type="text"
                    autoComplete="course-number"
                    onChange={selectCourseNumber}
                    value={courseNumber}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-xs sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="course-career"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                >
                  Course Career
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <select
                      id="course-career"
                      name="course-career"
                      autoComplete="course-career"
                      onChange={selectCourseCareer}
                      value={courseCareer}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                    >
                      <option>Select</option>
                      <option>Non-credit CPaCE</option>
                      <option>Post-baccalaureate</option>
                      <option>Undergraduate</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="mode-of-instruction"
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
                >
                  Mode of Instruction
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="grid grid-cols-1 sm:max-w-xs">
                    <select
                      id="mode-of-instruction"
                      name="mode-of-instruction"
                      autoComplete="mode-of-instruction"
                      onChange={selectModeOfInstruction}
                      value={modeOfInstruction}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base border-2 border-gray-300 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                    >
                      <option>Select</option>
                      <option>Asynch. Online-No Meet Times</option>
                      <option>Face to Face - Off Campus</option>
                      <option>Face to Face - On Campus</option>
                      <option>Hybrid(Face to Face & Synch)</option>
                      <option>Hybrid(Face to Face & Async)</option>
                      <option>Online - Mixed Meet Times</option>
                      <option>Synch. Online - Meet Times</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                    />
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
                  className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5 dark:text-white"
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
            onClick={search}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Search
          </button>
        </div>
      </form>
      {courses.length === 0 ? "No Results" : ""}
      {courses.map((course) => (
        <Disclosure as="div" className="p-6" defaultOpen={true}>
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
