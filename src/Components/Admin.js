import React from "react";
import Home from "./Home";
import Menu from "./Menu";
import SendMenu from "./SendMenu";
import Submission from "./Submission";
import Users from "./Users";
import CreateMenu from "./CreateMenu";
import EditMenu from "./EditMenu";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import MenuList from "./MenuList";
import UserEdit from "./UserEdit";
import Button from "@mui/material/Button";

function Admin() {
  let navigate = useNavigate();
  let logOut = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-2 col-lg-2 col-md-2 home-component">
            <NavBar />
          </div>
          <div className="col-sm-10">
            {/*add row for tool bar  */}
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-end align-items-center mt-2">
                <div className="me-2 user-box">
                  <i className="fa-solid fa-user-large me-2"></i>
                  <b className="user-name">
                    {window.localStorage.getItem("userName")}
                  </b>
                </div>
                <Button
                  onClick={logOut}
                  color="error"
                  className="me-3"
                  variant="outlined"
                >
                  LogOut
                </Button>
              </div>
            </div>
            <Routes>
              <Route exact path="home" element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="editMenu/:id" element={<EditMenu />} />
              <Route path="createMenu" element={<CreateMenu />} />
              <Route path="editUser/:id" element={<UserEdit />} />
              <Route path="sendMenu" element={<SendMenu />} />
              <Route path="submission" element={<Submission />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
