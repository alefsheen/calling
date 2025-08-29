import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MiniTabs({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "tab5",
      label: "با من",
    },
    {
      id: "tab6",
      label: "همه",
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto mt-2 px-2">
      {/* Tab Buttons */}
      <div className="flex relative bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 relative font-medium"
          >
            {/* Highlight Effect */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab2"
                className="absolute inset-0 bg-gray-300 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {/* Button Text */}
            <span
              className={`relative text-sm font-bold ${
                activeTab === tab.id ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
