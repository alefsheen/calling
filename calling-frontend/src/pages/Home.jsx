import { useNavigate } from "react-router-dom";
import { updateCallings } from "../connection/fetchContacts";
import { socket } from "../connection/socket";
import { getCurrentUser } from "../utils/auth";
import Tabs from "../components/Tabs";
import { useState } from "react";
import { unix2date } from "../utils/dateConversion";
import MiniTabs from "../components/MiniTabs";

export default function Home({
  contacts,
  setContacts,
  lastEvent,
  events,
  selectedEvent,
  setSelectedEvent,
  activeTab,
  setActiveTab,
  activeTab2,
  setActiveTab2,
  onLogout,
}) {
  const currentUser = getCurrentUser();
  
  const getRoleLabel = (role) => {
    const roleLabels = {
      "mentor": "مربی",
      "help mentor": "کمک مربی",
      "user": "دانش‌آموز",
      "admin": "مدیر"
    };
    return roleLabels[role] || role;
  };
  
  // console.log(contacts);

  // Count Present contacts

  const counts = {
    presentCount: contacts.filter((contact) => contact.present).length,
    message1_recorder_Count: contacts.filter(
      (contact) => contact.message1_recorder
    ).length,
    message2_recorder_Count: contacts.filter(
      (contact) => contact.message2_recorder
    ).length,
  };

  const navigate = useNavigate();

  const handleClick = (contact) => {
    if (activeTab === "tab1" || activeTab === "tab3")
      navigate(`/calling/${contact._id}`);
    if (activeTab === "tab4") navigate(`/evaluation/${contact._id}`);
    if (activeTab === "tab2") {
      const currentEvent = selectedEvent || lastEvent;
      updateCallings({
        contactID: contact._id,
        eventID: currentEvent?._id,
        present_recorder: currentUser?.lastName,
        present: !contact.present,
      });
      const callback = (contacts) =>
        contacts.map((c) =>
          c._id === contact._id ? { ...c, present: !contact.present } : c
        );
      setContacts(callback);
      // console.log("emit updatePresents");
      socket.emit("updatePresents", {
        _currentUser: currentUser,
        _contacts: callback(contacts),
      });
    }
  };

  function contactsFor(level) {
    const contactExist = contacts.filter((c) => c.group2 === level).length > 0;
    return (
      contactExist && (
        <div>
          <h1 className="text-center text-sm text-white p-1 border-b w-3/4 mx-auto">
            {level}
          </h1>
          <div className="grid grid-cols-4 items-center gap-2  justify-center text-sm hover:shadow-xl transition-shadow p-2">
            {contacts
              .filter((c) => c.group2 === level)
              .map((contact) => {
                const condition1 = contact?.message1_recorder?.length > 0;
                const condition2 = contact.present;
                const condition3 = contact?.message2_recorder?.length > 0;

                // if (activeTab === "tab3" && condition2) return;

                return (
                  <div
                    onClick={() =>
                      !(activeTab === "tab3" && condition2) &&
                      handleClick(contact)
                    }
                    key={contact._id}
                    className={`flex flex-col items-center justify-start gap-1 h-full shadow-lg rounded-xl 
            ${
              activeTab === "tab1" &&
              (condition1 ? "bg-blue-950" : "bg-blue-700")
            }
            ${
              activeTab === "tab2" &&
              (condition2 ? "bg-green-800" : "bg-red-800")
            }
            ${
              activeTab === "tab3" &&
              (condition3
                ? "bg-yellow-950"
                : condition2
                ? "bg-gray-950"
                : "bg-yellow-800")
            }
              ${activeTab === "tab4" && "bg-purple-800"}
          px-2 py-2`}
                  >
                    {/* <img
            src={
              contact.image && contact.image.trim() !== ""
                ? `https://javanesafa.storage.iran.liara.space/javanan3/${contact.group}/${contact.image}`
                : "person.png"
            }
            className="w-20 h-24 rounded-xl object-cover border-2 border-gray-200 border-dashed"
          /> */}
                    <p className="text-[14px] text-center content-center font-semibold min-h-16 text-teal-100">
                      {contact.lastName}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )
    );
  }

  return (
    <div className=" bg-gray-900 min-h-screen">
      <div className="sticky top-0 bg-gray-800 z-10 p-1 shadow-md rounded-b-xl flex-col justify-between p-2">
        {/* User Info and Logout */}
        <div className="flex justify-between items-center mb-2 p-2 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400">کاربر:</p>
            <p className="text-sm font-bold text-yellow-500">{currentUser?.lastName}</p>
            {currentUser?.role && (
              <>
                <span className="text-gray-600">|</span>
                <p className="text-xs text-gray-400">نقش:</p>
                <p className="text-xs font-semibold text-blue-400">{getRoleLabel(currentUser.role)}</p>
              </>
            )}
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-lg transition-colors"
          >
            خروج
          </button>
        </div>
        <div className="mb-2">
          <div className="bg-gray-900 rounded-lg p-2 mb-2">
            <p className="text-xs text-white mb-1">انتخاب برنامه: </p>
            <select
              value={selectedEvent?._id || ""}
              onChange={(e) => {
                const event = events.find((ev) => ev._id === e.target.value);
                if (event) setSelectedEvent(event);
              }}
              className="w-full bg-gray-800 text-white text-sm rounded-lg p-2 border border-gray-700 focus:border-yellow-500 focus:outline-none"
            >
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.eventName} - {unix2date(event.date)} ({event.group})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-2 text-white">
            <div className="bg-gray-900 rounded-lg p-1">
              <p className="text-xs">عنوان برنامه: </p>
              <h1 className="text-xs font-bold text-center text-yellow-500 mt-1">
                {lastEvent?.eventName}
              </h1>
            </div>
            <div className="bg-gray-900 rounded-lg p-1">
              <p className="text-xs">تاریخ: </p>
              <h1 className="text-xs font-bold text-center text-yellow-500 mt-1">
                {unix2date(lastEvent?.date)}
              </h1>
            </div>
            <div className="bg-gray-900 rounded-lg p-1">
              <p className="text-xs">مدرسه: </p>
              <h1 className="text-xs font-bold text-center text-yellow-500 mt-1">
                {lastEvent?.group}
              </h1>
            </div>
            {/* <div className="bg-gray-900 rounded-lg p-1">
            <p className="text-xs">سطح: </p>
            <h1 className="text-xs font-bold text-center text-yellow-500 mt-1">
              {lastEvent?.group2}
            </h1>
          </div> */}
          </div>
        </div>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />
      </div>{" "}
      <MiniTabs activeTab={activeTab2} setActiveTab={setActiveTab2} />
      {contactsFor("سطح 1")}
      {contactsFor("سطح 2")}
      {contactsFor("سطح 3")}
      {contactsFor("سطح 4 (دعوت نشده)")}
    </div>
  );
}

// onClick={() => {
//   if (socket.connected) {
//     socket.emit("sync", "updatePresent", {
//       _id: contact._id,
//       // with: "",
//       // message: "",
//       present: !contact.present,
//     });
//   } else {
//     console.log("لطفا اتصال اینترنت خود را بررسی نمایید!");
//     toast("لطفا اتصال اینترنت خود را بررسی نمایید!");
//   }
// }}
