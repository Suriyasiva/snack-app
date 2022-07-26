import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Provider, { providerContext } from "../Providers/Provider";
import CircularProgress from "@mui/material/CircularProgress";

function CreateMenu() {
  let navigate = useNavigate();
  let [handleError, setHandleError] = React.useState("Retry");
  let [btnDisable, setBtnDisable] = React.useState(false);

  // handle err--
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

  // -------------
  const formik = useFormik({
    initialValues: {
      selectedType: "",
      name: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setBtnDisable(true);
        console.log({ ...values, options: menudata });
        if (menudata.length === 0) {
          setOptionAlert(true);
        } else {
          setOptionAlert(false);
          await contextValues.addtemplate({
            ...values,
            isOpened: false,
            options: menudata,
          });
          resetForm();
          navigate("/admin/menu");
        }
      } catch (error) {
        await setHandleError(error.response.data.message);
        ShowError({
          vertical: "top",
          horizontal: "center",
        });
        console.log(error);
        resetForm();
      } finally {
        setBtnDisable(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "required";
      }
      if (!values.selectedType) {
        errors.selectedType = "required";
      }
      return errors;
    },
  });
  const contextValues = useContext(providerContext);
  const [menu, setmenu] = React.useState("");
  const [menudata, setMenuData] = React.useState([]);
  const [optionAlert, setOptionAlert] = React.useState(false);

  const menus = (e) => {
    setmenu(e.target.value);
  };
  const addMenu = () => {
    if (menu) {
      setMenuData([...menudata, { _id: Date.now(), name: menu }]);
      setmenu("");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* ----back button row----- */}
            <div className="row">
              <div className="col-lg-10 d-flex justify-content-end">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  style={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                  }}
                  variant="raised"
                  className=" create-menu-back text-white mt-3 mb-3"
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
                  <Alert severity="error">{handleError}</Alert>
                </Snackbar>
              </div>
            </div>
            {/* ----create- menu---- */}
            <div className="row">
              <div className="col-lg-12 mt-2">
                <h4>Create Menu</h4>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-4">
                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="form-label font-weight-bold">
                        Template Name:{" "}
                      </label>
                      <input
                        name="name"
                        className="form-control template-name-field"
                        placeholder="Enter the Template Name"
                        type={"text"}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      {formik.errors.name ? (
                        <span className="mb-1" style={{ color: "red" }}>
                          {formik.errors.name}{" "}
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="form-label font-weight-bold">
                        Add Menu:{" "}
                      </label>
                      <div className="d-flex">
                        <input
                          type={"text"}
                          placeholder="Enter the menu"
                          style={{ width: "56%" }}
                          value={menu}
                          className="form-control me-2"
                          onChange={menus}
                        />
                        <Button
                          style={{
                            backgroundColor: "#3f0036",
                            color: "#fff",
                          }}
                          variant="raised"
                          onClick={addMenu}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 mt-1 mb-1">
                  <label className="form-label font-weight-bold">Menu: </label>
                  {/* -----alert----- */}
                  {optionAlert && menudata.length === 0 ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Menu is Empty — <strong>check it out!</strong>
                      </Alert>
                    </Stack>
                  ) : null}
                  {menudata.map((dish, i) => {
                    return (
                      <div key={i} className="addMenus mb-1">
                        <div className="ms-1 dish-capitalize">
                          {dish.name} &nbsp;
                        </div>
                        <i
                          onClick={() => {
                            setMenuData(
                              menudata.filter((val) => {
                                return val._id !== dish._id;
                              })
                            );
                          }}
                          className="fa-solid fa-xmark menuDel "
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/*  */}
              <div className="row mt-4">
                <div className="col-lg-6 ">
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="form-label font-weight-bold">
                        Select Type:{" "}
                      </label>
                      <br />
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.selectedType}
                        name="selectedType"
                        className="form-select "
                        style={{ width: "70%" }}
                      >
                        <option selected>Open this select menu</option>
                        <option value="single">Single</option>
                        <option value="multi">Multi</option>
                      </select>
                      {formik.errors.selectedType ? (
                        <span className="mb-1" style={{ color: "red" }}>
                          {formik.errors.selectedType}{" "}
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-10 d-flex justify-content-end mt-2">
                  <Button
                    disabled={btnDisable}
                    type="submit"
                    style={{
                      backgroundColor: btnDisable
                        ? "rgb(159 86 148)"
                        : "#3f0036",
                      color: "#fff",
                    }}
                    variant="raised"
                  >
                    Submit&nbsp;
                    {btnDisable ? (
                      <CircularProgress sx={{ color: "#fff" }} size="1rem" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

let CreateMenuProvider = () => {
  return (
    <Provider>
      <CreateMenu />
    </Provider>
  );
};
export default CreateMenuProvider;
