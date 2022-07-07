import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthProvider, { authProviderContext } from "../Providers/AuthProvider";
import jwt_decode from "jwt-decode";
function Login() {
  let navigate = useNavigate();
  const contextValues = useContext(authProviderContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    contextValues.userData();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
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
          navigate("/user");
        }
        //  ------------------------------------------------
        // let users = await contextValues.user;
        // let findUser = await users.find((data) => {
        //   return (
        //     data.email === values.email && data.password === values.password
        //   );
        // });
        // if (findUser) {
        //   if (findUser.role === "admin") {
        //     window.localStorage.setItem("userName", findUser.userName);
        //     navigate("/admin/home");
        //   } else {
        //     window.localStorage.setItem("userName", findUser.userName);
        //     window.localStorage.setItem("userId", findUser.id);
        //     navigate("/user");
        //   }
        // } else {
        //   alert("not valid user");
        // }
        resetForm();
      } catch (error) {
        resetForm();
        alert("invalid credentials");
        console.log(error, "error");
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
  });
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center login-card-container">
            <div className="col-md-4">
              <div className="d-flex justify-content-center">
                <h4 className="font-weight-bold">LOGIN</h4>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="font-weight-bold">Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email} !</div>
                  ) : null}
                </div>
                <div className="form-group mt-1">
                  <label className="font-weight-bold">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.password} !
                    </div>
                  ) : null}
                </div>
                <div className="d-grid mt-2">
                  <Button
                    type="submit"
                    value={"Login"}
                    style={{
                      backgroundColor: "#03045e",
                      color: "#fff",
                    }}
                    variant="raised"
                  >
                    Login
                  </Button>
                </div>
              </form>
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
