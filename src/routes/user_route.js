import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../Components/Users";

const UserRoute = (props) => {
  return (
    <Routes path="/user">
      <Route exact path={"/home"} component={<User />} />
    </Routes>
  );
};

export default UserRoute;
