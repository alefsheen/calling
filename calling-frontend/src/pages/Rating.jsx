import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Rating() {
  //   const [contact, setContact] = useState({});
  const { id } = useParams();

  //   // Fetch contacts from backend
  //   useEffect(() => {
  //     async function fetchContacts() {
  //       try {
  //         const res = await fetch(
  //           `https://javanesafa-server.liara.run/api/v1/contacts/${id}`
  //         );
  //         const data = await res.json();
  //         console.log(data.data);

  //         setContact(data.data.data);
  //       } catch (err) {
  //         console.error("Failed to fetch contacts:", err);
  //       }
  //     }
  //     fetchContacts();
  //     // setContacts(contactListData);
  //   }, []);

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
        <ProgressBar
          key={param}
          //   param={param}
          //   contactID={contact._id}
          //   handleClick={(rate) => handleClick(param, rate)}
          //   contacts={contact}
          //   setContacts={setContact}
        />
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
