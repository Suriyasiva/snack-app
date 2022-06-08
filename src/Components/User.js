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
      templateId: contextValues.isOpenedMenu.id,
      userName: window.localStorage.getItem("userName"),
    });
  };
  console.log(option, "submit options");

  let logOut = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    navigate("/");
  };
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
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
  let handleSubmit = () => {
    contextValues.addSubMisssion(option);
    setOpen(false);
    setSnackBarOpen(true);
    setTimeout(() => {
      snackHandleClose();
    }, 3000);
    handleClick(TransitionLeft);
  };
  return (
    <div className="container mt-5">
      <div>
        <Button
          onClick={logOut}
          color="error"
          className="me-3"
          variant="outlined"
        >
          LogOut
        </Button>
      </div>
      <div className="row">
        <h4>{contextValues.isOpenedMenu.name}</h4>
        <div className="col-sm-8 ">
          <div className="d-flex">
            <div style={{ width: "300px" }}>
              <Select
                options={selectOption}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={selectedOption}
              />
            </div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                      Your Order: {contextValues.isOpenedMenu.name}&nbsp;
                      <i className="fa-solid fa-chevron-right right-arrow-menu"></i>
                      &nbsp;
                      <span style={{ color: "tomato" }}>{option.selected}</span>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleSubmit} autoFocus>
                    Agree
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
              <Stack sx={{ width: "50%" }} spacing={2}>
                <Alert severity="error">Please Select The Menu !!!</Alert>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
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
// contextValues.isOpenedMenu.selectedType==="single"?null:isMulti
