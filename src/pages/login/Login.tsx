import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";
import biller from '../../assets/icons/biller.svg'
import admin from '../../assets/icons/admin.svg'
import './Login.scss'
const Login: any = () => {
  const [username, setUsername]:any = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: any) => state.userDetails);
  const navigate = useNavigate();
  const handleLogin = (type:any) => {
    // const body: any = {
    //   table: username,
    //   admin: false,
    // };
    // dispatch(addUser(body));
    // if (!userDetails.body.loading && !userDetails.body.error) {
    //   sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
    //   navigate("/list/all");
    // }
    if(type === 'admin'){
      navigate('/admin/products')
    }else if(type === 'biller'){
      navigate('/list/all');
    }
  };

  return (
    <div className="pmy h-screen flex flex-column align-items-center justify-content-center">
      <div className="p-3 gap-3">
        <h2 className="font-md font-bold text-center">Welcome Back !</h2>
          <div className="image">
            <div className="flex flex-column">
              <img src={biller} alt="Biller" onClick={() => handleLogin('biller')}/>
              <h3 className="text-center">Biller</h3>
            </div>
            <div className="flex flex-column">
              <img src={admin} alt="Admin" onClick={() => handleLogin('admin')}/>
              <h3 className="text-center">Admin</h3>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
