import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Provider, { providerContext } from "../Providers/Provider";

function CreateMenu() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      selectedType: "",
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log({ ...values, options: menudata });
      if (menudata.length === 0) {
        setOptionAlert(true);
      } else {
        setOptionAlert(false);
        contextValues.addtemplate({
          ...values,
          isOpened: false,
          options: menudata,
        });
        resetForm();
        navigate("/admin/menu");
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
                            backgroundColor: "#03045e",
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
                                return val.id !== dish.id;
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
                    type="submit"
                    style={{
                      backgroundColor: "#03045e",
                      color: "#fff",
                    }}
                    variant="raised"
                  >
                    Submit
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
