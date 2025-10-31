import { Button } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { useContext, useMemo, useState } from "react";
import { ShoppingCartContext } from "../components/ShoppingCartContext";

export default function ShoppingCart() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  const totalUnits = useMemo(
    () => shoppingCart.reduce((sum, c) => sum + (Number(c.units) || 0), 0),
    [shoppingCart]
  );

  const [enrolling, setEnrolling] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const deleteItem = (clazz: string) =>
    setShoppingCart(shoppingCart.filter((c) => c.class !== clazz));

  async function submitEnrollment() {
    setSuccessMsg(null);
    setEnrolling(true);
    try {
      // simulate server request
      await new Promise((r) => setTimeout(r, 900));

      const classCount = shoppingCart.length;
      const units = totalUnits;

      // TODO: send to your API here. For now we clear the cart.
      setShoppingCart([]);
      setSuccessMsg(
        `Enrollment submitted for ${classCount} class${classCount === 1 ? "" : "es"} (${units} unit${units === 1 ? "" : "s"}).`
      );
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">
        Fall 2025 Shopping Cart
      </h2>

      {/* success banner */}
      {successMsg && (
        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      {shoppingCart.length === 0 ? (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No Items Added To Cart
        </div>
      ) : (
        <>
          {/* toolbar: total + submit */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">{shoppingCart.length}</span> item
              {shoppingCart.length === 1 ? "" : "s"} •{" "}
              <span className="font-medium">{totalUnits}</span> total units
            </div>

            {/* <Button
              onClick={submitEnrollment}
              disabled={!shoppingCart.length || enrolling}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enrolling ? "Submitting..." : "Submit Enrollment"}
            </Button> */}
          </div>

          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3 dark:text-white">
                        DELETE
                      </th>
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
                    </tr>
                  </thead>

                  <tbody className="bg-white dark:bg-gray-900">
                    {shoppingCart.map((section) => (
                      <tr key={section.class} className="even:bg-gray-50 dark:even:bg-gray-800/50">
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3 dark:text-white">
                          <Button
                            onClick={() => deleteItem(section.class)}
                            className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                          >
                            Delete
                          </Button>
                        </td>
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
                          <CheckCircleIcon aria-hidden="true" className="size-5 text-green-700" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* bottom submit button (duplicate for long tables) */}
                <div className="mt-6 flex items-center justify-end">
                  <Button
                    onClick={submitEnrollment}
                    disabled={!shoppingCart.length || enrolling}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {enrolling ? "Submitting..." : "Submit Enrollment"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
