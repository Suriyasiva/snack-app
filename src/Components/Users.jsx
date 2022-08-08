import React, { useContext, useEffect } from "react";
import { Button, InputAdornment } from "@mui/material";
import AuthProvider, { authProviderContext } from "../Providers/AuthProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function Users() {
  const contextValues = useContext(authProviderContext);
  // add user dialog box
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };
  // ---------------------
  const [ShowError, setShowError] = React.useState("Retry");
  const [catchErr, setCatchErr] = React.useState({
    OpenError: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, OpenError } = catchErr;

  const openError = (newState) => {
    setCatchErr({ OpenError: true, ...newState });
  };

  const closeError = () => {
    setCatchErr({ ...catchErr, OpenError: false });
  };

  // ---------------------
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      role: "",
      phoneNumber: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setDisable(true);
        await contextValues.addUser(values);
        await contextValues.userData();
        resetForm();
        handleAddUserClose();
        console.log(values);
      } catch (error) {
        console.log(error);
        await setShowError(error.response.data.message);
        openError({
          vertical: "top",
          horizontal: "center",
        });
        resetForm();
      } finally {
        setDisable(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.userName) {
        errors.userName = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.role) {
        errors.role = "Required";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length <= 6) {
        errors.password = "invalid password !";
      }
      return errors;
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      setDisable(true);
      await console.log(id);
      await contextValues.deleteUser(id);
      await contextValues.userData();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    contextValues.userData();
  }, []);
  let usersData = contextValues.user;
  var loaders = <div class="card_load_extreme_title"></div>;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-end mt-2">
                {/* <button onClick={handleAddUserOpen} className="menu-add-Button">
                  <span className="button_top">
                    &nbsp;<i className="fa-solid fa-plus"></i>User&nbsp;
                  </span>
                </button> */}
                <Dialog
                  open={addUserOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleAddUserClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle className="font-weight-bold d-flex justify-content-between">
                    <span>Add User</span>
                    <span>
                      <i
                        onClick={handleAddUserClose}
                        className="fa-solid fa-x"
                      ></i>
                    </span>
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="col-sm-6">
                                  <label className="form-label font-weight-bold m-0">
                                    Names:
                                  </label>
                                  <input
                                    className="form-control m-0"
                                    type={"text"}
                                    onChange={formik.handleChange}
                                    value={formik.values.userName}
                                    name="userName"
                                  />
                                  {formik.errors.userName ? (
                                    <div>{formik.errors.userName}</div>
                                  ) : null}
                                </div>
                                <div className="col-sm-6">
                                  <label className="form-label font-weight-bold m-0">
                                    Email:
                                  </label>
                                  <input
                                    className="form-control m-0"
                                    type={"email"}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    name="email"
                                  />
                                  {formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <label className="form-label font-weight-bold m-0">
                                    Select Role:
                                  </label>
                                  <br />
                                  <select
                                    className="form-select m-0"
                                    onChange={formik.handleChange}
                                    value={formik.values.role}
                                    name="role"
                                  >
                                    <option selected>
                                      Open this select menu
                                    </option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                  {formik.errors.role ? (
                                    <div>{formik.errors.role}</div>
                                  ) : null}
                                </div>
                                <div className="col-sm-6">
                                  <label className="form-label font-weight-bold m-0">
                                    Phone Number:
                                  </label>
                                  <input
                                    className="form-control m-0"
                                    type={"Number"}
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                    name="phoneNumber"
                                  />
                                  {formik.errors.phoneNumber ? (
                                    <div>{formik.errors.phoneNumber}</div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 ">
                                  <label className="form-label font-weight-bold m-0">
                                    Password:
                                  </label>
                                  <input
                                    className="form-control m-0"
                                    type={"text"}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    name="password"
                                    placeholder="Name Dob-Year"
                                  />
                                  {formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                  ) : null}
                                </div>
                                <div className="col-sm-6 dialogbox-submit">
                                  <input
                                    disabled={disable}
                                    style={{
                                      backgroundColor: disable
                                        ? "rgb(159 86 148)"
                                        : "#3f0036",
                                    }}
                                    className="add-user-button"
                                    type={"submit"}
                                    value="Add User"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions></DialogActions>
                </Dialog>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 d-flex justify-content-between">
                <input
                  className="form-control search-user mt-2"
                  type={"text"}
                  placeholder={"Search..."}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                  }}
                />
                <button
                  onClick={handleAddUserOpen}
                  className="menu-add-Button mt-2"
                >
                  <span className="button_top">
                    &nbsp;<i className="fa-solid fa-plus"></i>User&nbsp;
                  </span>
                </button>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-12 mt-2 table-container">
                <div className="bd-example ">
                  <table className="table table-hover table-menu ">
                    <thead className="">
                      <tr className="font-weight-bold ">
                        <th scope="col">#</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.length === 0 ? (
                        <tr>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                          <td>{loaders}</td>
                        </tr>
                      ) : (
                        usersData
                          .filter((srcItem) => {
                            if (searchName === "") {
                              return srcItem;
                            } else if (
                              srcItem.userName
                                .toLowerCase()
                                .includes(searchName.toLowerCase())
                            ) {
                              return srcItem;
                            }
                          })
                          .map((user, index) => {
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td
                                  className="view-Menu "
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  <strong>{user.userName}</strong>
                                </td>
                                <td>{user.email}</td>
                                <td
                                  style={{
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {user.role}
                                </td>
                                <td>
                                  <Link
                                    to={`/admin/editUser/${user._id}`}
                                    className="menu-edit-button  m-2"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </Link>
                                  <button
                                    disabled={disable}
                                    onClick={() => {
                                      console.log(user._id);
                                      handleDelete(user._id);
                                    }}
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
                                          Do You Want to Delete the User ?
                                        </DialogContentText>
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={handleClose}>
                                          Cancel
                                        </Button>
                                        <Button
                                          disabled={disable}
                                          // onClick={() => {
                                          // handleDelete(user._id);
                                          // }}
                                        >
                                          Delete
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
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
        </div>
        <div className="row">
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={OpenError}
            onClose={closeError}
            key={vertical + horizontal}
          >
            <Alert severity="error">{ShowError}</Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}
let UsersProvider = (prop) => {
  return (
    <AuthProvider>
      <Users />
    </AuthProvider>
  );
};
export default UsersProvider;
