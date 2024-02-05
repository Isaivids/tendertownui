import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../../App.scss";
import logo from "../../assets/logo.png";
import "./NavBar.scss";
import { useSelector } from "react-redux";
const NavBar = () => {
  const userDetails = useSelector((state: any) => state.userDetails);
  const [data, setData]:any = useState()
  useEffect(() => {
    setData(userDetails.body.data);    
  }, [userDetails])
  
  return (
    <div className="navbar flex px-6 w-full align-items-center justify-content-between pmy">
      <div className="logo flex gap-1 align-items-center">
        <img src={logo} alt="Tender Town" />
        <Link to="/" className="scy">Tender Town</Link>
      </div>
      <div className="flex align-items-center gap-2">
        <span className="font-bold">Table - {data && data.table}</span>
        <FaUser />
      </div>
    </div>
  );
};

export default NavBar;
