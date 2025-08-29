import React, { useState } from "react";

function ProgressBar({ score, setScore, steps }) {
  // const score = contacts.find((contact) => contact._id === contactID)[
  //   param
  // ];

  // const setstar = (val) => {
  //   setContacts((contacts) =>
  //     contacts.map((c) => (c._id === contactID ? { ...c, [param]: val } : c))
  //   );
  // };

  // const levels = [0, 1, 2, 3];
  const levels = steps;

  // Calculate progress percentage, reversed for right-to-left swipe
  const progress =
    (levels.findIndex((l) => l === score) / (levels.length - 1)) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-2 pb-2 pt-5 border-2 border-gray-200 border-dashed rounded-xl">
      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="absolute top-0 right-0 bg-teal-200 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
        {/* Circles */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
          {levels.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setScore(levels[index]);
              }}
              className={`${
                levels.length > 4 ? "w-6 h-6" : "w-8 h-8"
              }  rounded-full cursor-pointer transition-all duration-300 
                ${
                  index <= levels.findIndex((l) => l === score)
                    ? "bg-teal-600 scale-110"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Level Labels */}
      <div className="flex justify-between w-full text-sm font-medium px-3">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`text-center ${
              index <= levels.findIndex((l) => l === score)
                ? "text-teal-600"
                : "text-gray-400"
            }`}
            style={{ direction: "ltr", unicodeBidi: "plaintext" }}
          >
            {level}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
