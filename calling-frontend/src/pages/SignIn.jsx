import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn({ contacts, setIsAuthenticated }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleConfirmSelection = () => {
    const toEnglishDigits = (str) =>
      str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    if (
      toEnglishDigits(password.trim()) ===
      toEnglishDigits(selectedContact.phone.trim())
    ) {
      console.log(password, selectedContact.phone);
      // if (String(password) === String(selectedContact.phone)) {
      // if (password === selectedContact.phone) {
      localStorage.setItem("javanesafa_auth", JSON.stringify(selectedContact));
      setIsAuthenticated(JSON.stringify(selectedContact));
      setIsModalOpen(false);
    } else {
      toast("رمز عبور اشتباه است!");
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <div className="text-center text-teal-100 font-bold text-xl p-4">
        <p> نام خود را انتخاب کنید</p>
      </div>

      <div className="grid grid-cols-3 items-center gap-2 justify-center text-sm hover:shadow-xl transition-shadow p-2">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            onClick={() => handleSelectContact(contact)}
            className={`flex flex-col items-center justify-center gap-1 h-full shadow-lg rounded-xl bg-teal-800 px-2 py-2 cursor-pointer`}
          >
            <p className="text-[16px] text-center content-center leading-6 min-h-16 font-semibold text-teal-100">
              {contact.lastName}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-300 rounded-lg py-4 px-4 mx-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-lg font-semibold">
              ورود به عنوان
              <span className="text-yellow-700 font-bold">
                {" "}
                {selectedContact?.lastName.split("،")[0]}{" "}
              </span>
            </p>
            <input
              type="password"
              placeholder="رمز عبور را وارد کنید"
              className="border rounded-lg p-2 mb-4 w-60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleConfirmSelection}
              className="bg-teal-800 text-white px-4 py-2 rounded-lg w-60 hover:bg-teal-700"
            >
              ورود
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
