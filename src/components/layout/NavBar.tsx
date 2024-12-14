import { useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage and cookies
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"; // Expiring the token cookie
    }

    // Redirect the user to the login page
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl mr-4">Tactology</div>
        {/* Header Text */}
        <div className="text-white text-2xl">Global</div>
      </div>
      {/* Log Out Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </nav>
  );
};

export default NavBar;
