import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthProvider, { authProviderContext } from "../Providers/AuthProvider";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import tesarkTechnologiesSquarelogo from "../assets/tesarkTechnologiesSquarelogo.png";

function Login() {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(true);
  let [disableSubmit, setDisableSubmit] = useState(false);
  let [showError, setShowError] = useState("");
  let [activateAlert, setActivateAlert] = useState(false);
  let [loginBtnLoader, setLoginBtnLoader] = useState(false);
  const contextValues = useContext(authProviderContext);
  useEffect(() => {
    setShowPassword(true);
    //   contextValues.userData();
    window.localStorage.clear();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await setLoginBtnLoader(true);
        await setDisableSubmit(true);
        let generateToken = await contextValues.login(values);
        window.localStorage.setItem(
          "app_token",
          generateToken.data.credentials.token
        );

        let decode = jwt_decode(generateToken.data.credentials.token);
        if (decode.role === "admin") {
          window.localStorage.setItem(
            "userName",
            generateToken.data.credentials.userName
          );
          window.localStorage.setItem("userRole", decode.role);
          navigate("/admin/home");
        } else {
          window.localStorage.setItem(
            "userName",
            generateToken.data.credentials.userName
          );
          window.localStorage.setItem(
            "userId",
            generateToken.data.credentials.id
          );
          window.localStorage.setItem("userRole", decode.role);
          navigate("/user");
        }
        resetForm();
      } catch (error) {
        resetForm();
        setLoginBtnLoader(false);
        setDisableSubmit(false);
        //
        await setShowError(error.response.data.message.slice(8));
        setActivateAlert(true);
        console.log(error.response.data, "error");
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "invalid email address";
      }
      if (!values.password) {
        errors.password = "required";
      } else if (values.password.length <= 6) {
        errors.password = "invalid password !";
      }
      return errors;
    },
  });
  useEffect(() => {
    if (activateAlert) {
      setTimeout(() => {
        setActivateAlert(false);
      }, 3000);
    }
  }, [activateAlert]);

  return (
    <>
      {/* ----------------------- */}
      <div className="App">
        <div className="container ">
          <div className="row d-flex justify-content-start login-card-container">
            <div className="col-lg-12">
              <div className="row errorAlert mt-3">
                <div className="col-md-10  colErrorAlert  d-flex justify-content-center">
                  <Stack
                    sx={{
                      width: "28rem",
                      display: activateAlert ? "block" : "none",
                    }}
                    spacing={2}
                  >
                    <Alert severity="error">{showError} !</Alert>
                  </Stack>
                </div>
              </div>
              <div className="row mb-5 pb-3">
                <div className="col-md-4 d-flex justify-content-center">
                  <p className="login-greet">welcome to tesark...</p>
                </div>
              </div>
              <div className="col-md-4 login-form">
                <div className="d-flex justify-content-center">
                  <div>
                    <img
                      className="img-fluid tesark-login-logo"
                      src={tesarkTechnologiesSquarelogo}
                      alt="tsark-logo"
                    ></img>
                    <h4 className="font-weight-bold mt-5 mb-2">LOGIN</h4>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label className="font-weight-bold">Email:</label>
                    <input
                      type="email"
                      className="form-control login-email"
                      name="email"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email ? (
                      <div
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {formik.errors.email} !
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group mt-1 password-container">
                    <label className="font-weight-bold">Password:</label>
                    <input
                      type={showPassword ? "password" : "text"}
                      className="form-control login-email"
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {showPassword ? (
                      <i
                        onClick={() => {
                          setShowPassword(false);
                        }}
                        className="fa-solid fa-eye"
                      ></i>
                    ) : (
                      <i
                        onClick={() => {
                          setShowPassword(true);
                        }}
                        className="fa-solid fa-eye-slash"
                      ></i>
                    )}
                    {formik.errors.password ? (
                      <div
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {formik.errors.password} !
                      </div>
                    ) : null}
                  </div>
                  <div className="d-grid mt-2">
                    <Button
                      disabled={disableSubmit}
                      type="submit"
                      value={"Login"}
                      style={{
                        backgroundColor: disableSubmit
                          ? "rgb(159 86 148)"
                          : "#3f0036",
                        color: "#fff",
                      }}
                      variant="raised"
                    >
                      Login &nbsp;
                      {loginBtnLoader ? (
                        <CircularProgress sx={{ color: "#fff" }} size="1rem" />
                      ) : (
                        " "
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

let LoginProvider = () => {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
};
export default LoginProvider;
