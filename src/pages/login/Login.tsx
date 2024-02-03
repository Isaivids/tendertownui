import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // Add your login logic here
    navigate('/list/juice')
    console.log("Login clicked. Username:", username, "Password:", password);
  };

  const LoginComp = () => {
    return (
      <div className="flex flex-column gap-3 bg-white border-round-md p-3">
        <span className="text-center scy">Login Here</span>
        <div className="p-field flex flex-column gap-1">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-field flex flex-column gap-1">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="p-field flex justify-content-center">
          <Button label="Login" icon="pi pi-sign-in"  onClick={handleLogin} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-content-center align-items-center pmy h-screen	">
      <LoginComp />
    </div>
  );
};

export default Login;
