import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Provider, { providerContext } from "../Providers/Provider";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function EditMenu() {
  let navigate = useNavigate();
  //
  const [alert, setAlert] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [emptyMenu, setEmptyMenu] = React.useState({ message: "" });
  const [ShowErr, setShowErr] = React.useState("");
  const { vertical, horizontal, open } = alert;

  const handleClick = (newState) => {
    setAlert({ open: true, ...newState });
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  // --------------------------
  const [disable, setDisable] = useState(false);
  const [optionValues, setoptionValues] = useState([]);
  const [optionValue, setoptionValue] = useState("");
  let addOption = () => {
    if (optionValue) {
      setoptionValues([
        ...optionValues,
        { _id: Date.now(), name: optionValue },
      ]);
      setoptionValue("");
    }
  };
  let params = useParams();
  const contextValues = useContext(providerContext);
  var loaders = (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      selectedType: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (templateData.options.length === 0 && optionValues.length === 0) {
          handleClick({
            vertical: "top",
            horizontal: "center",
          });
          setEmptyMenu({ message: "menu list is empty — check it out!" });
        } else {
          setDisable(true);
          delete values._id;
          delete values.__v;
          console.log(values, "editvalues");
          console.log(templateData.options, "editvalues1");
          console.log(...optionValues, "editvalues2");
          await contextValues.editTemplate(params.id, {
            ...values,
            options: [...optionValues, ...templateData.options],
          });
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
        await setShowErr(error.response.data.message);
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      } finally {
        setDisable(false);
      }
    },
  });
  var templateData = contextValues.singleTemplateData;
  useEffect(() => {
    contextValues.singleMenu(params.id);
  }, []);
  useEffect(() => {
    if (Object.keys(templateData).length) {
      formik.setValues(templateData);
    }
  }, [templateData]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row mt-4">
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
                  className=" create-menu-back mt-3"
                >
                  &nbsp;Back
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="">
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={handleClose}
                  key={vertical + horizontal}
                >
                  <Alert severity="error">{emptyMenu.message || ShowErr}</Alert>
                </Snackbar>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                <h3>Edit Menu:</h3>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="font-weight-bold form-label">
                        Template Name:{" "}
                      </label>
                      <input
                        type={"text"}
                        className="form-control"
                        onChange={formik.handleChange}
                        name="name"
                        value={formik.values.name}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      {/* add menu */}
                      <label className="font-weight-bold form-label">
                        Add Menu:{" "}
                      </label>
                      <div className="d-flex">
                        <input
                          type={"text"}
                          name={"templateName"}
                          value={optionValue}
                          className="form-control me-2"
                          onChange={(e) => {
                            setoptionValue(e.target.value);
                          }}
                        />
                        <Button
                          onClick={addOption}
                          style={{
                            backgroundColor: "#3f0036",
                            color: "#fff",
                          }}
                          variant="raised"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="form-label font-weight-bold">
                        Select Type:{" "}
                      </label>
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.selectedType}
                        name="selectedType"
                        class="form-select"
                      >
                        <option selected>Slect Select Type</option>
                        <option value="single">Single</option>
                        <option value="multi">Multi</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="row">
                    <label className="form-label font-weight-bold m-0">
                      Menu:{" "}
                    </label>
                    <div className="col-sm-12">
                      {Object.keys(templateData).length === 0
                        ? loaders
                        : templateData.options.map((menu, i) => {
                            return (
                              <div key={i} className="addMenus mb-1">
                                <div className="ms-1 dish-capitalize">
                                  {menu.name}&nbsp;{" "}
                                </div>
                                <i
                                  onClick={() => {
                                    contextValues.setSingleTemplateData({
                                      ...contextValues.singleTemplateData,
                                      options:
                                        contextValues.singleTemplateData.options.filter(
                                          (optionId) =>
                                            optionId._id !== menu._id
                                        ),
                                    });
                                  }}
                                  className="fa-solid fa-xmark menuDel"
                                ></i>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="form-label font-weight-bold">
                        New Menu:
                      </label>
                      {optionValues.map((newMenu, i) => {
                        return (
                          <div key={i} className="addMenus mb-1">
                            <div className="ms-1 dish-capitalize">
                              {newMenu.name}&nbsp;{" "}
                            </div>
                            <i
                              onClick={() => {
                                setoptionValues(
                                  optionValues.filter((del) => del !== newMenu)
                                );
                              }}
                              className="fa-solid fa-xmark"
                            ></i>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10 d-flex justify-content-end mt-4">
                  <Button
                    disabled={disable}
                    style={{
                      backgroundColor: disable ? "rgb(159 86 148)" : "#3f0036",
                      color: "#fff",
                    }}
                    variant="raised"
                    type="submit"
                  >
                    Submit&nbsp;
                    {disable ? (
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
const EditMenuProvider = () => {
  return (
    <Provider>
      <EditMenu />
    </Provider>
  );
};
export default EditMenuProvider;
// Menu &nbsp;<i className="fa-solid fa-angle-down"></i>
