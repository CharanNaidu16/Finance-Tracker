import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="flex bg-gradient-to-r from-purple-600 to-purple-800 h-[60px] items-center justify-between px-5 shadow-md">
      <div className="text-white text-2xl font-bold">FINANCE TRACKER</div>
      <nav className="hidden md:flex gap-6 text-white font-semibold">
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/income" className="hover:underline">
          Income Tracker
        </Link>
        <Link to="/expenses" className="hover:underline">
          Expense Tracker
        </Link>
        <Link to="/savings" className="hover:underline">
          Savings Goals
        </Link>
        <Link to="/currency" className="hover:underline">
          Currency Converter
        </Link>
        <Link to="/news" className="hover:underline">
          Financial News
        </Link>
      </nav>
      <div className="flex items-center md:hidden">
        <RxDropdownMenu
          className="cursor-pointer text-white h-12 w-12"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex items-center">
        <CiUser className="w-10 h-10 rounded-full border-2 border-white bg-white" />

        <span className="hidden md:ml-2 md:block text-white">Username</span>
        <div className="ml-4 relative"></div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-5">
            <button onClick={toggleSidebar} className="text-xl mb-4">
              ✖
            </button>
            <nav className="flex flex-col gap-4 font-semibold">
              <Link to="/" onClick={toggleSidebar}>
                Dashboard
              </Link>
              <Link to="/income" onClick={toggleSidebar}>
                Income Tracker
              </Link>
              <Link to="/expenses" onClick={toggleSidebar}>
                Expense Tracker
              </Link>
              <Link to="/savings" onClick={toggleSidebar}>
                Savings Goals
              </Link>
              <Link to="/currency" onClick={toggleSidebar}>
                Currency Converter
              </Link>
              <Link to="/news" onClick={toggleSidebar}>
                Financial News
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
