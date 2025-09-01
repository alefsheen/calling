import { useEffect, useState } from "react";
import { InnerProductTable } from "./InnerProductTable";

export function Modal({ setModal, modal, setProducts }) {
  // console.log(modal);
  const [formData, setFormData] = useState(modal?.data || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = modal.type === "create" ? "POST" : "PATCH";
    const url =
      modal.type === "create"
        ? `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts`
        : `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts/${formData._id}`;

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(
          modal.type === "create" ? { ...formData, role: "admin" } : formData
        ),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(
          `${
            modal.type === "create"
              ? "خطا در ایجاد کاربر"
              : "خطا در بروزرسانی کاربر"
          }`
        );

      if (modal.type === "create") {
        const newProduct = await response.json();
        setProducts((prevProducts) => [newProduct.data.data, ...prevProducts]);
      } else {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === formData._id ? formData : product
          )
        );
      }

      setModal(null); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  if (modal.type === "follower") {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000b3]"
        onClick={() => setModal(null)}
      >
        <div
          className="bg-white py-2 rounded-lg shadow-lg relative z-60 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <InnerProductTable teacher={formData} />
          <div className="px-2 text-white">
            <button
              className="bg-teal-600 w-full rounded-lg p-2"
              onClick={() => setModal(null)}
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000b3]"
        onClick={() => setModal(null)}
      >
        <div
          className="bg-white px-6 py-4 rounded-lg shadow-lg relative z-60 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setModal(null)}
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold text-teal-500 mb-4 text-center">
            {modal.type === "create" ? "ایجاد کاربر جدید" : "بروزرسانی کاربر"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* نام کالا */}
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام{" "}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="نام"
              />
            </div>

            {/* کد کالا */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="رمز عبور"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-3">
              <button
                type="submit"
                className="w-full bg-teal-500 font-bold text-white rounded-md py-4 text-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {modal.type === "create" ? "ایجاد کاربر" : "بروزرسانی"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
