"use client";
import { useEffect, useState } from "react";
import { fetchAllCallings, fetchAllContacts } from "./fetchCallings";
import { unix2date } from "@/utils/dateConversion";

export default function page() {
  return <Callers />;
}

function Callers() {
  const [callings, setCallings] = useState([]);
  const [contacts, setContacts] = useState([]);

  function contactOf(id) {
    return contacts.find((c) => c._id === id).lastName;
  }

  useEffect(() => {
    async function fetchCalling() {
      const _callings = await fetchAllCallings();
      const _contacts = await fetchAllContacts();
      setContacts(_contacts);
      setCallings(_callings);
      console.log(_contacts);
      console.log(_callings);
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
          .filter((c) => c.message1?.length > 0);
        const callerList = [...new Set(abc.map((c) => c.message1_recorder))];
        console.log(callerList);
        return (
          <div key={e} className="p-3 bg-gray-200 rounded-lg">
            <h1 className="mb-2 text-white bg-blue-700  p-2 rounded-lg">{`${unix2date(
              e[0]
            )} --- ${e[1]}  (${abc.length} نفر) `}</h1>
            <div className="flex flex-wrap gap-1">
              {callerList.map((caller) => {
                return (
                  <div key={caller} className="w-full px-2">
                    <h1 className="my-2 text-blue-700 font-bold">{caller}</h1>
                    <div className="flex flex-col gap-1 ">
                      {abc
                        .filter((a) => a.message1_recorder === caller)
                        .map((c) => (
                          <p
                            key={c.contactID}
                            className=" p-1 rounded-lg text-xs bg-white "
                          >
                            <span className="text-blue-600">
                              {contactOf(c.contactID)}
                            </span>
                            {" > "}
                            {c.message1}
                          </p>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
