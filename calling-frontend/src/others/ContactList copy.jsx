import React, { useState, useEffect } from "react";
import { contactListData } from "../contactListData";
import { FaLockOpen, FaLock } from "react-icons/fa";
import Slider from "../components/Slider";

const ContactList = ({ contacts, setContacts }) => {
  // Toggle present status and update backend
  const togglePresent = (id, currentPresent) => {
    const newPresent = !currentPresent;

    // Update present status in backend
    fetch(`https://tavana-node.liara.run/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: newPresent }),
    })
      .then((res) => res.json())
      .then((updatedContact) => {
        // Update state with new present status
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
          )
        );
      })
      .catch((err) =>
        console.error("Failed to update contact present status:", err)
      );
  };

  // Count Present contacts
  const presentCount = contacts.filter((contact) => contact.present).length;

  const handlePresent = (_contact) => {
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact.id === _contact.id
          ? { ...contact, present: !contact.present ? "حاضر" : "غایب" }
          : contact
      )
    );
  };

  const handleCall = (_contact) => {
    if (_contact.phone) {
      window.open(`tel:${_contact.phone}`);
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-100 z-10 p-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          لیست مخاطبین
        </h1>
        <p className="text-center text-sm text-gray-600 mt-2">
          تعداد حاضرین: <span className="font-semibold">{presentCount}</span>
        </p>
      </div>

      {/* Contact List */}
      <div className="space-y-2">
        {contacts.map((contact) => (
          <Slider
            key={contact._id}
            handlePresent={() => handlePresent(contact)}
            call={() => handleCall(contact)}
            present={contact.present}
          >
            {contact.present ? (
              <>
                <div className="flex h-32 text-sm items-center bg-teal-950 shadow-lg rounded-xl gap-2 p-4 hover:shadow-xl transition-shadow">
                  <div className="w-16 flex flex-col gap-1 items-center">
                    {/* Contact Image*/}
                    <img
                      src={
                        contact.image && contact.image.trim() !== ""
                          ? contact.image
                          : "person.png"
                      }
                      alt={contact.lastName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 border-dashed"
                    />
                    {/* Contact name*/}
                    <p className="text-xs text-center font-semibold text-teal-100">
                      {contact.lastName}
                    </p>
                  </div>

                  {/* WITH Message */}
                  <div
                    className={`flex-1 border-2 border-gray-200 border-dashed h-24 p-2 rounded-xl ${
                      contact.with ? "" : "overflow-y-auto"
                    }`}
                  >
                    {contact.with ? (
                      <textarea
                        type="text"
                        className="text-xs font-semibold text-teal-100 bg-teal-900 h-full w-full rounded-xl text-start content-start p-2"
                      />
                    ) : (
                      <p className="text-xs font-semibold text-teal-100 ">
                        {contact.message}
                      </p>
                    )}
                  </div>

                  {/* WITH Button */}
                  <div className="h-full flex flex-col justify-center">
                    <button
                      className={`px-3 py-2 w-14  flex flex-col items-center font-medium text-xs shadow-md overflow-hidden ${
                        !contact.with
                          ? "bg-teal-600 rounded-full text-white hover:bg-teal-600"
                          : "bg-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {contact.with ? (
                        <>
                          <span>با</span>
                          <span className="text-[10px]">
                            {contact.lastName}
                          </span>
                          <FaLock className="text-base" />
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-nowrap h-10 content-center ">
                            با من!
                          </span>
                          {/* <FaLockOpen className="text-base" /> */}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2  h-32 justify-center text-sm bg-teal-950 shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow">
                  {/* Contact Image*/}
                  <div className="flex items-center justify-start gap-3 w-60">
                    <img
                      src={
                        contact.image && contact.image.trim() !== ""
                          ? contact.image
                          : "person.png"
                      }
                      alt={contact.lastName}
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 border-dashed"
                    />
                    {/* Contact name*/}
                    <p className="text-base text-center font-semibold text-teal-100">
                      {contact.lastName}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Slider>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
