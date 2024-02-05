import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../../App.scss";
import logo from "../../assets/logo.png";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { clearCart } from "../../store/slice/cart";
import { clearUser } from "../../store/slice/user";
import { clearProducts } from "../../store/slice/products";
const NavBar = () => {
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData]:any = useState()
  const navigate = useNavigate();
  useEffect(() => {
    setData(userDetails.body.data); 
    if(!userDetails.body.data){
      navigate('/')
    }  
  }, [navigate, userDetails]);

  const logout = () =>{
    dispatch(clearCart());
    dispatch(clearUser());
    dispatch(clearProducts());
    navigate('/');
  }
  
  return (
    <div className="navbar flex px-6 w-full align-items-center justify-content-between pmy">
      <div className="logo flex gap-1 align-items-center">
        <img src={logo} alt="Tender Town" />
        <span className="scy">Tender Town</span>
      </div>
      <div className="flex align-items-center gap-2">
        <span className="font-bold">Table - {data && data.table}</span>
        <FaUser onClick={logout}/>
      </div>
    </div>
  );
};

export default NavBar;
