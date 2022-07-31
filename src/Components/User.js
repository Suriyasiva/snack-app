import React, { useState, useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TESARKImage from "../assets/TESARKImage.svg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// ---------------------------------menuComponent---------------------------------------------
let MenuComponent = (props) => {
  const { templateName, options, templateId, submissionDatas } = props;
  let contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.allOpenedTemplates();
  }, []);
  // console.log(submissionDatas, "submissionDatas");------------
  // usestate----
  const [optionselected, setoptionSelected] = useState({});
  const [openAlert, setOpenAlert] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [showMessage, setShowMessage] = useState({
    error: false,
    message: "",
  });
  // ------snack bar------
  const { vertical, horizontal, open } = openAlert;
  // ------submisssion------
  let submitMenus = async () => {
    try {
      await contextValues.addSubMisssion({
        selected: [optionselected.menu],
        userId: window.localStorage.getItem("userId"),
        templateId: optionselected.templateId,
        userName: window.localStorage.getItem("userName"),
        templateName: optionselected.templateName,
        status: "Closed",
      });
      utlisFuncytions(true, "submitted Successfully");
    } catch (error) {
      console.log(error);
      utlisFuncytions(true, error.response.data.message);
    }
  };
  let submissionData = () => {
    Object.keys(optionselected).length === 0
      ? utlisFuncytions(false, "Please Select the Menu")
      : submitMenus();
  };
  // functions---------------------------
  let utlisFuncytions = async (alert, message) => {
    await setShowMessage({
      error: alert,
      message: message,
    });
    await setOpenAlert({ open: true, vertical: "top", horizontal: "center" });
    setTimeout(() => {
      setOpenAlert({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
    }, 3000);
  };
  return (
    <>
      {/* -------snack bar------- */}
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
        >
          <Alert
            severity={showMessage.error ? "success" : "error"}
            variant="filled"
          >
            {showMessage.message}
          </Alert>
        </Snackbar>
      </div>
      {/* -------snack bar end----------- */}
      <div
        className="card opened-menu-card"
        style={{
          width: "25rem",
          margin: "10px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title ">
            <b>
              {templateName}
              <br />
            </b>
          </h5>
          {submissionDatas.map((data) => {
            return <div>{data.status}</div>;
          })}
          <div className="d-flex flex-wrap ">
            {options.map((menu, i) => {
              let isSelected = optionselected.menu === menu.name;
              return (
                <div
                  key={i}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    setoptionSelected({
                      templateName: templateName,
                      menu: menu.name,
                      templateId: templateId,
                    });
                  }}
                  className={isSelected ? "menu-card1" : "menu-card"}
                >
                  {menu.name}
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-end mt-2">
            <Button
              disabled={
                submissionDatas.length !== 0 &&
                submissionDatas.map((data) => {
                  if ((data.status = "Closed")) {
                    return true;
                  } else {
                    return false;
                  }
                })
              }
              className="me-2"
              onClick={() => {
                submissionData();
              }}
              variant="contained"
              color="secondary"
            >
              submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
// ---------------------------------------------------------------------------------------
function User(props) {
  // src = { undraw_coffee_with_friends_3cbj };
  // ------useContext Hook------
  const contextValues = useContext(providerContext);
  // -------useEffect hooks-------
  useEffect(() => {
    if (!window.localStorage.getItem("app_token")) {
      navigate("/");
    }
  }, []);
  // ------------geting all opened template --------------------
  useEffect(() => {
    contextValues.allOpenedTemplates();
  }, []);
  // --------------waiting for state changes---------------------

  let [openedTemplates, setOpenedTemplates] = React.useState([]);

  useEffect(() => {
    let openedTemplateIds = contextValues.OpenedTemplates.map((data) => {
      return data._id;
    });
    setOpenedTemplates(openedTemplateIds);
  }, [contextValues.OpenedTemplates]);

  useEffect(() => {
    if (openedTemplates.length === 0) {
      console.log("empty state");
    } else {
      // console.log(openedTemplates, "state changed");
      contextValues.getUserClosedSubmissions({
        userId: window.localStorage.getItem("userId"),
        templateId: openedTemplates,
      });
    }
  }, [openedTemplates]);

  // ------otherHooks--------
  let navigate = useNavigate();

  // ----useStates----
  const [drawerOPen, setDrawerOPen] = React.useState(false);

  // -------logOut Functions---------
  let logOut = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <>
      {props.loader ? (
        <>
          <div className="container-fluid user-background">
            {/* -----------------------------------top bar----------------------------------- */}
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
            {/* -----------------------------------select----------------------------------- */}
            <div className="row">
              <div className="col-lg-12">
                {contextValues.OpenedTemplates.length === 0 ? (
                  <div style={{ color: "#fff" }}>Loading....</div>
                ) : (
                  contextValues.OpenedTemplates.map((data) => {
                    // console.log(contextValues.userSubmissions);
                    // contextValues.userSubmissions.map((submits) => {});
                    return (
                      <MenuComponent
                        templateName={data.name}
                        options={data.options}
                        templateId={data._id}
                        submissionDatas={contextValues.userSubmissions.filter(
                          (o) => {
                            return o.templateId === data._id;
                          }
                        )}
                      />
                    );
                  })
                )}
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
