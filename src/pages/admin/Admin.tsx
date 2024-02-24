// Admin.tsx
import React, { useState } from "react";
import "./Admin.scss";
import { NavLink, Outlet } from "react-router-dom";
import { BiSolidDrink } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";

function Sidebar({ isOpen, toggleSidebar }: any) {
  return (
    <div className={`pmy side ${isOpen ? "open" : ""}`}>
      <div className="flex">
        <button onClick={toggleSidebar} className="m-1 scy">
          ☰
        </button>
      </div>
      <div className="flex flex-column font-semibold text-base text-green-700 mt-3">
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'activelink flex gap-2 align-items-center navlinks' : 'flex gap-2 align-items-center navlinks'}>
          <BiSolidDrink />
          <span className={isOpen ? "" : "hidden"}>Products</span>
        </NavLink>
        <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'activelink flex gap-2 align-items-center navlinks' : 'flex gap-2 align-items-center navlinks'}>
          <BiCategoryAlt />
          <span className={isOpen ? "" : "hidden"}>Categories</span>
        </NavLink>
        <NavLink to="/admin/bills" className={({ isActive }) => isActive ? 'activelink flex gap-2 align-items-center navlinks' : 'flex gap-2 align-items-center navlinks'}>
          <FaChartBar />
          <span className={isOpen ? "" : "hidden"}>Bills</span>
        </NavLink>
      </div>
    </div>
  );
}

function Admin() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
