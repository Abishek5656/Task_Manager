import { useState } from "react";

export const useNavbar = () => {
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const onLogout = () => {
    // Example logout logic
    localStorage.clear();
    window.location.reload();
  };

  return {
    search,
    setSearch,
    showLogout,
    setShowLogout,
    onLogout,
  };
};
