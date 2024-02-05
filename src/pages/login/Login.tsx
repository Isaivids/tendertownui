import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputNumber } from 'primereact/inputnumber';
    
const Login: any = () => {
  const [username, setUsername]:any = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: any) => state.userDetails);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body: any = {
      table: username,
      admin: false,
    };
    dispatch(addUser(body));
    if (!userDetails.body.loading && !userDetails.body.error) {
      navigate("/list/all");
    }
  };

  return (
    <div className="pmy h-screen flex flex-column align-items-center justify-content-center">
      <div className="form bg-white	p-3 gap-3">
        <h3 className="font-md font-bold">Login as Guest</h3>
        <form onSubmit={handleSubmit} className="flex flex-column">
          <div>
            <label htmlFor="tableno">Table Number:</label><br />
            <InputNumber 
              id="tableno"
              value={username}
              onValueChange={(e:any) => setUsername(e.value)}
              useGrouping={false}
              className="mt-2"
            />
          </div>
          <div className="flex justify-content-center">
            <Button label="Login" severity="success" className="mt-3" disabled={!username}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
