import React from "react";
import List from "./pages/list/List";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/Login";
import WithOutNavBar from "./components/navbar/WithOutNavBar";
import WithNavbar from "./components/navbar/WithNavbar";
function App() {
  return (
    <>
      <Routes>
        <Route element={<WithOutNavBar />}>
          <Route path="/" element={<Login/>} />
        </Route>
        <Route element={<WithNavbar />}>
          <Route path="/list/:id" element={<List />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
