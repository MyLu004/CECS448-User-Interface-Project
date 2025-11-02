// pages/ClassSchedule.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "../components/ShoppingCartContext";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// FullCalendar v6 CSS:
// import "@fullcalendar/core/index.css";
// import "@fullcalendar/timegrid/index.css";

const DAY_TOKENS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

function startOfWeek(d = new Date()) {
  // Monday = 0
  const day = (d.getDay() + 6) % 7; // 0..6 (Mon..Sun)
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  out.setDate(out.getDate() - day);
  return out;
}

function toMinutes(time: string) {
  // "6:30PM" or "12:05 AM" -> minutes
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!m) return NaN;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const isPM = m[3].toUpperCase() === "PM";
  if (h === 12) h = isPM ? 12 : 0;
  else if (isPM) h += 12;
  return h * 60 + min;
}

function parseDays(tokenStr: string): number[] {
  // returns indices 0..6 (Mon..Sun)
  const days: number[] = [];
  let s = tokenStr.trim();
  while (s.length >= 2) {
    const t = s.slice(0, 2) as (typeof DAY_TOKENS)[number];
    const i = DAY_TOKENS.indexOf(t);
    if (i >= 0) {
      days.push(i);
      s = s.slice(2);
    } else break;
  }
  return days;
}

function buildEventsFromCart(
  cart: Array<{
    name: string;
    room: string;
    times: string; // e.g., "MoWe 12:30PM - 1:45PM"
  }>,
  weekAnchor = new Date()
) {
  const week0 = startOfWeek(weekAnchor); // Monday 00:00
  const events: { title: string; start: Date; end: Date; extendedProps?: any }[] = [];

  for (const item of cart) {
    const m =
      item.times &&
      item.times.match(
        /^([A-Za-z]{2,10})\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)$/i
      );
    if (!m) continue;

    const [_, dayStr, startRaw, endRaw] = m;
    const startMin = toMinutes(startRaw.replace(/\s+/g, "").toUpperCase());
    const endMin = toMinutes(endRaw.replace(/\s+/g, "").toUpperCase());
    const days = parseDays(dayStr);

    for (const d of days) {
      const start = new Date(week0);
      start.setDate(week0.getDate() + d);
      start.setHours(0, 0, 0, 0);
      start.setMinutes(startMin);

      const end = new Date(week0);
      end.setDate(week0.getDate() + d);
      end.setHours(0, 0, 0, 0);
      end.setMinutes(endMin);

      events.push({
        title: item.name,
        start,
        end,
        extendedProps: { room: item.room, timeLabel: `${startRaw} - ${endRaw}` },
      });
    }
  }

  return events;
}

export default function ClassSchedule() {
  const [enrolled, setEnrolled] = useState<CartItem[]>([]);
  // The calendar's “current” week anchor; updated when the user navigates
  const [weekAnchor, setWeekAnchor] = useState<Date>(new Date());

  // Recompute events whenever enrolled list or viewed week changes
  const fcEvents = useMemo(
    () =>
      buildEventsFromCart(
        enrolled.map((e) => ({ name: e.name, room: e.room, times: e.times })),
        weekAnchor
      ),
    [enrolled, weekAnchor]
  );

  useEffect(() => {
    // initial load
    try {
      const data = JSON.parse(localStorage.getItem("enrolled") ?? "[]");
      setEnrolled(Array.isArray(data) ? data : []);
    } catch {
      setEnrolled([]);
    }

    // keep fresh if user enrolls and navigates back
    const onFocus = () => {
      try {
        const data = JSON.parse(localStorage.getItem("enrolled") ?? "[]");
        setEnrolled(Array.isArray(data) ? data : []);
      } catch {
        /* noop */
      }
    };
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
        My Class Schedule
      </h2>

      {enrolled.length === 0 ? (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No enrolled classes yet. Submit from your Shopping Cart to add classes here.
        </div>
      ) : (
        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 mb-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                <thead>
                  <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3 dark:text-white">
                      CLASS
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      NAME
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      DAYS & TIMES
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      ROOM
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      INSTRUCTOR
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      UNITS
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      STATUS
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white dark:bg-gray-900">
                  {enrolled.map((s) => (
                    <tr key={s.class} className="even:bg-gray-50 dark:even:bg-gray-800/50">
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3 dark:text-white">
                        {s.class}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {s.name}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {s.times}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {s.room}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {s.instructor}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {s.units}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        Enrolled
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

         

          <FullCalendar
            
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            firstDay={1} // Monday
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            nowIndicator
            height="auto"
            events={fcEvents}
            eventOverlap
            eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
            dayHeaderFormat={{ weekday: "short" }}
            datesSet={(arg) => {
              // keep events aligned to the week being viewed
              // arg.start is the start of the current view range
              setWeekAnchor(arg.start);
            }}
            eventContent={(arg) => {
              // custom render: title + room + time
              const { room, timeLabel } = arg.event.extendedProps as any;
              return {
                domNodes: [
                  (() => {
                    const wrap = document.createElement("div");
                    wrap.className = "fc-custom-event";
                    wrap.innerHTML = `
                      <div class="font-medium">${arg.event.title}</div>
                      ${room ? `<div class="text-[11px] opacity-80">${room}</div>` : ""}
                      <div class="text-[11px] opacity-70">${timeLabel ?? ""}</div>
                    `;
                    return wrap;
                  })(),
                ],
              };
            }}
          />
        </div>
      )}
    </div>
  );
}
