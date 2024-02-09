import React from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar";

const WithNavbar = () => {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default WithNavbar;
