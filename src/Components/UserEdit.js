import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthProvider, { authProviderContext } from "../Providers/AuthProvider";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function UserEdit() {
  const contextValues = useContext(authProviderContext);
  const [disable, setDisable] = React.useState(false);
  let params = useParams();
  let navigate = useNavigate();
  let setValuesdata = contextValues.singleUserData;
  // ------
  const [err, setErr] = React.useState("");
  const [catchErr, setCatchErr] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = catchErr;

  const ShowError = (newState) => {
    setCatchErr({ open: true, ...newState });
  };

  const closeError = () => {
    setCatchErr({ ...catchErr, open: false });
  };
  // ------
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      role: "",
      phoneNumber: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setDisable(true);
        console.log(values, "editvalues");
        let payload = {
          userName: values.userName,
          email: values.email,
          role: values.role,
          phoneNumber: values.phoneNumber,
        };
        console.log(payload, "editvalues");
        await contextValues.editUser(params.id, payload);
        navigate(-1);
      } catch (error) {
        await setErr(error.response.data.message);
        console.log(error);
        await ShowError({
          vertical: "top",
          horizontal: "center",
        });
      } finally {
        setDisable(false);
      }
    },
  });
  useEffect(() => {
    contextValues.getUser(params.id);
    formik.setValues(setValuesdata);
  }, []);
  useEffect(() => {
    if (Object.keys(setValuesdata).length) {
      formik.setValues(setValuesdata);
    }
  }, [setValuesdata]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-10 d-flex justify-content-end">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                  }}
                  variant="raised"
                  className=" create-menu-back mt-3 mb-3"
                >
                  &nbsp;Back
                </Button>
              </div>
            </div>
            <div className="row">
              <div>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={closeError}
                  key={vertical + horizontal}
                >
                  <Alert severity="error">
                    This is an error alert — <strong>check it out!</strong>
                  </Alert>
                </Snackbar>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 mt-2 ">
                <h4>Edit User</h4>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-4">
                <div className="col-sm-10">
                  <div className="row mt-1">
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
                    </div>
                  </div>
                  <div className="row mt-1">
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
                        <option selected>Open this select menu</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
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
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-12 dialogbox-submit">
                      <input
                        disabled={disable}
                        style={{
                          backgroundColor: disable
                            ? "rgb(159 86 148)"
                            : "#3f0036",
                        }}
                        className="add-user-button mt-2"
                        type={"submit"}
                        value="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

let userEditProvider = () => {
  return (
    <AuthProvider>
      <UserEdit />
    </AuthProvider>
  );
};
export default userEditProvider;
