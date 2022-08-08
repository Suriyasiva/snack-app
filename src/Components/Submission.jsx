import { Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
function Submission() {
  const [disable, setDisable] = useState(false);
  const contextValues = useContext(providerContext);
  // let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  console.log(currentDate);
  const [srcByDate, setSrcByDate] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    contextValues.submissions();
    contextValues.todaySubmits();
  }, []);
  useEffect(() => {
    if (Object.keys(contextValues.recentSubmits).length) {
      console.log("data fetched");
    }
  }, [contextValues.recentSubmits]);
  // console.log(contextValues.submissionData, "submissionData");
  var loaders = <div className="card_load_extreme_title"></div>;
  let handleStatus = async (id, status) => {
    try {
      setDisable(true);
      await contextValues.changeStatus(id, { status: status }, "menu status");
      contextValues.submissions();
    } catch (error) {
      console.log(error);
    } finally {
      setDisable(false);
    }
  };
  let handleActiveAll = async () => {
    await contextValues.statusActive();
    await contextValues.submissions();
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-end mt-2 ">
            <Button
              onClick={() => {
                handleActiveAll();
              }}
              className="refresh"
              color="error"
              variant="outlined"
            >
              Active All
            </Button>
            <button
              onClick={() => {
                console.log(contextValues.recentSubmits, "submits response");
                handleClickOpen();
              }}
              className="refresh"
            >
              Get Count
            </button>
            <button
              onClick={() => {
                setSrcByDate("");
              }}
              className="refresh"
            >
              <i className="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <Button
              onClick={() => {
                console.log(currentDate);
                setSrcByDate(currentDate);
              }}
              variant="outlined"
              color="error"
            >
              <i class="fa-solid fa-arrow-down-wide-short"></i>
            </Button>
          </div>
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              style={{ background: "rgb(209 181 205)" }}
            >
              <b className="today-submits-heading ">{"Today Submits"}</b>
              <b>{currentDate}</b>
              <hr className="hrDivider" />
            </DialogTitle>
            <DialogContent style={{ background: "rgb(209 181 205)" }}>
              <DialogContentText id="alert-dialog-description">
                <div className=" ms-1">
                  {Object.keys(contextValues.recentSubmits).length === 0 ? (
                    <div>"no submits"</div>
                  ) : (
                    Object.entries(contextValues.recentSubmits.todayCounts).map(
                      ([key, value], index) => {
                        return (
                          <>
                            <div
                              key={index + 1}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <div
                                style={{
                                  textTransform: "capitalize",
                                  fontWeight: "bold",
                                  color: "black",
                                }}
                              >
                                {key}
                              </div>
                              <div
                                style={{
                                  marginRight: "8px",
                                  fontWeight: "bold",
                                  color: "black",
                                }}
                              >
                                {value}
                              </div>
                            </div>
                            <hr className="hrDivider" />
                          </>
                        );
                      }
                    )
                  )}
                  <div className="d-flex justify-content-end me-2">
                    <div
                      className="mt-1"
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      Total = {contextValues.recentSubmits.total}
                    </div>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ background: "rgb(209 181 205)" }}>
              <Button color="error" onClick={handleClose} autoFocus>
                close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="row">
          <div className="col-sm-12 table-container">
            <div class="bd-example mt-1">
              <table class="table table-hover">
                <thead>
                  <tr className="font-weight-bold">
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Template</th>
                    <th scope="col">Submitted At</th>
                    <th scope="col">Selected Menu</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contextValues.submissionData.length === 0 ? (
                    <tr>
                      <th scope="row">{loaders}</th>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                    </tr>
                  ) : (
                    contextValues.submissionData
                      .filter((item) => {
                        if (srcByDate === "") {
                          console.log(srcByDate, "1");
                          return item;
                        } else if (
                          item.submittedAt
                            .toLowerCase()
                            .includes(srcByDate.toLowerCase())
                        ) {
                          console.log(srcByDate, "curr date");
                          return item;
                        }
                      })
                      .map((data, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td
                              className="fw-bold"
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {data.userName}
                            </td>
                            <td>{data.templateName}</td>
                            <td>{data.submittedAt}</td>
                            <td
                              className="font-weight-bold"
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {data.selected[0]}
                            </td>
                            <td> {data.status}</td>
                            <td>
                              {data.status === "Closed" ? (
                                <Button
                                  disabled={disable}
                                  onClick={() => {
                                    handleStatus(data._id, "Active");
                                  }}
                                  variant="outlined"
                                  color="error"
                                >
                                  Active&nbsp;
                                </Button>
                              ) : (
                                <Button
                                  disabled={disable}
                                  onClick={() => {
                                    handleStatus(data._id, "Closed");
                                  }}
                                  variant="outlined"
                                  color="error"
                                >
                                  Closed
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
let SubmissionProvider = () => {
  return (
    <Provider>
      <Submission />
    </Provider>
  );
};
export default SubmissionProvider;
