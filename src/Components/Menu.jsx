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
      const contextData = contextValues.templateData;
      var findId = contextData.findIndex((data) => {
        return data.id === id;
      });
      // console.log(contextData[findId], "findId");
      let changeData = await axios.put(
        `https://61f0e50b072f86001749eedf.mockapi.io/tesark/${id}`,
        {
          isOpened: contextData[findId].isOpened ? false : true,
        }
      );
      contextValues.menuData();
      // console.log("changeData", changeData);
    } catch (error) {
      console.log("changeIsOpened error", error);
    }
  };
  let deleteMenu = async (id) => {
    await contextValues.deleteTemplate(id);
    contextValues.menuData();
    setOpen(false);
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
            <div className="row mt-3">
              <div className="col-sm-12">
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
                      {optionValues.map((data) => {
                        return (
                          <tr>
                            <th scope="row">{data.id}</th>
                            <td className="view-Menu">
                              <strong
                                onClick={() => {
                                  console.log(data.id);
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
                                to={`/admin/editMenu/${data.id}`}
                                className="menu-edit-button  m-2"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>{" "}
                                Edit
                              </Link>

                              <Button
                                onClick={handleClickOpen}
                                className="m-2"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
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
                                      onClick={() => {
                                        deleteMenu(data.id);
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
                                    changeIsOpened(data.id);
                                  }}
                                  variant="outlined"
                                  color="error"
                                >
                                  &nbsp;<i className="fa-solid fa-xmark"></i>
                                  &nbsp;&nbsp;
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    changeIsOpened(data.id);
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
                      })}
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
