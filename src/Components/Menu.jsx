import React, { useContext, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Provider, { providerContext } from "../Providers/Provider";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Menu() {
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  var loaders = <div className="card_load_extreme_title"></div>;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.menuData();
  }, []);
  const optionValues = contextValues.templateData;

  const changeIsOpened = async (id) => {
    try {
      setDisable(true);
      console.log(id, "id");
      const contextData = contextValues.templateData;
      var findId = contextData.findIndex((data) => {
        return data._id === id;
      });
      console.log(contextData[findId], "findId");
      let changeData = await axios.put(
        `https://tesark-server.herokuapp.com/manageStatus/isOpened/${id}`,
        {
          isOpened: contextData[findId].isOpened ? false : true,
        },
        {
          headers: {
            authorization: window.localStorage.getItem("app_token"),
          },
        }
      );
      contextValues.menuData();
      // console.log("changeData", changeData);
    } catch (error) {
      console.log("changeIsOpened error", error);
    } finally {
      setDisable(false);
    }
  };
  let deleteMenu = async (id) => {
    try {
      setDisable(true);
      await contextValues.deleteTemplate(id);
      contextValues.menuData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDisable(false);
    }
  };
  return (
    <>
      {/* <Routes>
        <Route path="/editMenu/:id" element={<EditMenu />} />
        <Route path="/createMenu" element={<CreateMenu />} />
      </Routes> */}
      <div className="container-fluid ">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-end mt-3">
                <Link to="/admin/createMenu" className="menu-add-Button">
                  <span className="button_top">
                    <i className="fa-solid fa-plus"></i>Menu
                  </span>
                </Link>
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="col-sm-12 table-container">
                <div className="bd-example">
                  <table className="table table-hover table-menu ">
                    <thead>
                      <tr className="font-weight-bold">
                        <th scope="col">#</th>
                        <th scope="col">Menu Name</th>
                        <th scope="col">Is Opened</th>
                        <th scope="col">Action</th>
                        <th scope="col">Manage IsOpened</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optionValues.length === 0 ? (
                        <tr>
                          <th>{loaders}</th>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                        </tr>
                      ) : (
                        optionValues.map((data, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td className="view-Menu">
                                <strong
                                  onClick={() => {
                                    console.log(data._id);
                                  }}
                                >
                                  {data.name}
                                </strong>
                              </td>
                              {data.isOpened ? (
                                <td style={{ color: "green" }}>Active</td>
                              ) : (
                                <td style={{ color: "red" }}>InActive</td>
                              )}
                              <td>
                                <Link
                                  to={`/admin/editMenu/${data._id}`}
                                  className="menu-edit-button  m-2"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                  onClick={handleClickOpen}
                                  className="m-2 deletebtn-icon"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                                <div>
                                  <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogTitle id="alert-dialog-title">
                                      {"Are You Sure?"}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Do You Want to Delete the Menu ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleClose}>
                                        Cancel
                                      </Button>
                                      <Button
                                        disabled={disable}
                                        onClick={() => {
                                          deleteMenu(data._id);
                                        }}
                                        autoFocus
                                      >
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                              </td>
                              <td>
                                {data.isOpened ? (
                                  <Button
                                    onClick={() => {
                                      changeIsOpened(data._id);
                                    }}
                                    disabled={disable}
                                    variant="outlined"
                                    color="error"
                                  >
                                    &nbsp;<i className="fa-solid fa-xmark"></i>
                                    &nbsp;&nbsp;
                                  </Button>
                                ) : (
                                  <Button
                                    disabled={disable}
                                    onClick={() => {
                                      changeIsOpened(data._id);
                                    }}
                                    variant="outlined"
                                    color="success"
                                  >
                                    &nbsp;<i className="fa-solid fa-check"></i>
                                    &nbsp;&nbsp;
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
          {/* <Outlet /> */}
        </div>
      </div>
    </>
  );
}
let providerComp = (props) => {
  return (
    <Provider>
      <Menu />
    </Provider>
  );
};
export default providerComp;
