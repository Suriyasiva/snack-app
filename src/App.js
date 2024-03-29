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
import MainRoute from "./routes/main_route";
import AuthProvider from "./Providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <MainRoute />
    </AuthProvider>
  );
  // --------------------------------------
  // let location = useLocation();
  // let path = location.pathname;
  // let checkPath = path.startsWith("/admin");
  // let authenticate = async () => {
  //   try {
  //     if (window.localStorage.getItem("app_token")) {
  //       let checkToken = await contextData.lookUp();
  //       if (checkToken.role === "user" && checkPath) {
  //         navigate("/");
  //       } else {
  //         setLoader(true);
  //       }
  //     }
  //   } catch (error) {
  //     // navigate("/");/
  //   }
  // };
  // useEffect(() => {
  //   setLoader(false);
  //   if (token) {
  //     authenticate();
  //     setLoader(true);
  //   } else {
  //     setLoader(false);
  //   }
  // }, [token]);
  // return (
  //   <>
  //     <Routes>
  //       <Route exact path="/" element={<Login />} />
  //       <Route path="/user/*" element={<User loader={loader} />} />
  //       <Route path="/admin/*" element={<Admin loader={loader} />} />
  //       <Route exact path="/newComponent" element={<NewComponent />} />
  //       <Route path="*" element={<Page404 />} />
  //     </Routes>
  //   </>
  // );
}

export default App;
