import { date2unix, unix2date2 } from "@/utils/dateConversion";
import { useEffect, useState } from "react";

export function Modal({ setModal, modal, setProducts }) {
  const initial = modal?.data;
  const [formData, setFormData] = useState(
    { ...initial, date: unix2date2(initial?.date) } || {}
  );

  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: date2unix(value),
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
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
        ? `${process.env.NEXT_PUBLIC_SERVER}/api/v1/events`
        : `${process.env.NEXT_PUBLIC_SERVER}/api/v1/events/${formData._id}`;

    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify({ ...formData, date: date2unix(formData.date) }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(
          `${
            modal.type === "create"
              ? "خطا در ایجاد رویداد"
              : "خطا در بروزرسانی رویداد"
          }`
        );

      if (modal.type === "create") {
        const newProduct = await response.json();
        setProducts((prevProducts) => [newProduct.data.data, ...prevProducts]);
      } else {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === formData._id
              ? { ...formData, date: date2unix(formData.date) }
              : product
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
          {modal.type === "create" ? "ایجاد رویداد جدید" : "بروزرسانی رویداد"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              نام رویداد{" "}
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="نام رویداد"
            />
          </div>

          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              تاریخ{" "}
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="تاریخ"
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

          {/* <div className="">
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
            </select>
          </div> */}

          {/* Submit Button */}
          <div className="col-span-2 mt-3">
            <button
              type="submit"
              className="w-full bg-teal-500 font-bold text-white rounded-md py-4 text-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {modal.type === "create" ? "ایجاد رویداد" : "بروزرسانی"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
