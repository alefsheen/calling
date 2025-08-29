import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdRecordVoiceOver,
  MdReport,
  MdPeople,
  MdPersonAdd,
} from "react-icons/md";

const BottomNavigator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [linePosition, setLinePosition] = useState(0);

  const navItems = [
    {
      label: "حضور",
      icon: <MdPersonAdd size={24} />,
      path: "/",
    },
    { label: "پیگیری", icon: <MdReport size={24} />, path: "/call" },
    // {
    //   label: "تعامل",
    //   icon: <MdRecordVoiceOver size={24} />,
    //   path: "/Interactors",
    // },
    // {
    //   label: "تعامل",
    //   icon: <MdPeople size={24} />,
    //   path: "/Interactees",
    // },
  ];

  // Update the teal line position based on the active index
  useEffect(() => {
    setLinePosition(activeIndex * 100); // Adjusting the position based on the index
  }, [activeIndex]);

  return (
    <div className="sticky bottom-0 w-full bg-gray-900 shadow-lg border-t border-gray-700 z-50">
      <div
        className="absolute w-1/2 top-0 right-0 h-1 bg-teal-400 transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${linePosition}%)` }}
      />
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <button
              key={index}
              className={`relative flex flex-col items-center p-4 w-full transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "text-teal-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                className={`${activeIndex === index ? "animate-pulse" : ""}`}
              >
                {item.icon}
              </span>
              <span className="text-sm mt-1">{item.label}</span>
            </button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigator;
