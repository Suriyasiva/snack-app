import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import User from "./Components/User";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// import Home from "./Components/Home";
