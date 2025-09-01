import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Rating() {
  const { id } = useParams();

  return (
    <div>
      <Header contact={contact} />
      {[
        "param1",
        "param2",
        "param3",
        "param4",
        "param5",
        "param6",
        "param7",
        "param8",
        "param9",
        "param10",
        "param11",
        "param12",
      ].map((param) => (
        <ProgressBar key={param} />
      ))}
    </div>
  );
}

function Header({ contact }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 shadow p-4 flex items-center justify-start gap-12 text-right">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 hover:text-blue-500"
      >
        <FaArrowRight size={16} className="text-gray-300" />
      </button>
      <h1 className=" font-bold text-gray-300">{contact.lastName}</h1>
    </div>
  );
}
