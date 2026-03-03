import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { fetchContacts, fetchEvents, fetchContactsByEvent } from "./connection/fetchContacts";
import { socket } from "./connection/socket";
import { handle_socket_server } from "./connection/socket_functions";
import Error from "./others/Error";
import Calling from "./pages/Calling";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { getCurrentUser } from "./utils/auth";
import Evaluation from "./pages/Evaluation";

export default function App() {
  // const [mode, setMode] = useState("tab1");
  const [contacts, setContacts] = useState([]);
  const [lastEvent, setLastEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("javanesafa_auth");
    return storedAuth ? storedAuth : null;
  });
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTab2, setActiveTab2] = useState("tab5");

  const currentUser = getCurrentUser()?.lastName;

  useEffect(() => {
    handle_socket_server(setContacts, setLoadingError);
    fetchContacts(setContacts, setLastEvent, setLoadingError);
    fetchEvents(setEvents, setLoadingError);

    socket.on("updatePresents", ({ _currentUser, _contacts }) => {
      // console.log("on updatePresents");
      if (_currentUser !== currentUser) setContacts(_contacts);
    });
  }, []);

  // Set selectedEvent to lastEvent when lastEvent is loaded
  useEffect(() => {
    if (lastEvent && !selectedEvent) {
      setSelectedEvent(lastEvent);
    }
  }, [lastEvent]);

  // Update contacts when selectedEvent changes
  useEffect(() => {
    if (selectedEvent?._id) {
      fetchContactsByEvent(setContacts, selectedEvent._id, setLoadingError);
    }
  }, [selectedEvent]);

  const mentors = contacts.filter((c) => c.role === "mentor" || c.role === "help mentor");
  const loginContacts = mentors; // مربی‌ها و کمک مربی‌ها می‌تونن لاگین کنن
  const currentUserRole = isAuthenticated ? JSON.parse(isAuthenticated).role : null;
  const isMentor = currentUserRole === "mentor";
  
  let users = contacts.filter((c) => {
    const event = selectedEvent || lastEvent;
    if (!event) return false;
    const cond1 =
      event.group === "همه" ? true : c.group === event.group;
    const cond2 = c.active === true;

    return c.role === "user" && cond1 && cond2;
  });
  if (activeTab2 === "tab5" && !isMentor)
    users = users.filter((u) => {
      return (
        u.follower &&
        isAuthenticated &&
        JSON.parse(u.follower).followerID === JSON.parse(isAuthenticated)._id
      );
    });

  const handleLogout = () => {
    localStorage.removeItem("javanesafa_auth");
    setIsAuthenticated(null);
  };

  function handleConditions(page) {
    if (!isAuthenticated)
      return (
        <SignIn contacts={loginContacts} setIsAuthenticated={setIsAuthenticated} />
      );
    if (loadingError) return <Error loadingError={loadingError} />;
    return page;
  }

  return (
    <div className="max-w-screen-2xl mx-auto font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={handleConditions(
            <Home
              contacts={users}
              setContacts={setContacts}
              lastEvent={selectedEvent || lastEvent}
              events={events}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeTab2={activeTab2}
              setActiveTab2={setActiveTab2}
              onLogout={handleLogout}
            />
          )}
        />
        <Route
          path="/calling/:id"
          element={handleConditions(
            <Calling
              users={users}
              contacts={contacts}
              lastEvent={selectedEvent || lastEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setContacts={setContacts}
              isMentor={isMentor}
            />
          )}
        />
        <Route
          path="/evaluation/:id"
          element={handleConditions(
            <Evaluation
              users={users}
              contacts={contacts}
              lastEvent={selectedEvent || lastEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setContacts={setContacts}
              isMentor={isMentor}
            />
          )}
        />
      </Routes>
    </div>
  );
}
