import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCallings, updateCallings } from "../connection/fetchContacts";
import { socket } from "../connection/socket";
import { getCurrentUser } from "../utils/auth";
import { unix2date } from "../utils/dateConversion";

export default function Calling({
  contacts,
  users,
  lastEvent,
  activeTab,
  setActiveTab,
  setContacts,
}) {
  const navigate = useNavigate();

  let message = "message";
  let message_recorder = "message_recorder";
  if (activeTab === "tab1") {
    message = "message1";
    message_recorder = "message1_recorder";
  } else if (activeTab === "tab3") {
    message = "message2";
    message_recorder = "message2_recorder";
  } else {
    navigate(`/`);
  }
  const { id } = useParams();
  const [callings, setCallings] = useState([]);
  // console.log(callings);
  const contact = users?.find((c) => c._id === id);

  const currentUser = getCurrentUser()?.lastName;
  const currentCalling = callings?.find((c) => c?.eventID === lastEvent?._id);
  const currentFollwer = currentCalling?.[message_recorder];
  const info = {
    currentUser,
    currentCalling,
    currentFollwer,
    message,
    message_recorder,
  };

  const [result, setResult] = useState("");

  useEffect(() => {
    fetchCallings(setCallings, id);

    socket.on("updateCalling", ({ _contactID, _currentUser, _callings }) => {
      // console.log("on updateCalling");
      if (_contactID === id && _currentUser !== currentUser)
        setCallings(_callings);
    });
  }, []);

  useEffect(() => {
    setResult(currentCalling?.[message]);
  }, [callings, setResult, lastEvent]);

  return (
    <div className=" bg-gray-100 min-h-screen bg-gray-800">
      <Header contact={contact} />
      <Follower
        contact={contact}
        lastEvent={lastEvent}
        callings={callings}
        setCallings={setCallings}
        setResult={setResult}
        info={info}
        setContacts={setContacts}
        contacts={contacts}
      />
      {currentUser === currentFollwer && (
        <CurrentEvent
          contact={contact}
          setCallings={setCallings}
          lastEvent={lastEvent}
          info={info}
          result={result}
          setResult={setResult}
        />
      )}
      <Timeline contact={contact} callings={callings} info={info} />
    </div>
  );
}

function Header({ contact }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 shadow py-3 px-5 flex items-center justify-start gap-24 text-right">
      <button onClick={() => navigate(-1)} className="text-gray-700">
        <FaArrowRight size={16} className="text-gray-300" />
      </button>
      <h1 className=" font-bold text-gray-300">{contact?.lastName}</h1>
      {/* <button
        onClick={() => navigate(`/rating/${contact._id}`)}
        className="text-gray-700 font-bold bg-gray-200 rounded-lg py-1 px-3"
      >
        ارزیابی
      </button> */}
    </div>
  );
}

