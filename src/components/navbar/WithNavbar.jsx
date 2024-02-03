import React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import SideBar from "../sidebar/SideBar";
import Cart from "../cart/Cart";

const WithNavbar = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="main-content">
          <Outlet />
        </div>
        <Cart />
      </div>
    </>
  );
};

export default WithNavbar;
