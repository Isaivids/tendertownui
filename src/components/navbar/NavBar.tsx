import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../../App.scss";
import logo from "../../assets/logo.png";
import "./NavBar.scss";
const NavBar = () => {
  return (
    <div className="navbar flex px-6 w-full align-items-center justify-content-between pmy">
      <div className="logo flex gap-1 align-items-center">
        <img src={logo} alt="Tender Town" />
        <Link to="/" className="scy">Tender Town</Link>
      </div>
      <FaUser />
    </div>
  );
};

export default NavBar;
