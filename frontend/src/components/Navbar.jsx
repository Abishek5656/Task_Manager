import React, { useState, useEffect, useRef } from "react";

const Navbar = ({ search, setSearch, onLogout }) => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef();

  // Close the logout popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="relative" ref={logoutRef}>
        <button
          onClick={() => setShowLogout(!showLogout)}
          className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer select-none font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="User menu"
        >
          U
        </button>

        {showLogout && (
          <div
            className="absolute right-0 mt-2 bg-white border rounded shadow px-4 py-2 text-sm cursor-pointer select-none hover:bg-gray-100"
            onClick={() => {
              onLogout();
              setShowLogout(false);
            }}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
