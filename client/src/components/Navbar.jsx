import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  return (
    <nav className="bg-gray-800 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          {user && (
            <Link to="/notes" className="text-white hover:text-gray-300">
              Notes
            </Link>
          )}
        </div>
        <div className="flex space-x-4">
          {user ? (
            <button
              onClick={logoutUser}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
