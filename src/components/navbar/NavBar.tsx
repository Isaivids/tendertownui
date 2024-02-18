import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.scss";
import logo from "../../assets/logo.png";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { clearCart } from "../../store/slice/cart";
import {
  changeActive,
  clearSelectedUser,
  clearUser,
  getUsers,
  setLoggedInUser,
} from "../../store/slice/user";
import { clearProducts } from "../../store/slice/products";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";

const NavBar = () => {
  const userDetails = useSelector((state: any) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData]: any = useState();
  const [selectedUser, setSelectedUser]: any = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(false);
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

  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [location])
  

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
        <div>
          {option.name}
          {option.active ? "🟢" : "🔴"}
        </div>
      </div>
    );
  };

  const setUser = async (e: any) => {
    const { _id } = e.target.value;
    const rs = await dispatch(changeActive({ tableId: _id, active: true }));
    if (rs.payload.status) {
      dispatch(setLoggedInUser(e.value));
      setSelectedUser(e.value);
    }
  };

  const handleUserChange = async () => {
    dispatch(clearSelectedUser());
    setSelectedUser("");
    const userData = await dispatch(getUsers());
    if (userData.payload.status) {
      setData(userData.payload.data);
    } else {
      setData([]);
    }
  };

  const Biller = () => {
    return (
      <>
        <Dropdown
          value={selectedUser}
          onChange={(e: DropdownChangeEvent) => setUser(e)}
          options={data}
          // options={data && data.map((option:any) => ({
          //   ...option,
          //   disabled: option.active
          // }))}
          optionLabel="name"
          placeholder="Select"
          filter
          disabled={selectedUser}
          valueTemplate={selectedTemplate}
          itemTemplate={optionTemplate}
        />
        <Button
          label="Switch Table"
          severity="success"
          onClick={handleUserChange}
        />
      </>
    );
  };

  return (
    <div className="navbar flex px-6 w-full align-items-center justify-content-between pmy">
      <div className="logo flex gap-1 align-items-center">
        <img src={logo} alt="Tender Town" />
        <span className="scy">Tender Town</span>
      </div>
      {userDetails.loading ? (
        "loading..."
      ) : (
        <div className="flex gap-2">
          {!admin && <Biller />}
          <div className="flex align-items-center gap-2">
            <Button
              icon="pi pi-user"
              severity="info"
              aria-label="User"
              onClick={logout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
