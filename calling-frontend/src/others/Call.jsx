import React, { useState, useEffect } from "react";
import { contactListData } from "../contactListData";
import { FaLockOpen, FaLock } from "react-icons/fa";
import Slider from "../components/Slider";
import { socket } from "../connection/socket";
import { useRef } from "react";

const Call = ({ contacts, setContacts }) => {
  // Toggle present status and update backend
  // const togglePresent = (id, currentPresent) => {
  //   const newPresent = !currentPresent;

  //   // Update present status in backend
  //   fetch(`https://tavana-node.liara.run/contacts/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ present: newPresent }),
  //   })
  //     .then((res) => res.json())
  //     .then((updatedContact) => {
  //       // Update state with new present status
  //       setContacts((prevContacts) =>
  //         prevContacts.map((contact) =>
  //           contact.id === updatedContact.id ? updatedContact : contact
  //         )
  //       );
  //     })
  //     .catch((err) =>
  //       console.error("Failed to update contact present status:", err)
  //     );
  // };

  // const handlePresent = (_contact) => {
  //   setContacts((contacts) =>
  //     contacts.map((contact) =>
  //       contact.id === _contact.id
  //         ? { ...contact, present: !contact.present }
  //         : contact
  //     )
  //   );
  // };

  return (
    <div className="p-2 bg-gray-900 min-h-screen">
      {/* Contact List */}
      <div className="space-y-2">
        {contacts.map((contact) => (
          <ContactDetail contact={contact} setContacts={setContacts} />
        ))}
      </div>
    </div>
  );
};

export default Call;

function ContactDetail({ contact, setContacts }) {
  // const [message, setMessage] = useState(contact.message);
  // const message = contact.message;
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(contact.message);
    }, 700);

    return () => clearTimeout(timeout);
  }, [contact.message]);

  useEffect(() => {
    // console.log({
    //   _id: contact._id,
    //   message: debounce,
    // });
    socket.emit("sync", "updateMessage", {
      _id: contact._id,
      message: debounce,
    });
  }, [debounce]);

  return (
    <Slider
      key={contact._id}
      call={() => handleCall(contact)}
      // present={contact.present}
    >
      <div
        className={`flex h-32 text-sm items-center ${
          contact.present ? "bg-green-800" : "bg-red-800"
        } shadow-lg rounded-xl gap-2 p-4 hover:shadow-xl transition-shadow`}
      >
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
            {contact.lastName.split("،")[0]}
          </p>
        </div>

        {/* WITH Message */}
        <div
          className={`flex-1 border-2 border-gray-200 border-dashed h-24 p-2 rounded-xl ${
            contact.with ? "" : "overflow-y-auto"
          }`}
        >
          <textarea
            type="text"
            // onChange={(e) => setMessage(e.target.value)}
            onChange={(e) =>
              messageHandler(contact._id, e.target.value, setContacts)
            }
            value={contact.message}
            className={`text-xs font-semibold text-teal-100 ${
              contact.present ? "bg-green-950" : "bg-red-950"
            } h-full w-full rounded-xl text-start content-start p-2`}
          />
        </div>
      </div>
    </Slider>
  );
}

const handleCall = (_contact) => {
  if (_contact.phone) {
    window.open(`tel:${_contact.phone}`);
  }
};

const messageHandler = (id, msg, setContacts) => {
  if (socket.connected) {
    setContacts((contacts) =>
      contacts.map((c) => {
        return c._id === id ? { ...c, message: msg } : c;
      })
    );

    // setMessage(msg);
  } else {
    console.log("لطفا اتصال اینترنت خود را بررسی نمایید!");
    toast("لطفا اتصال اینترنت خود را بررسی نمایید!");
  }
};
