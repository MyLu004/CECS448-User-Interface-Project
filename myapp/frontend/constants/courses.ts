// src/constants/courses.ts

export type ClassSection = {
  class: string;
  section: string;
  times: string;
  room: string;
  instructor: string;
  dates: string;
  status: boolean;
};

export type Course = {
  name: string;
  title: string;
  classes: ClassSection[];
};

// ---- CECS results
export const CSCE_course: Course[] = [
  {
    name: "CECS 323",
    title: "Database",

    // TODO : FIX THE CLASS SECTION
    classes: [
      { class: "3196", section: "01-SEM Regular", times: "TuTh 8:00AM - 8:50AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "3197", section: "02-LAB Regular", times: "TuTh 9:00AM - 10:15AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "CECS 440",
    title: "Computer Architecture",
    classes: [
      { class: "3196", section: "01-SEM Regular", times: "TuTh 8:00AM - 8:50AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "3197", section: "02-LAB Regular", times: "TuTh 9:00AM - 10:15AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "CECS 440H",
    title: "Computer Architecture",
    classes: [
      { class: "4843", section: "01-SEM Regular", times: "TuTh 8:00AM - 8:50AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "4844", section: "02-LAB Regular", times: "TuTh 9:00AM - 10:15AM", room: "ECS Room 412", instructor: "Jelena Trajkovic", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "CECS 443",
    title: "Software Project Management and Testing",
    classes: [
      { class: "6567", section: "01-SEM Regular", times: "TuTh 6:30PM - 7:45PM", room: "ECS Room 308", instructor: "Daniel Link", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "CECS 449",
    title: "Computer Graphics",
    classes: [
      { class: "10162", section: "01-SEM Regular", times: "MoWe 12:30PM - 1:45PM", room: "ECS Room 411", instructor: "Neal Terrell", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
];

// ---- ENGL results
export const ENGL_course: Course[] = [
  {
    name: "ENGL 305",
    title: "Intermediate Creative Writing: Fiction",
    classes: [
      { class: "7772", section: "01-LEC Regular", times: "MoWe 2:00PM - 3:15PM", room: "ED2  Room 216", instructor: "Kiana Shaley", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "ENGL 306",
    title: "Intermediate Creative Writing: Poetry",
    classes: [
      { class: "6879", section: "01-LEC Regular", times: "MoWe 9:30AM - 10:45AM", room: "LA3  Room 206", instructor: "Clint Margrave", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "7773", section: "02-LEC Regular", times: "TuTh 2:00PM - 3:15PM", room: "LA3  Room 206", instructor: "Clint Margrave", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "ENGL 309",
    title: "Applied Composition For Educators-K-8",
    classes: [
      { class: "1422", section: "03-SEM Regular", times: "TuTh 2:00PM - 3:15PM", room: "CINE  Room 203", instructor: "Tammy Locklin", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "1423", section: "04-SEM Regular", times: "We 4:00PM - 6:45PM", room: "HC  Room 135", instructor: "Margaret Karteron", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "3489", section: "05-SEM Regular", times: "Tu 4:00PM - 6:45PM", room: "LA3  Room 203", instructor: "Stephanie Johnson", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
  {
    name: "ENGL 310",
    title: "Applied Composition",
    classes: [
      { class: "1424", section: "01-SEM Regular", times: "MoWe 12:30PM - 1:45PM", room: "LA1  Room 310", instructor: "Violet Gregory", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "2236", section: "01-ACT Regular", times: "TBA", room: "Online", instructor: "Violet Gregory", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "1425", section: "03-SEM Regular", times: "MoWe 11:00AM - 12:15PM", room: "LA2  Room 207", instructor: "E. Jann Harris", dates: "08/25/2025 - 12/10/2025", status: true },
      { class: "2237", section: "04-ACT Regular", times: "TBA", room: "Online", instructor: "E. Jann Harris", dates: "08/25/2025 - 12/10/2025", status: true },
    ],
  },
];
