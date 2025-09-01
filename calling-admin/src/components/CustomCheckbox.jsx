import { useState } from "react";

export default function CustomCheckbox({ publisher, setProducts }) {
  const [checked, setChecked] = useState(publisher.active);

  async function handler() {
    setChecked((c) => !c);

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === publisher._id
          ? { ...publisher, active: !checked }
          : product
      )
    );

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts/${publisher._id}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ ...publisher, active: !checked }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("خطا در به روز رسانی");
    } catch (e) {
      console.log("error");
    }
  }

  return (
    <label className="flex items-center  cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handler}
        className="hidden"
      />
      <div
        className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-all ${
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
    </label>
  );
}
