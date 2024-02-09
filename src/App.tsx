import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/Login";
import WithOutNavBar from "./components/navbar/WithOutNavBar";
import WithNavbar from "./components/navbar/WithNavbar";
import Home from "./pages/Home/Home";
import Admin from "./pages/admin/Admin";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import Users from "./pages/users/Users";

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithOutNavBar />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<WithNavbar />}>
          <Route path="/list/:id" element={<Home />} />
          <Route element={<Admin />}>
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