function Follower({
  contact,
  lastEvent,
  callings,
  setCallings,
  info,
  setResult,
  setContacts,
  contacts,
}) {
  const {
    currentUser,
    currentCalling,
    currentFollwer,
    message,
    message_recorder,
  } = info;
  const hasAnotherFollower = currentFollwer && currentFollwer !== currentUser;
  const currentFollwerExist = currentCalling?.[message_recorder]?.length > 0;
  // console.log(callings);
  // console.log(currentFollwer);

  function handleFollow() {
    if (!hasAnotherFollower) {
      const callback1 = (contacts) =>
        contacts.map((c) =>
          c._id === contact._id
            ? {
                ...c,
                [message_recorder]: currentFollwerExist ? "" : currentUser,
                [message]: "",
              }
            : c
        );
      setContacts(callback1);
      // console.log("emit updatePresents2");
      socket.emit("updatePresents", {
        _currentUser: currentUser,
        _contacts: callback1(contacts),
      });

      // console.log(hasAnotherFollower);
      updateCallings({
        contactID: contact._id,
        eventID: lastEvent?._id,
        [message_recorder]: currentFollwerExist ? "" : currentUser,
        [message]: "",
      });
      setResult("");

      // console.log("send updateCalling");

      socket.emit("updateCalling", {
        _contactID: contact._id,
        _currentUser: currentUser,
        _callings: callback(callings),
      });

      setCallings(callback);

      function callback(callings) {
        if (currentCalling)
          return callings.map((c) =>
            c.eventID === lastEvent?._id
              ? {
                  ...c,
                  [message_recorder]: currentFollwerExist ? "" : currentUser,
                  [message]: "",
                }
              : c
          );
        else {
          return [
            ...callings,
            {
              contactID: contact._id,
              eventID: lastEvent?._id,
              date: lastEvent?.date,
              eventName: lastEvent?.eventName,
              [message_recorder]: currentFollwerExist ? "" : currentUser,
              [message]: "",
            },
          ];
        }
      }
    }
  }

  return (
    <div className="px-4 bg-gray-600 flex gap-2 justify-center items-center">
      {/* <div className="flex flex-col gap-2">
        <div>
          <p className="text-xs text-yellow-600">عنوان برنامه: </p>
          <h1 className="text-sm font-bold">{lastEvent?.eventName}</h1>
        </div>
        <div>
          <p className="text-xs text-yellow-600">تاریخ: </p>
          <h1 className="text-sm font-bold">{unix2date(lastEvent?.date)}</h1>
        </div>
      </div> */}
      <div className="flex gap-2 justify-center items-center p-3">
        <div className=" p-2 gap-2 flex flex-col justify-center items-center rounded-xl bg-gray-800">
          {!hasAnotherFollower && (
            <p
              className=" w-20  [background:linear-gradient(90deg,#730202_0%,#F00_100%)] shadow-xl p-2 text-sm text-center content-center font-semibold rounded-xl text-teal-100 border-2 border-gray-200 border-dashed"
              onClick={handleFollow}
            >
              {currentFollwer === currentUser ? "لغو" : "من پیگیری میکنم"}
            </p>
          )}
          {currentFollwer && (
            <p className=" w-20  shadow-xl p-2 text-sm text-center content-center font-semibold rounded-xl text-teal-100 border-2 border-gray-200 border-dashed">
              {currentFollwer}
            </p>
          )}
        </div>

        <FaArrowLeft size={20} className="text-gray-900" />

        {/* Content Section */}
        {/* <div
          className=" w-24 text-right p-2 gap-2 flex flex-col rounded-xl bg-gray-800"
          dir="rtl"
        > */}
        {/* <img
            src={
              contact?.image && contact?.image.trim() !== ""
                ? `https://javanesafa.storage.iran.liara.space/javanan3/${contact?.group}/${contact?.image}`
                : "../person.png"
            }
            alt={contact?.lastName}
            className="w-20 h-24 rounded-xl object-cover border-2 border-gray-200 border-dashed"
          /> */}

        <div className=" p-2 gap-2 flex flex-col justify-center items-center rounded-xl bg-gray-800">
          <p className="h-20 w-20  shadow-xl p-2 text-sm text-center content-center font-semibold rounded-xl text-teal-100 border-2 border-gray-200 border-dashed">
            {contact?.lastName}
          </p>
          {/* </div> */}
        </div>
      </div>{" "}
    </div>
  );
}

