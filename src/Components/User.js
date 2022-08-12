import React, { useState, useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TESARKImage from "../assets/TESARKImage.svg";
import tesarkTechnologiesSquarelogo from "../assets/tesarkTechnologiesSquarelogo.png";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// ---------------------------------menuComponent---------------------------------------------
let MenuComponent = (props) => {
  let contextValues = useContext(providerContext);
  const { templateName, isSubmitted, options, templateId, i } = props;
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
  const [btnDisabler, setBtnDisabler] = useState(false);

  // ------snack bar------
  const { vertical, horizontal, open } = openAlert;
  // ------submisssion------
  let submitMenus = async () => {
    try {
      setBtnDisabler(true);
      await contextValues.addSubMisssion({
        selected: [optionselected.menu],
        userId: window.localStorage.getItem("userId"),
        templateId: optionselected.templateId,
        userName: window.localStorage.getItem("userName"),
        templateName: optionselected.templateName,
        status: "Closed",
      });
      await contextValues.getUserClosedSubmissions({
        id: window.localStorage.getItem("userId"),
      });
      utlisFuncytions(true, "submitted Successfully");
    } catch (error) {
      console.log(error);
      utlisFuncytions(true, error.response.data.message);
      setBtnDisabler(false);
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
  const [expanded, setexpanded] = React.useState(false);
  const handleExpand = (isExpaned, panel) => {
    setexpanded(isExpaned ? panel : false);
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
      {/* ---------------------------acordian---------------------- */}
      <div className=" mb-lg-1 mb-md-1 mb-sm-1 mb-1  accordian-holder">
        <Accordion
          expanded={expanded === `panel${i}`}
          onChange={(e, isExpanded) => {
            handleExpand(isExpanded, `panel${i}`);
          }}
        >
          <AccordionSummary
            id={`panel${i}-header`}
            aria-controls={`panel${i}-content`}
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="d-flex align-items-center flex-row">
              <i
                style={{ fontSize: "10px" }}
                className="fa-solid fa-circle "
              ></i>
              <div style={{ textTransform: "uppercase", fontWeight: "600" }}>
                &nbsp;{templateName}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="d-flex flex-wrap">
              {options.map((o) => {
                let changeBg = o.name === optionselected.menu;
                return (
                  <div
                    onClick={() => {
                      setoptionSelected({
                        menu: o.name,
                        templateId: templateId,
                        templateName: templateName,
                      });
                    }}
                    style={{
                      cursor: "pointer",
                      display: isSubmitted ? "none" : "block",
                      textTransform: "capitalize",
                    }}
                    className={changeBg ? "menu-card1" : "menu-card"}
                  >
                    {o.name}
                  </div>
                );
              })}
              <div className="closed-container d-flex justify-content-center">
                <div
                  style={{
                    display: isSubmitted ? "block" : "none",
                  }}
                >
                  Closed
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <Button
                disabled={btnDisabler}
                className="me-1"
                variant="contained"
                color="secondary"
                style={{
                  display: isSubmitted ? "none" : "block",
                }}
                onClick={() => {
                  submissionData();
                }}
              >
                submit
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
// ---------------------------------------------------------------------------------------
function User(props) {
  const contextValues = useContext(providerContext);
  useEffect(() => {
    if (!window.localStorage.getItem("app_token")) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    contextValues.getUserClosedSubmissions({
      id: window.localStorage.getItem("userId"),
    });
  }, []);
  useEffect(() => {
    if (contextValues.userSubmissions.length === 0) {
      console.log(contextValues.userSubmissions);
    }
  }, [contextValues.userSubmissions]);
  let logOut = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  let navigate = useNavigate();
  const [drawerOPen, setDrawerOPen] = React.useState(false);
  return (
    <>
      {!props.loader ? (
        <>
          <div className="container-fluid user-background">
            {/* -----------------------------------top bar----------------------------------- */}
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* ---header--- */}
                  <div className="row tool-bar">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                      <img
                        src={TESARKImage}
                        alt="logoWithName"
                        className="img-fluid tesark-logo2 mt-4"
                      />
                      <div className="me-2 user-box  mt-4">
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
                  {/* -----------drwer------------- */}
                  <div className="material-drawer">
                    <div className="d-flex  align-items-center justify-content-between">
                      <div>
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
                                <i className="fa-solid fa-user user-drawer"></i>
                                &nbsp;
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
                                LogOut &nbsp;
                                <i className="fa-solid fa-power-off"></i>
                              </Button>
                            </div>
                          </Box>
                        </Drawer>
                      </div>
                      <div>
                        <img
                          className="img-fluid userpage-tesark-logo"
                          src={tesarkTechnologiesSquarelogo}
                          alt="tsark-logo"
                        ></img>
                      </div>
                    </div>
                  </div>
                  {/* ----main---- */}
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-8">
                      <div className="user-welcome-greet">
                        hi, &nbsp;
                        <span style={{ color: "#5ffbf1" }}>
                          {window.localStorage.getItem("userName")} !
                        </span>
                      </div>
                      {/* menucomponent--- */}
                      {contextValues.userSubmissions.length === 0 ? (
                        <div className="card opened-menu-card">
                          <div className="card-body">
                            <h5 className="card-title placeholder-glow">
                              <span className="placeholder col-6"></span>
                            </h5>
                            <hr />
                            <h5 className="card-text d-flex justify-content-between placeholder-glow">
                              <span className="placeholder col-2"></span>
                              <span className="placeholder col-2"></span>
                              <span className="placeholder col-2"></span>
                              <span className="placeholder col-2"></span>
                              <span className="placeholder col-2"></span>
                            </h5>
                            <div className="d-flex justify-content-end">
                              <button
                                style={{ backgroundColor: "#03045e" }}
                                className=" mt-2 btn disabled placeholder col-4"
                              ></button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        contextValues.userSubmissions.map((data, i) => {
                          console.log(data, " data");
                          return (
                            <MenuComponent
                              templateName={data.name}
                              isSubmitted={data.isSubmitted}
                              options={data.options}
                              templateId={data._id}
                              i={data._id}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
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

// ---------------------------------------------------------------------------------------
//  <div
//       className="card opened-menu-card menu-comp-col"
//       style={{
//         width: "25rem",
//         margin: "10px",
//       }}
//     >
//       <div className="card-body">
//         <h5
//           className="card-title"
//           style={{ textTransform: "capitalize", color: "#3f0036" }}
//         >
//           <div className="d-flex justify-content-between align-items-center flex-row">
//             <div className="d-flex align-items-center flex-row">
//               <i
//                 style={{ fontSize: "10px" }}
//                 className="fa-solid fa-circle "
//               ></i>
//               <div>&nbsp;{templateName}</div>
//             </div>
//           </div>
//         </h5>
//         <hr />
//         <div className="d-flex flex-wrap">
//           {options.map((o) => {
//             let changeBg = o.name === optionselected.menu;
//             return (
//               <div
//                 onClick={() => {
//                   setoptionSelected({
//                     menu: o.name,
//                     templateId: templateId,
//                     templateName: templateName,
//                   });
//                 }}
//                 style={{
//                   cursor: "pointer",
//                   display: isSubmitted ? "none" : "block",
//                 }}
//                 className={changeBg ? "menu-card1" : "menu-card"}
//               >
//                 {o.name}
//               </div>
//             );
//           })}
//           <div className="closed-container d-flex justify-content-center">
//             <div
//               style={{
//                 display: isSubmitted ? "block" : "none",
//               }}
//             >
//               Closed
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-end mt-2">
//           <Button
//             disabled={btnDisabler}
//             className="me-1"
//             variant="contained"
//             color="secondary"
//             style={{
//               display: isSubmitted ? "none" : "block",
//             }}
//             onClick={() => {
//               submissionData();
//             }}
//           >
//             submit
//           </Button>
//         </div>
//       </div>
//     </div>
