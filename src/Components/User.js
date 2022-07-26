import React, { useState, useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import Select from "react-select";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import undraw_coffee_with_friends_3cbj from "../assets/undraw_coffee_with_friends_3cbj (1).svg";
import TESARKImage from "../assets/TESARKImage.svg";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { fontWeight } from "@mui/system";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
// -----user component------
function User(props) {
  // --------
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? "#5FFBF1" : null,
        color: "#3f0036",
      };
    },
  };

  // --------
  const [drawerOPen, setDrawerOPen] = React.useState(false);

  // --------
  const [error, setError] = React.useState({ display: false, message: "" });
  console.log(props.loader, "loader-user");
  let navigate = useNavigate();
  let location = useLocation();
  let path = location.pathname;
  console.log(path.startsWith("/admin"), "startsWith");
  useEffect(() => {
    if (!window.localStorage.getItem("app_token")) {
      // alert("--no token--");
      navigate("/");
    }
  }, []);
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState({});
  const [optionAlert, setOptionAlert] = React.useState(false);
  const handleClickOpen = () => {
    if (Object.keys(option).length === 0) {
      // alert("no menu is selected");
      setOptionAlert(true);
    } else {
      setOptionAlert(false);
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.openedTemplate();
    contextValues.checkStatus(window.localStorage.getItem("userId"));
    contextValues.getRecentSubmission(window.localStorage.getItem("userId"));
  }, []);
  useEffect(() => {
    if (Object.keys(contextValues.isOpenedMenu).length) {
    }
  }, [contextValues.isOpenedMenu]);
  var selectOption =
    Object.keys(contextValues.isOpenedMenu).length === 0
      ? {
          value: "loading",
          label: "loading",
        }
      : contextValues.isOpenedMenu.options.map((opt) => {
          return {
            value: opt.id,
            label: opt.name,
          };
        });
  let selectedOption = (e) => {
    // console.log(e.label, "target ");
    setOption({
      selected: [e.label],
      userId: window.localStorage.getItem("userId"),
      templateId: contextValues.isOpenedMenu._id,
      userName: window.localStorage.getItem("userName"),
    });
  };
  // console.log(option, "submit options");

  let logOut = () => {
    window.localStorage.clear();
    navigate("/");
  };
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [selectView, setSelectView] = React.useState(false);
  const [isDisable, setDisable] = React.useState(false);
  const snackHandleClose = () => {
    setSnackBarOpen(false);
  };
  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setSnackBarOpen(true);
    setTimeout(() => {
      snackHandleClose();
    }, 3000);
  };

  let getMenuStatus = (data) => {
    data.filter((subdata) => {
      if (
        subdata.status === "Closed" &&
        subdata.userId === window.localStorage.getItem("userId")
      ) {
        setSelectView(true);
        // var a = parseInt(subdata.userId);
      } else {
        setSelectView(false);
      }
    });
  };
  useEffect(() => {
    if (contextValues.submissionUserstatus.length !== 0) {
      getMenuStatus(contextValues.submissionUserstatus);
    }
  }, [contextValues.submissionUserstatus]);
  let handleSubmit = async () => {
    try {
      await setDisable(true);
      await contextValues.addSubMisssion({ ...option, status: "Closed" });
      setOpen(false);
      setSnackBarOpen(true);
      setTimeout(() => {
        snackHandleClose();
        setSelectView(true);
      }, 3000);
      contextValues.getRecentSubmission(window.localStorage.getItem("userId"));
      handleClick(TransitionLeft);
    } catch (error) {
      await setError({ display: true, message: error.response.data });
      console.log(error);
    } finally {
      setTimeout(() => {
        setError({ display: false, message: "" });
      }, 2000);
    }
  };
  return (
    <>
      {props.loader ? (
        <>
          <div className="container-fluid user-bacjground">
            {/*---top bar---*/}
            <div className="row tool-bar">
              <div className="col-sm-12">
                <div className=" d-md-flex d-lg-flex d-xl-flex justify-content-between align-items-center ">
                  <img
                    src={TESARKImage}
                    alt="logoWithName"
                    className="ms-3 img-fluid tesark-logo2 mt-4"
                  />
                  <div className="me-2 user-box mt-4">
                    <i className="fa-solid fa-user-large border border-white p-2 text-white me-2"></i>
                    <b className="user-name ">
                      {window.localStorage.getItem("userName")}
                    </b>
                    <Button
                      onClick={logOut}
                      color="secondary"
                      className="me-3 ms-3 login-res"
                      variant="contained"
                    >
                      LogOut
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* -----------drwer------------- */}
            <div className="material-drawer">
              <i
                onClick={() => {
                  setDrawerOPen(true);
                }}
                className="fa-solid fa-bars"
              ></i>
              <Drawer
                anchor="left"
                open={drawerOPen}
                onClose={() => {
                  setDrawerOPen(false);
                }}
              >
                <Box p={2} width="250px" role="presentation">
                  <div className="d-flex justify-content-between align-items-center ">
                    <img
                      src={TESARKImage}
                      alt="logoWithName"
                      className=" img-fluid tesark-logo2R"
                    />
                    <i
                      style={{
                        color: "#3f0036",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setDrawerOPen(false);
                      }}
                      className="fa-solid fa-circle-chevron-left"
                    ></i>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between flex-column">
                    <div className=" d-flex justify-content-start align-items-center userNAmeDrawer">
                      <i className="fa-solid fa-user user-drawer"></i>&nbsp;
                      <span className="user-drawer1">
                        &nbsp;
                        {window.localStorage.getItem("userName")}
                      </span>
                    </div>
                    <Button
                      onClick={logOut}
                      style={{
                        backgroundColor: "#3f0036",
                      }}
                      className="me-3 ms-3 login-resR"
                      variant="contained"
                    >
                      LogOut &nbsp;<i className="fa-solid fa-power-off"></i>
                    </Button>
                  </div>
                </Box>
              </Drawer>
            </div>
            {/*--select--*/}
            <div className="row mt-5">
              <div className="col-lg-6 d-flex justify-content-center">
                <div>
                  <div
                    style={{ display: selectView ? "none" : "inline" }}
                    className="col-sm-8 mt-5 "
                  >
                    <p className="user-welcome-greet">
                      Hi,
                      <span style={{ color: "#5FFBF1" }}>
                        {window.localStorage.getItem("userName")}
                      </span>{" "}
                      !
                    </p>
                    <p className="snack-qoute m-0  p-0">
                      Keep Clam & Order your <br /> Favourite &nbsp;
                      <span className="snack-name">
                        {contextValues.isOpenedMenu.name}
                      </span>
                    </p>
                    <div className="d-flex d-flex ">
                      <div style={{ width: "300px", marginRight: "3px" }}>
                        <Select
                          options={selectOption}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          styles={colourStyles}
                          onChange={selectedOption}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}
                      >
                        Order
                      </Button>
                      <div>
                        <Dialog
                          open={open}
                          fullWidth
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Confirm Your Order ?
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <div
                                style={{ color: "#3f0036" }}
                                className="your-order"
                              >
                                <span className="text-dark">Your Order:</span>{" "}
                                {contextValues.isOpenedMenu.name}&nbsp;
                                <i className="fa-solid fa-chevron-right right-arrow-menu"></i>
                                &nbsp;
                                <span style={{ color: "tomato" }}>
                                  {option.selected}
                                </span>
                              </div>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                              onClick={handleSubmit}
                              disabled={isDisable}
                              autoFocus
                            >
                              Place Order
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {/* snack bar */}
                        <div className="snackBar">
                          <Snackbar
                            open={snackBarOpen}
                            onClose={snackHandleClose}
                            TransitionComponent={transition}
                            message="Order Placed"
                            key={transition ? transition.name : ""}
                          >
                            <Alert
                              onClose={snackHandleClose}
                              open={snackBarOpen}
                              severity="success"
                              sx={{ width: "100%" }}
                            >
                              Order Placed successfully
                            </Alert>
                          </Snackbar>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div style={{ display: optionAlert ? "block" : "none" }}>
                        <Stack sx={{ width: "18.5rem" }} spacing={2}>
                          <Alert severity="error">
                            please select the menu !!!
                          </Alert>
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {selectView ? (
                    <div className="ms-3">
                      <p className="user-welcome-greet ">
                        Hi,
                        <span style={{ color: "#5FFBF1" }}>
                          {window.localStorage.getItem("userName")}
                        </span>{" "}
                        !
                      </p>
                      <p className="snack-qoute m-0  p-0">
                        Your
                        <span className="">
                          {Object.keys(contextValues.closedUserData).length ===
                          0 ? (
                            <span>
                              <CircularProgress
                                sx={{ color: "#fff" }}
                                size="1rem"
                              />
                            </span>
                          ) : (
                            <span
                              className="opened-menu"
                              style={{ color: "#5FFBF1" }}
                            >
                              &nbsp;
                              {contextValues.closedUserData.selected[0]}
                            </span>
                          )}
                        </span>
                        &nbsp;will Arrive Soon.
                      </p>
                      <p
                        style={{ color: "#fff", fontSize: "20px" }}
                        className=""
                      >
                        be Patience and have fun .
                      </p>
                      {/* <div className=" opened-menu-container text-white">
                        Opened Menu:
                        <span className="opened-menu">
                          &nbsp;
                          {contextValues.isOpenedMenu.name}
                        </span>
                      </div> */}
                      {/* <div className=" opened-menu-container text-white">
                        Selected Item:
                        {Object.keys(contextValues.closedUserData).length ===
                        0 ? (
                          <span>Loading...</span>
                        ) : (
                          <span
                            className="opened-menu"
                            style={{ color: "whitesmoke" }}
                          >
                            &nbsp;
                            {contextValues.closedUserData.selected[0]}
                          </span>
                        )}
                      </div> */}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 d-flex justify-content-center">
                <img
                  src={undraw_coffee_with_friends_3cbj}
                  className="img-fluid user-r-imag"
                  alt="coffee-user"
                />
              </div>
            </div>
            <div className="row user-error-alert">
              <div
                style={{ display: error.display ? "block" : "none" }}
                className="col-lg-3 col-sm-12 col-md-4"
              >
                <Alert severity="error" color="error">
                  {error.message}
                </Alert>
              </div>
            </div>
          </div>
        </>
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

let userProvider = ({ loader }) => {
  return (
    <Provider>
      <User loader={loader} />
    </Provider>
  );
};
export default userProvider;
