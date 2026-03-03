"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash, FaUsers } from "react-icons/fa";
import { Modal } from "./Modal";
import { breakpoints, tableColumns } from "./columnsAndBreakpoints";
import { getProducts } from "./getProducts";
import { handleDelete } from "./handleDelete";

export const ProductTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [expandedRows, setExpandedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [modal, setModal] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const abortController = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = sessionStorage.getItem("site-name");

    if (!authToken) {
      router.push("/login"); // Redirect to login if no authToken
    } else setAuthenticated(true);
  }, [router]);

  useEffect(() => {
    setIsClient(true); // Set this to true only when the component is rendered on the client
    fetchProducts({ _page: 1 });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const visibleColumnCount = breakpoints.find(
        (bp) => width >= bp.maxWidth
      ).columns;

      setVisibleColumns(tableColumns.slice(0, visibleColumnCount));
      if (visibleColumnCount === tableColumns.length) setExpandedRows([]);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    // Prevent rendering on the server
    return null;
  }

  // //////////////////////////////////////////////////////////////////////////////////////

  async function fetchProducts({
    _page = page,
    _sortColumn = sortColumn,
    _searchQuery = searchQuery,
    _sortDirection = sortDirection,
    append = false,
  }) {
    const roles = ["admin", "mentor", "help mentor"];

    if (loading) {
      // Abort the previous fetch if it's still in progress
      if (abortController.current) {
        abortController.current.abort();
      }
    }

    // Create a new AbortController instance for the new request
    const controller = new AbortController();
    abortController.current = controller;

    const signal = controller.signal;

    try {
      setLoading(true);
      
      // Fetch products for all roles in parallel
      const promises = roles.map((role) => {
        const options = {
          page: _page,
          search: _searchQuery,
          sort: _sortColumn,
          sortDirection: _sortDirection,
          role: role,
        };
        return getProducts(options, { signal });
      });

      const results = await Promise.all(promises);
      
      // Combine all results and add role to each product
      const combinedResults = results.flatMap((result, index) => 
        result.map(product => ({ ...product, role: roles[index] }))
      );
      
      setProducts((prevState) => {
        return append ? [...prevState, ...combinedResults] : combinedResults;
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        // Handle other errors
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleShowMore = () => {
    if (loading) return;
    fetchProducts({ _page: page + 1, append: true });
    setPage((prev) => prev + 1);
  };

  const displayedPublishers = products;

  const handleSort = (column) => {
    if (loading) return;
    const _sortDirection =
      sortColumn === column
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc";

    fetchProducts({
      _page: 1,
      _sortColumn: column,
      _sortDirection: _sortDirection,
      append: false,
    });

    setSortDirection(_sortDirection);
    setSortColumn(column);
    setPage(1);
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index)
        ? prev.filter((rowIndex) => rowIndex !== index)
        : [...prev, index]
    );
  };

  if (!authenticated) return <Spinner />;

  return (
    <div className="mx-auto p-2 bg-white">
      {/* Search Input */}
      <div className="mb-4 bg-teal-400 p-2 md:px-4 shadow-lg flex items-center gap-2 rounded-lg">
        <input
          type="text"
          placeholder="جستجوی کاربران..."
          className="border border-gray-300 p-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => {
            if (loading) return;
            fetchProducts({
              _page: 1,
              _searchQuery: e.target.value,
              append: false,
            });
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />
        <h1 className="text-white mr-1 text-nowrap font-bold text-center">
          جستجو
        </h1>
      </div>
      {/* Mobile Sorting */}
      <div className="bg-teal-400 p-2 md:hidden mb-4 shadow-lg justify-center rounded-lg flex items-center gap-2">
        <h1 className="text-white ml-1 text-nowrap font-bold text-center">
          مرتب سازی بر اساس
        </h1>
        <div className="grid grid-cols-2 gap-2 w-full">
          <select
            className="border border-gray-300 p-2 rounded-lg"
            value={sortColumn}
            onChange={(e) => {
              if (loading) return;
              const _sortColumn = e.target.value;
              fetchProducts({
                _page: 1,
                _sortColumn: _sortColumn,
                append: false,
              });

              setSortColumn(_sortColumn);
              setPage(1);
            }}
          >
            {tableColumns.map((column, index) =>
              column.sortKey ? (
                <option key={index} value={column.sortKey}>
                  {column.label}
                </option>
              ) : null
            )}
          </select>
          <select
            className="border border-gray-300 p-2 rounded-lg"
            value={sortDirection}
            onChange={(e) => {
              if (loading) return;
              const _sortDirection = e.target.value;

              fetchProducts({
                _page: 1,
                _sortDirection: _sortDirection,
                append: false,
              });

              setSortDirection(_sortDirection);
              setPage(1);
            }}
          >
            <option value="asc">صعودی</option>
            <option value="desc">نزولی</option>
          </select>
        </div>
      </div>
      <div className="md:flex md:gap-3">
        <button
          className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow-lg hover:bg-mainTeal mb-4"
          onClick={() => setModal({ type: "create", data: {} })}
        >
          ایجاد کاربر جدید
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto w-full text-left border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-teal-700 text-white text-nowrap text-sm">
              {visibleColumns.length < tableColumns.length && (
                <th className="px-4 py-2 text-start"></th>
              )}
              {visibleColumns.map((column, index) => (
                <th
                  key={index}
                  className={`px-2 py-2 text-start ${
                    index > 0 ? "cursor-pointer" : ""
                  }`}
                  onClick={() => column.sortKey && handleSort(column.sortKey)}
                >
                  {column.label}
                  {sortColumn === column.sortKey &&
                    (sortDirection === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
              <th className="pl-1 py-2 text-center">عملیات</th>
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
                  } transition-colors duration-200 text-start`}
                >
                  {/* Plus button */}
                  {visibleColumns.length < tableColumns.length && (
                    <td>
                      <button
                        className={`font-extrabold leading-0 mr-2 rounded-full w-6 h-6 shadow-md hover:bg-mainTeal shadow-slate-700 ${
                          index % 2 === 0
                            ? "bg-teal-700 text-white"
                            : "bg-slate-200 text-teal-700"
                        }`}
                        onClick={() => toggleRowExpansion(index)}
                      >
                        <span className="text-sm leading-none">
                          {expandedRows.includes(index) ? "−" : "+"}
                        </span>
                      </button>
                    </td>
                  )}

                  {/* Main columns */}
                  {visibleColumns.map((column, index) => (
                    <td
                      key={index}
                      className={`px-2 py-2 ${index > 1 && "text-start"}`}
                    >
                      {column.value(publisher)}
                      {column.label === "قیمت" && column.value(publisher) && (
                        <span className="text-xs mr-1">ریال</span>
                      )}
                    </td>
                  ))}

                  {/* Action column */}
                  <td className="pl-1 py-2 text-nowrap">
                    <button
                      onClick={() =>
                        setModal({
                          type: "follower",
                          data: publisher,
                        })
                      }
                      className="text-teal-600 hover:text-teal-800"
                    >
                      <FaUsers size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setModal({
                          type: "update",
                          data: publisher,
                        })
                      }
                      className="text-teal-600 hover:text-teal-800 mr-2"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(publisher, setProducts)}
                      className="text-teal-600 hover:text-teal-800 mr-2"
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
                {/* ---------------------- End of main Row --------------------- */}
                {/* ---------------------- Start of Accordeon Row --------------------- */}
                {expandedRows.includes(index) && (
                  <tr>
                    <td
                      colSpan={visibleColumns.length + 2}
                      className="accordion-content open"
                    >
                      <div className="py-3 pl-4 pr-8  bg-slate-100 flex flex-start">
                        <ul>
                          {tableColumns
                            .slice(visibleColumns.length)
                            .map((column, idx) => (
                              <li
                                key={idx}
                                className="flex flex-start font-semibold"
                              >
                                {column.label}
                              </li>
                            ))}
                        </ul>
                        <div className="border border-gray-700 rounded-full mx-2"></div>
                        <ul>
                          {tableColumns
                            .slice(visibleColumns.length)
                            .map((column, idx) => (
                              <li key={idx} className="flex flex-start">
                                <span>{column.value(publisher)}</span>
                                {column.label === "قیمت" && (
                                  <span className="mr-1 text-xs content-center">
                                    ریال
                                  </span>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
                {/* ---------------------- End of Accordeon Row --------------------- */}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 bg-teal-400 text-white rounded-lg shadow-lg hover:bg-mainTeal"
          onClick={handleShowMore}
          disabled={loading} // Disable button while loading
        >
          {loading ? "در حال بارگذاری..." : "↓ کاربران بیشتر"}
        </button>
      </div>

      {modal && (
        <Modal setModal={setModal} modal={modal} setProducts={setProducts} />
      )}
    </div>
  );
};
