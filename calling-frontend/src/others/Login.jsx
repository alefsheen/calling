import { useState } from "react";

export default function Login({ setIsAuthenticated }) {
  const [name, setName] = useState(() => {
    return localStorage.getItem("javanesafa_name") || "";
  });
  const [family, setFamily] = useState(() => {
    return localStorage.getItem("javanesafa_family") || "";
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() && family.trim()) {
      const username = `javanesafa_${name}_${family}`;
      console.log(username);
      setIsAuthenticated(username);
      localStorage.setItem("javanesafa_auth", username);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-10 rounded-lg shadow-lg">
        <label className="text-2xl font-bold mb-6 text-gray-700">نام</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام خود را وارد کنید"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label className="text-2xl font-bold mb-6 text-gray-700">
          نام خانوادگی
        </label>
        <input
          type="text"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          placeholder="نام خانوادگی خود را وارد کنید"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
