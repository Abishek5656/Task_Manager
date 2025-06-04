import React from "react";

const Navbar = ({ search, setSearch, showLogout, setShowLogout, onLogout }) => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-1/3"
      />
      <div className="relative">
        <div
          className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer select-none"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          U
        </div>
        {showLogout && (
          <div
            className="absolute right-0 mt-2 bg-white border rounded shadow px-4 py-2 text-sm cursor-pointer select-none"
            onClick={onLogout}
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
