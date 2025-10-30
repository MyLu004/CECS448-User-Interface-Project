// app/schedule/ClassSchedule.tsx (or wherever you place it)
"use client";

import { useContext, useMemo } from "react";
import CheckCircleIcon from "@heroicons/react/16/solid/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/16/solid/XCircleIcon";
import { ShoppingCartContext } from "../components/ShoppingCartContext";

// (optional) if you have a CartItem type, import it from the context/types
// type CartItem = { name: string; class: string; section: string; times: string; room: string;
//   instructor: string; dates: string; status: boolean; units: number };

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
        </>
      )}
    </div>
  );
}
