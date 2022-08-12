import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProvider from "../Components/User";
// import User from "../Components/Users";

const UserRoute = (props) => {
  return (
    <Routes path="/user">
      <Route exact path={"/home"} component={<UserProvider />} />
    </Routes>
  );
};

export default UserRoute;
