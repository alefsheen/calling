"use client";

import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-50">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-teal-500"></div>
      <h1 className="text-teal-700 text-xl mt-5">لطفا منتظر بمانید ...</h1>
    </div>
  );
};

export default Spinner;
