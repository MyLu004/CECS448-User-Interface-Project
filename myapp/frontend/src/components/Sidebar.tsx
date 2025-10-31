"use client";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SharkPic from "../assets/sharkProfile.jpg"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "./ShoppingCartContext";

const nav = [
  { name: "Class Search", to: "class-search", icon: MagnifyingGlassIcon },
  { name: "Shopping Cart", to: "shopping-cart", icon: ShoppingCartIcon },
  { name: "Class Schedule", to: "class-schedule", icon: CalendarDaysIcon },
];



const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter((v): v is string => Boolean(v)).join(" ");

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { shoppingCart } = useContext(ShoppingCartContext);

  

  const navigate = useNavigate();


  return (
    <>
      {/* Mobile trigger bar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden dark:bg-gray-900">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
          Enrollment
        </div>
      </div>

      {/* Mobile sheet */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-gray-900">
              <div className="relative flex h-16 shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://www.csulb.edu/sites/default/files/images/2022-07/ES%20-%20Elbee%20Circle.png"
                  className="h-8 w-auto dark:hidden"
                />
              </div>

              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="-mx-2 space-y-1">
                  {nav.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to} // relative to /enrollment
                        end
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          cx(
                            isActive
                              ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )
                        }
                      >
                        {item.icon && (
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                          />
                        )}
                        {item.name}
                        {item.to === "shopping-cart" && (
                          <span className="ml-auto inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:inset-ring-red-400/20">
                            {shoppingCart?.length ?? 0}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col dark:bg-gray-900">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-white/10 dark:bg-black/10">
          <div className="flex h-16 shrink-0 items-center">
            <img
              alt="Your Company"
              src="https://www.csulb.edu/sites/default/files/images/2022-07/ES%20-%20Elbee%20Circle.png"
              className="h-14 w-auto dark:hidden"
            />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="-mx-2 space-y-1">
              {nav.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to} // relative path
                    end
                    className={({ isActive }) =>
                      cx(
                        isActive
                          ? "bg-gray-50 text-indigo-600 dark:bg_white/5 dark:text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )
                    }
                  >
                    {item.icon && (
                      <item.icon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                      />
                    )}
                    {item.name}
                    {item.to === "shopping-cart" && (
                      <span className="ml-auto inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:inset-ring-red-400/20">
                        {shoppingCart?.length ?? 0}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4">
              <button
                onClick={() => navigate("/")}
                className="block w-full rounded-lg bg-red-600 px-4 py-2 text-white text-center hover:bg-indigo-700"
              >
              Back to Home
              </button>

          </div>

          <div className="mt-auto -mx-6">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
            >
              <img
                alt=""
                src={SharkPic}
                className="size-8 rounded-full bg-gray-50 dark:bg-gray-800"
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Shark CSULB</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
