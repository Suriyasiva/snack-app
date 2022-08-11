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
import NewComponent from "./Components/NewComponent";

function App() {
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
      if (window.localStorage.getItem("app_token")) {
        let checkToken = await contextData.lookUp();
        if (checkToken.role === "user" && checkPath) {
          navigate("/");
        } else {
          setLoader(true);
        }
      }
    } catch (error) {
      console.log("lookup error", error);
      navigate("/");
    }
  };
  useEffect(() => {
    setLoader(false);
    if (token) {
      authenticate();
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [token]);
  return (
    <>
      {loader ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/*" element={<User loader={loader} />} />
          <Route path="/admin/*" element={<Admin loader={loader} />} />

          <Route path="/newComponent" element={<NewComponent />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dummyPage" element={<DummyPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
// import Home from "./Components/Home";
