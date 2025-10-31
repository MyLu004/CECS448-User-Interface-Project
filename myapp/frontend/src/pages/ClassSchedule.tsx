// app/schedule/ClassSchedule.tsx (or wherever you place it)
"use client";

import { useContext, useMemo } from "react";
//import FullCalendar from "@fullcalendar/react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import "@fullcalendar/core/index.css";
// import "@fullcalendar/timegrid/index.css";


import CheckCircleIcon from "@heroicons/react/16/solid/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/16/solid/XCircleIcon";
import { ShoppingCartContext } from "../components/ShoppingCartContext";

// (optional) if you have a CartItem type, import it from the context/types
// type CartItem = { name: string; class: string; section: string; times: string; room: string;
//   instructor: string; dates: string; status: boolean; units: number };
const DAY_TOKENS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;


function startOfWeek(d = new Date()) {
  // make Monday = day 0
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
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  // optional: compute total units
  const totalUnits = useMemo(
    () => shoppingCart.reduce((sum, c) => sum + (Number(c.units) || 0), 0),
    [shoppingCart]
  );

  // optional: remove item handler
  const removeFromCart = (clazz: string) => {
    setShoppingCart(shoppingCart.filter((c) => c.class !== clazz));
  };

  const fcEvents = useMemo(() => buildEventsFromCart(shoppingCart as any), [shoppingCart]);


  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
        Fall 2025 Shopping Cart
      </h2>

      {shoppingCart.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Your cart is empty. Add classes from the search page.
        </p>
      ) : (
        <>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Total units: <span className="font-medium">{totalUnits}</span>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        CLASS
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        DAYS & TIMES
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        ROOM
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        INSTRUCTOR
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        UNITS
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        STATUS
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white dark:bg-gray-900">
                    {shoppingCart.map((section) => (
                      <tr key={section.class} className="even:bg-gray-50 dark:even:bg-gray-800/50">
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {section.name} ({section.class})
                          {/* <div className="text-xs text-gray-500 dark:text-gray-400">{section.section}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{section.dates}</div> */}
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
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                          {section.units}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap">
                          {section.status ? (
                            <div className="flex items-center justify-center text-green-700">
                              <CheckCircleIcon aria-hidden="true" className="size-5" />
                              {/* <span className="sr-only sm:not-sr-only sm:text-gray-700 dark:sm:text-gray-300">Open</span> */}
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 text-red-600">
                              <XCircleIcon aria-hidden="true" className="size-5" />
                              <span className="sr-only sm:not-sr-only sm:text-gray-700 dark:sm:text-gray-300">Closed</span>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-right">
                          <button
                            onClick={() => removeFromCart(section.class)}
                            className="rounded-lg px-5 py-2 bg-red-500 text-white"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>


          <section className="mt-10 rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b bg-neutral-50 px-4 py-2 text-sm font-semibold">
          Weekly Schedule
        </div>

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          slotMinTime="08:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          nowIndicator
          height="auto"
          events={fcEvents}
          eventOverlap
          eventTimeFormat={{ hour: "numeric", minute: "2-digit", meridiem: "short" }}
          dayHeaderFormat={{ weekday: "short" }}
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
      </section>
        </>
      )}
    </div>
  );
}
