import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Topic({ label, value }) {
  return (
    <p className="text-center text-sm text-gray-700 ">
      {label}: <span className="font-semibold">{value}</span>
      {" نفر "}
    </p>
  );
}

export default function Tabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    {
      id: "tab1",
      label: "پیگیری قبل برنامه",
      content: (
        <Topic
          label="تعداد پیگیری شده"
          value={counts.message1_recorder_Count}
        />
      ),
    },
    {
      id: "tab2",
      label: "حضور غیاب",
      content: <Topic label="تعداد حاضرین" value={counts.presentCount} />,
    },
    {
      id: "tab3",
      label: "تماس به غایبین",
      content: (
        <Topic
          label="تعداد پیگیری شده"
          value={counts.message2_recorder_Count}
        />
      ),
    },
    {
      id: "tab4",
      label: "امتیازدهی",
      content: (
        <p className="text-center text-sm text-gray-700 ">
          امتیازدهی و ثبت نظر{" "}
        </p>
      ),
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Buttons */}
      <div className="flex relative bg-gray-900 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 relative font-medium"
          >
            {/* Highlight Effect */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-blue-900 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {/* Button Text */}
            <span
              className={`relative z-10 text-sm ${
                activeTab === tab.id ? "text-white" : "text-gray-500"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content with Swiping Effect */}
      <div className="mt-2 p-2 rounded-lg bg-gray-300 shadow-md overflow-hidden font-bold">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
