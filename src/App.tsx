import React from "react";
import SideBar from "./components/sidebar/SideBar";
import List from "./pages/list/List";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/Login";
import NavBar from "./components/navbar/NavBar";
import Cart from "./components/cart/Cart";
function App() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="main-content">
          <Routes>
            <Route path="/list/:id" element={<List />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
        <Cart />
      </div>
    </>
  );
}

export default App;
