import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import logo from "../../assets/logo.png";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { clearCart } from "../../store/slice/cart";
import { clearSelectedUser, clearUser, getUsers, setLoggedInUser } from "../../store/slice/user";
import { clearProducts } from "../../store/slice/products";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";

const NavBar = () => {
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData]: any = useState();
  const [selectedUser, setSelectedUser]:any = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const userData = await dispatch(getUsers());
      setData(userData.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await fetchData();
    };
    fetchDataAndLog();
  }, [fetchData]);

  const logout = () => {
    dispatch(clearCart());
    dispatch(clearUser());
    dispatch(clearProducts());
    dispatch(clearSelectedUser());
    navigate("/");
  };

  const selectedTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const optionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const setUser = (e:any) =>{
    dispatch(setLoggedInUser(e.value));
    setSelectedUser(e.value)
  }

  const handleUserChange = () =>{
    dispatch(clearSelectedUser());
    setSelectedUser('')
  }

  return (
    <div className="navbar flex px-6 w-full align-items-center justify-content-between pmy">
      <div className="logo flex gap-1 align-items-center">
        <img src={logo} alt="Tender Town" />
        <span className="scy">Tender Town</span>
      </div>
      {userDetails.loading ? (
        "loading"
      ) : (
        <div className="flex align-items-center gap-2">
          <Dropdown
            value={selectedUser}
            onChange={(e: DropdownChangeEvent) => setUser(e)}
            options={data}
            optionLabel="name"
            placeholder="Select"
            filter
            disabled = {selectedUser}
            valueTemplate={selectedTemplate}
            itemTemplate={optionTemplate}
          />
          <Button label="Switch Table" severity="success" onClick={handleUserChange}/>
          <Button icon="pi pi-user" severity="info" aria-label="User" onClick={logout} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
