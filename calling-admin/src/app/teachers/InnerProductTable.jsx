"use client";

import CustomCheckbox from "./CustomCheckbox";
import { Fragment, useEffect, useState } from "react";
import { _tableColumns } from "./columnsAndBreakpoints";
import { _getProducts } from "./getProducts";

export const InnerProductTable = ({ teacher }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // //////////////////////////////////////////////////////////////////////////////////////

  async function fetchProducts() {
    try {
      const result = await _getProducts();
      setProducts(result);
    } catch (error) {
      // Handle other errors
      console.error(error);
    }
  }

  const displayedPublishers =
    searchQuery.length > 0
      ? products.filter((product) => product?.lastName?.includes(searchQuery))
      : products;

  return (
    <div className="mx-auto px-2 pb-2 bg-white">
      {/* Search Input */}
      <div className="text-sm mb-2 bg-teal-400 p-2 md:px-4 shadow-lg flex items-center gap-2 rounded-lg">
        <input
          type="text"
          placeholder="جستجوی کاربران..."
          className="border border-gray-300 p-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <h1 className="text-white mr-1 text-nowrap font-bold text-center text-sm">
          جستجو
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg h-[300px] overflow-scroll">
        <table className="table-auto w-full text-left border-collapse ">
          {/* Header */}
          <thead>
            <tr className="bg-teal-700 text-white text-nowrap text-xs">
              <th className="pr-2 py-2 text-start"></th>

              {_tableColumns.map((column, index) => (
                <th key={index} className={`px-1 py-2 text-start`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {displayedPublishers.map((publisher, index) => (
              <Fragment key={publisher._id}>
                {/* ---------------------- Start of main Row --------------------- */}
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-teal-100"
                  } transition-colors duration-200 text-start text-xs`}
                >
                  {/* Action column */}
                  <td className="pr-2 py-2 text-nowrap">
                    <button className="text-teal-600 hover:text-teal-800 ">
                      <CustomCheckbox
                        teacher={teacher}
                        student={publisher}
                        setProducts={setProducts}
                      />
                    </button>
                  </td>

                  {/* Main columns */}
                  {_tableColumns.map((column, index) => (
                    <td
                      key={index}
                      className={`px-1 py-2 ${index > 1 && "text-start"}`}
                    >
                      {column.value(publisher)}
                    </td>
                  ))}
                </tr>
                {/* ---------------------- End of main Row --------------------- */}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
