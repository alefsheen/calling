"use client";
import { useEffect, useState } from "react";
import { fetchAllCallings, fetchAllContacts } from "./fetchCallings";
import { unix2date } from "@/utils/dateConversion";

export default function page() {
  return <Presents />;
}

function Presents() {
  const [callings, setCallings] = useState([]);
  const [contacts, setContacts] = useState([]);

  function contactOf(id) {
    return contacts.find((c) => c._id === id)?.lastName;
  }

  useEffect(() => {
    async function fetchCalling() {
      const _callings = await fetchAllCallings();
      const _contacts = await fetchAllContacts();
      setContacts(_contacts);
      setCallings(_callings);
    }
    fetchCalling();
  }, [fetchAllCallings, fetchAllContacts]);

  const eventDates = [
    ...new Set(callings?.map((c) => c.date + "," + c.eventName)),
  ]
    .map((c) => c.split(","))
    .sort((a, b) => b[0] - a[0]);
  return (
    <div className=" flex flex-col gap-3">
      {eventDates.map((e) => {
        const abc = callings
          .filter((c) => c.date == e[0])
          .filter((c) => c.present === true);
        return (
          <div key={e} className="p-3 bg-gray-200 rounded-lg">
            <h1 className="mb-2 text-white bg-gray-700  p-2 rounded-lg">{`${unix2date(
              e[0]
            )} --- ${e[1]}  (${abc.length} نفر) `}</h1>
            <div className="flex flex-wrap gap-1">
              {abc.map((c) => (
                <p
                  key={c.contactID}
                  className=" p-2 rounded-lg text-xs bg-white "
                >
                  {contactOf(c.contactID)}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
