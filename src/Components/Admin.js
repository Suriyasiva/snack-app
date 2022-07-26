import React, { useEffect, useContext } from "react";
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
import { authenticateToken } from "../Providers/Auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Admin(props) {
  console.log(props, "props");
  let contextData = useContext(authenticateToken);
  let navigate = useNavigate();
  // -----------
  useEffect(() => {
    if (!window.localStorage.getItem("app_token")) {
      navigate("/");
    }
  }, [props]);

  let logOut = async () => {
    await window.localStorage.clear();
    navigate("/");
  };
  return (
    <>
      {/* ------- */}
      {props.loader ? (
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
                    <b className="user-name text-dark">
                      {window.localStorage.getItem("userName")}
                    </b>
                  </div>
                  <Button
                    onClick={logOut}
                    color="error"
                    className="me-4"
                    variant="outlined"
                  >
                    LogOut
                  </Button>
                </div>
              </div>
              <Routes>
                <Route exact path="home" element={<Home />} />
                <Route exact path="menu" element={<Menu />} />
                <Route exact path="editMenu/:id" element={<EditMenu />} />
                <Route exact path="createMenu" element={<CreateMenu />} />
                <Route exact path="editUser/:id" element={<UserEdit />} />
                <Route exact path="sendMenu" element={<SendMenu />} />
                <Route exact path="submission" element={<Submission />} />
                <Route exact path="users" element={<Users />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Backdrop
            sx={{
              color: "#03045e",
              backgroundColor: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={"false"}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </>
  );
}

export default Admin;
