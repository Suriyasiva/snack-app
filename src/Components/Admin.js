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
              <div className="col-sm-12 d-flex justify-content-end  mt-2">
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
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
