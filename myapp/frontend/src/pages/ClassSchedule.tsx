import CheckCircleIcon from "@heroicons/react/16/solid/CheckCircleIcon";

const courses = [
  {
    name: "CECS 443-01",
    class: "6567",
    section: "01-SEM Regular",
    times: "TuTh 6:30PM - 7:45PM",
    room: "ECS Room 308",
    instructor: "Daniel Link",
    dates: "08/25/2025 - 12/10/2025",
    status: true,
    units: 3.0,
  },
  {
    name: "CECS 449-01",
    class: "10162",
    section: "01-SEM Regular",
    times: "MoWe 12:30PM - 1:45PM",
    room: "ECS Room 411",
    instructor: "Neal Terrell",
    dates: "08/25/2025 - 12/10/2025",
    status: true,
    units: 3.0,
  },
];

export default function ClassSchedule() {
  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
        Fall 2025 Shopping Cart
      </h2>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
              <thead>
                <tr>
                  
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    CLASS
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
                    UNITS
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {courses.map((section) => (
                  <tr
                    key={section.class}
                    className="even:bg-gray-50 dark:even:bg-gray-800/50"
                  >
                    
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {section.name} ({section.class})
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {section.times}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {section.room}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {section.instructor}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {section.units}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="size-5 text-green-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}