import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ClassSearch from "./pages/ClassSearch";
import ClassSchedule from "./pages/ClassSchedule";
import ShoppingCart from "./pages/ShoppingCart";
import AcademyRequirement from "./pages/AcademicRequirement";
import { useEffect, useState } from "react";
import { ShoppingCartContext } from "./components/ShoppingCartContext";
import GeneralEducationRequirement from "./pages/GeneralEducationRequirement";


// No-sidebar layout (Home, AcademyRequirement)
function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-50  dark:bg-gray-900">
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Sidebar-only-for-enrollment layout
function EnrollmentLayout() {
  // cart is only needed inside enrollment
  const [shoppingCart, setShoppingCart] = useState(
    () => JSON.parse(localStorage.getItem("shoppingCart") ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Sidebar visible only here */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <Sidebar />
        </div>

        {/* Main content beside the sidebar */}
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ShoppingCartContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* No-sidebar routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="academy-requirement" element={<AcademyRequirement />} />
          <Route path="general-education-requirements" element={<GeneralEducationRequirement />} />

        </Route>

        {/* Enrollment routes (with sidebar) */}
        <Route path="enrollment" element={<EnrollmentLayout />}>
          <Route index element={<Navigate to="class-search" replace />} />
          <Route path="class-search" element={<ClassSearch />} />
          <Route path="class-schedule" element={<ClassSchedule />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
