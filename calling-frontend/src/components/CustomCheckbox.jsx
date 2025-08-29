import { useState } from "react";

export default function CustomCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden"
      />
      <div
        className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center transition-all ${
          checked ? "bg-teal-500 border-teal-600" : "bg-white border-gray-400"
        }`}
      >
        {checked && (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-gray-700 text-lg">Check me</span>
    </label>
  );
}
