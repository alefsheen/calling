import { useEffect, useState } from "react";

export function Modal({ setModal, modal, setProducts }) {
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
        ? `${process.env.NEXT_PUBLIC_LIARA_MEKYAL_NODE}/api/v1/contacts`
        : `${process.env.NEXT_PUBLIC_LIARA_MEKYAL_NODE}/api/v1/contacts/${formData._id}`;

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(
          modal.type === "create" ? { ...formData, role: "user" } : formData
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
            <label className="block text-sm font-medium text-gray-700">
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
            <label className="block text-sm font-medium text-gray-700">
              تلفن{" "}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="تلفن"
            />
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              مدرسه
            </label>
            <select
              name="group"
              value={formData.group || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="همه">همه</option>
              <option value="شهید عاشوری">شهید عاشوری</option>
              <option value="شهدای هسته ای">شهدای هسته ای</option>
              <option value="امید انقلاب">امید انقلاب</option>
              <option value="شهید توپچی">شهید توپچی</option>
              <option value="شهید فهمیده">شهید فهمیده</option>
              <option value="شهید افتخاری">شهید افتخاری</option>
              <option value="پیام غدیر">پیام غدیر</option>
              <option value="شاهد محسنین">شاهد محسنین</option>
              <option value="شهدای گمنام">شهدای گمنام</option>
              <option value="شهید کلاهدوز">شهید کلاهدوز</option>
              <option value="شهید مصطفی خمینی">شهید مصطفی خمینی</option>
              <option value="نورصالحی">نورصالحی</option>
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              سطح
            </label>
            <select
              name="group2"
              value={formData.group2 || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="همه">همه</option>
              <option value="سطح 1">سطح 1</option>
              <option value="سطح 2">سطح 2</option>
              <option value="سطح 3">سطح 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              تماس پدر{" "}
            </label>
            <input
              type="text"
              name="phone_f"
              value={formData.phone_f || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="تماس پدر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              تماس مادر{" "}
            </label>
            <input
              type="text"
              name="phone_m"
              value={formData.phone_m || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="تماس مادر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              تماس منزل{" "}
            </label>
            <input
              type="text"
              name="phone_h"
              value={formData.phone_h || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="تماس منزل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              کد ملی{" "}
            </label>
            <input
              type="text"
              name="melli"
              value={formData.melli || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="کد ملی"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              نام پدر{" "}
            </label>
            <input
              type="text"
              name="father"
              value={formData.father || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="نام پدر"
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
