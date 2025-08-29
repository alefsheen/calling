"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set this to true only when the component is rendered on the client
  }, []);

  if (!isClient) {
    // Prevent rendering on the server
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API to verify the credentials
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save the token in sessionStorage or a secure cookie
      sessionStorage.setItem("site-name", data.token);
      router.push("/"); // Redirect to order page
    } else {
      alert("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="flex items-center p-10 justify-center h-full bg-gradient-to-b from-teal-300 to-teal-900">
      <div className="bg-white bg-opacity-80 p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold text-teal-900 mb-6 text-center">
          ورود به سامانه{" "}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3  rounded-md border border-teal-200 focus:outline-none focus:border-teal-400 transition"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3  rounded-md border border-teal-200 focus:outline-none focus:border-teal-400 transition"
          />
          <button
            type="submit"
            className="w-full p-3 font-bold text-white bg-teal-500 rounded-md hover:bg-teal-600 transition"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
