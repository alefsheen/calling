"use client";
import { useEffect, useState } from "react";
import { getProducts } from "./getProducts";
import * as XLSX from "xlsx";
import { diff } from "deep-diff";

export default function Page() {
  return <Excel />;
}

function Excel() {
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [uploadedExcel, setUploudedExcel] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setUploudedExcel(jsonData);
      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file); // ✅ Safe and modern
  };

  useEffect(() => {
    async function fetchProducts() {
      const fetchedContacts = await getProducts();
      // if (fetchedContacts.length > 0) {
      //   const sheet = XLSX.utils.json_to_sheet(fetchedContacts);
      //   const book = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(book, sheet, "fetchedContacts");
      //   XLSX.writeFile(book, "_contacts30.xlsx");
      // }
      setFetchedContacts(fetchedContacts);
      console.log(fetchedContacts);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <h1>📊 Excel Upload in React</h1>
      <div className="p-4">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(uploadedExcel, null, 2)}
        </pre>
      </div>
    </>
  );
}

// const differences = diff(json1, json2);
// console.log(differences);
