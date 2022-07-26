import { Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import Provider, { providerContext } from "../Providers/Provider";
function Submission() {
  const [disable, setDisable] = useState(false);
  const contextValues = useContext(providerContext);
  let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const [srcByDate, setSrcByDate] = useState("");
  useEffect(() => {
    contextValues.submissions();
  }, []);
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-end mt-2 ">
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
        <div className="row">
          <div className="col-sm-12 table-container">
            <div class="bd-example mt-1">
              <table class="table table-hover">
                <thead>
                  <tr className="font-weight-bold">
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Created At</th>
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
                          item.createdAt
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
                            <td className="fw-bold">{data.userName}</td>
                            <td>{data.userId}</td>
                            <td>{data.createdAt}</td>
                            <td className="font-weight-bold">
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
