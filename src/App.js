import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Page404 from "./Components/Page404";
import User from "./Components/User";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticateToken } from "./Providers/Auth";
import DummyPage from "./Components/DummyPage";

function App() {
  console.log("--iam app.js--");
  let location = useLocation();
  let path = location.pathname;
  let checkPath = path.startsWith("/admin");
  let contextData = useContext(authenticateToken);
  let navigate = useNavigate();
  let [loader, setLoader] = useState(false);
  let token = window.localStorage.getItem("app_token");
  // -----
  let authenticate = async () => {
    try {
      let checkToken = await contextData.lookUp(
        window.localStorage.getItem("app_token")
      );
      console.log(checkToken, "token role");
      console.log("--check1--");
      if (checkToken.role == "user" && checkPath) {
        console.log("--check2--");
        navigate("/");
      } else {
        setLoader(true);
      }
      console.log("--check3--");
    } catch (error) {
      console.log("lookup error", error);
      navigate("/");
    }
  };
  useEffect(() => {
    setLoader(false);
    if (token) {
      authenticate();
    } else {
      console.log("no token");
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/*" element={<User loader={loader} />} />
        <Route path="/admin/*" element={<Admin loader={loader} />} />
        <Route path="/dummyPage" element={<DummyPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
// import Home from "./Components/Home";
