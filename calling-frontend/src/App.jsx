import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { fetchContacts } from "./connection/fetchContacts";
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

    socket.on("updatePresents", ({ _currentUser, _contacts }) => {
      // console.log("on updatePresents");
      if (_currentUser !== currentUser) setContacts(_contacts);
    });
  }, []);

  const admins = contacts.filter((c) => c.role === "admin");
  let users = contacts.filter((c) => {
    const cond1 =
      lastEvent.group === "همه" ? true : c.group === lastEvent.group;
    const cond2 = c.active === true;

    return c.role === "user" && cond1 && cond2;
  });
  if (activeTab2 === "tab5")
    users = users.filter((u) => {
      return (
        u.follower &&
        isAuthenticated &&
        JSON.parse(u.follower).followerID === JSON.parse(isAuthenticated)._id
      );
    });

  function handleConditions(page) {
    if (!isAuthenticated)
      return (
        <SignIn contacts={admins} setIsAuthenticated={setIsAuthenticated} />
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
              lastEvent={lastEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeTab2={activeTab2}
              setActiveTab2={setActiveTab2}
            />
          )}
        />
        <Route
          path="/calling/:id"
          element={handleConditions(
            <Calling
              users={users}
              contacts={contacts}
              lastEvent={lastEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setContacts={setContacts}
            />
          )}
        />
        <Route
          path="/evaluation/:id"
          element={handleConditions(
            <Evaluation
              users={users}
              contacts={contacts}
              lastEvent={lastEvent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setContacts={setContacts}
            />
          )}
        />
      </Routes>
    </div>
  );
}
