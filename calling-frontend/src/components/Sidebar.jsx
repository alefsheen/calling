import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaImage,
  FaShoppingCart,
  FaTags,
  FaUpload,
  FaCog,
} from "react-icons/fa"; // Import icons from react-icons

const menuItems = [
  {
    href: "/call",
    label: "پیگیری",
    icon: <FaShoppingCart className="w-5 h-5" />,
  },
  { href: "/", label: "حضور", icon: <FaTags className="w-5 h-5" /> },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between border-b-2 border-b-teal-500 bg-teal-950 text-white px-4 py-2 z-50">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" className="h-10 w-10 rounded-lg" alt="logo" />
          <h1 className="font-bold text-lg">ابزارآلات مکیال</h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-100 "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed top-0 z-30 border-l-2 border-teal-400 right-0 bg-teal-950 text-white transition-transform ${
            isOpen ? "-translate-x-0" : "translate-x-full"
          } md:-translate-x-0 md:static md:flex w-64 px-6 h-full `}
        >
          <nav className="space-y-2 font-bold justify-center w-full h-full flex flex-col pt-8">
            {menuItems.map((item) => {
              // const isActive = pathname === item.href;
              const isActive = false;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg flex gap-4 ${
                    isActive
                      ? "bg-teal-700 text-white"
                      : "bg-teal-900 hover:bg-teal-700 hover:text-white text-teal-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Render Children */}
          <main className="h-full">{children}</main>
        </main>

        {/* Overlay for mobile when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0  z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