function CurrentEvent({
  contact,
  setCallings,
  lastEvent,
  info,
  setResult,
  result,
}) {
  const {
    currentUser,
    currentFollwer,
    currentCalling,
    message,
    message_recorder,
  } = info;
  const hasAnotherFollower = currentFollwer && currentFollwer !== currentUser;

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSetResult() {
    if (!hasAnotherFollower) {
      updateCallings({
        contactID: contact._id,
        eventID: lastEvent?._id,
        [message]: result,
      });

      setCallings((callings) =>
        callings.map((c) =>
          c.eventID === lastEvent?._id
            ? {
                ...c,
                [message]: result,
              }
            : c
        )
      );
    }
  }

  function handleCall(phoneNumber) {
    if (phoneNumber?.length > 5) {
      window.open(`tel:${phoneNumber}`);
      setIsModalOpen(false);
    }
  }

  const phones = [
    { name: "خودش", phone: contact?.phone },
    { name: "پدر", phone: contact?.phone_f },
    { name: "مادر", phone: contact?.phone_m },
    { name: "منزل", phone: contact?.phone_h },
  ];

  return (
    <div className="bg-gray-900 pb-6 pt-4 flex justify-center items-center gap-2">
      {/* Call Button */}
      <div
        className="w-16 rounded-full overflow-hidden border border-2 border-green-500 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img src="../call.webp" alt="Call" />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)} // Close modal on outside click
        >
          <div
            className="bg-white p-2 rounded-3xl shadow-lg w-48 border-2 border-green-900"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="grid grid-cols-2 gap-1">
              {phones.map(({ name, phone }, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleCall(phone)}
                    className={`text-left px-4 py-2 text-center h-14 bg-gray-400 hover:bg-gray-200 text-white 
                      ${
                        index === 0 &&
                        (phone?.length > 5
                          ? "rounded-tr-3xl bg-green-950"
                          : "bg-white")
                      }
                      ${
                        index === 1 &&
                        (phone?.length > 5
                          ? "rounded-tl-3xl bg-green-900"
                          : "bg-white")
                      }
                      ${
                        index === 2 &&
                        (phone?.length > 5
                          ? "rounded-br-3xl bg-green-800"
                          : "bg-white")
                      }
                      ${
                        index === 3 &&
                        (phone?.length > 5
                          ? "rounded-bl-3xl bg-green-700"
                          : "bg-white")
                      }
                    `}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Textarea and Submit Button */}
      <div className="h-24 w-60 relative border-2 border-gray-600 border-dashed rounded-xl p-1 bg-white">
        <button
          className="text-xs text-white absolute bottom-0 left-0 [background:linear-gradient(90deg,#730202_0%,#F00_100%)] p-2 rounded-full translate-x-4 translate-y-4 border border-gray-200"
          onClick={handleSetResult}
        >
          ثبت نتیجه پیگیری{" "}
        </button>
        <textarea
          className="h-full w-full rounded-xl p-1 text-sm"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

function Timeline({ callings, info }) {
  const { message, message_recorder } = info;
  return (
    <div className="p-3 bg-gray-800 text-white">
      <h1 className="mb-4 text-center font-bold">وضعیت حضور برنامه های اخیر</h1>
      <div className="relative ">
        {/* <div className="absolute h-full border-8 left-10 rounded-full border-gray-700"></div> */}
        {callings?.map((calling, index) => {
          const message1Exist = calling?.message1?.length > 0;
          const message2Exist = calling?.message2?.length > 0;
          const activeCalling = message1Exist || message2Exist;
          // console.log(calling);
          return (
            activeCalling && (
              <div key={calling?._id} className="mb-5 relative">
                {/* Circle */}
                <div
                  className={`absolute left-0 top-0 w-24 p-2 ${
                    calling?.present ? "bg-green-800" : "bg-red-800"
                  } rounded-2xl shadow-lg flex flex-col gap-1 items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {calling?.eventName}
                  </span>
                  <span className="text-white text-xs font-bold">
                    {unix2date(calling?.date)}
                  </span>
                </div>

                {/* Event Details */}
                <div
                  className={`bg-white p-3 rounded-bl-lg rounded-br-3xl rounded-tl-3xl rounded-tr-lg shadow-md w-60 overflow-auto`}
                >
                  {message1Exist && (
                    <div className="mb-2">
                      <p className="text-yellow-700 text-center font-bold text-xs">
                        {calling?.message1_recorder}
                        {" (قبل برنامه):"}
                      </p>
                      <p className="text-center text-gray-700 text-xs mt-1">
                        {calling?.message1}
                      </p>
                    </div>
                  )}{" "}
                  {message2Exist && (
                    <div>
                      <p className="text-purple-700 text-center font-bold text-xs">
                        {calling?.message2_recorder}
                        {" (حین برنامه):"}
                      </p>
                      <p className="text-center text-gray-700 text-xs mt-1">
                        {calling?.message2}
                      </p>
                    </div>
                  )}{" "}
                </div>
                {/* )} */}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
