import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { isUser, setIsUser } = useContext(UserContext); // get setter from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setIsUser(null); // reset user
    navigate("/auth/login"); // redirect to login
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to="/books" className="mr-5 hover:text-gray-900">
            Books
          </Link>
        </nav>

        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Link
            to="/books/add"
            className="inline-flex items-center bg-blue-600 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base"
          >
            Add Book
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>

          {isUser ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center bg-gray-300 text-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="inline-flex items-center bg-gray-300 text-gray-700 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
