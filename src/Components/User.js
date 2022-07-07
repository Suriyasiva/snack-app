import React, { useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import Select from "react-select";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
function User() {
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
  let navigate = useNavigate();
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
    console.log(e.label, "target ");
    setOption({
      selected: [e.label],
      userId: window.localStorage.getItem("userId"),
      templateId: contextValues.isOpenedMenu._id,
      userName: window.localStorage.getItem("userName"),
    });
  };
  // console.log(option, "submit options");

  let logOut = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
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
  };
  return (
    <>
      <div className="container-fluid user-bacjground">
        {/*---top bar---*/}
        <div className="row ">
          <div className="col-sm-12">
            <div className="d-flex justify-content-between align-items-center mt-4">
              <img
                src="https://www.tesark.com/wp-content/uploads/2019/11/TESARK_Royal.svg"
                alt="logoWithName"
                className="ms-3 img-fluid tesark-logo2"
              />
              <div className="me-2 user-box">
                <i className="fa-solid fa-user-large border border-white p-2 text-white me-2"></i>
                <b className="user-name ">
                  {window.localStorage.getItem("userName")}
                </b>
                <Button
                  onClick={logOut}
                  color="secondary"
                  className="me-3 ms-3"
                  variant="contained"
                >
                  LogOut
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* --greet-- */}
        <div className="row mt-5">
          <div className="col-sm-12 d-flex justify-content-center">
            <div className="text-light p-3 greeting-user display-4">
              welcome to tesark
            </div>
          </div>
        </div>
        {/*--select--*/}
        <div className="row mt-3">
          <div className="col-sm-12 d-flex justify-content-center">
            <div>
              <div
                style={{ display: selectView ? "none" : "inline" }}
                className="col-sm-8 mt-3 "
              >
                <h5 className="text-white input-label mb-2">
                  Select Your Favourite: {contextValues.isOpenedMenu.name}
                </h5>
                <div className="d-flex d-flex ">
                  <div style={{ width: "300px", marginRight: "3px" }}>
                    <Select
                      options={selectOption}
                      className="basic-multi-select"
                      classNamePrefix="select"
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
                          <div className="your-order">
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
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">Please Select The Menu !!!</Alert>
                    </Stack>
                  </div>
                </div>
              </div>
              {selectView ? (
                <div>
                  <div className=" opened-menu-container text-white">
                    Opened Menu:
                    <span className="opened-menu">
                      &nbsp;
                      {contextValues.isOpenedMenu.name}
                    </span>
                  </div>
                  <div className=" opened-menu-container text-white">
                    Selected Item:
                    {Object.keys(contextValues.closedUserData).length === 0 ? (
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
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

let userProvider = () => {
  return (
    <Provider>
      <User />
    </Provider>
  );
};
export default userProvider;
