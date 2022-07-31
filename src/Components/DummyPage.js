import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Provider, { providerContext } from "../Providers/Provider";
import "../App.css";

let TemplateComponent = (props) => {
  const { templateName, options, templateId } = props;
  const [selectedoptions, setSelectedOptions] = useState({});
  let submission = () => {
    console.log({
      selected: [selectedoptions.menu],
      userId: window.localStorage.getItem("userId"),
      templateId: selectedoptions.templateId,
      userName: window.localStorage.getItem("userName"),
      templateName: selectedoptions.templateName,
    });
  };
  return (
    <>
      <b>{templateName}</b>
      <br />
      {options.map((menu) => {
        return (
          <>
            <div className="d-flex flex-row ">
              <div
                style={{
                  padding: "5px",
                  border: "2px solid grey",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedOptions({
                    templateName: templateName,
                    menu: menu.name,
                    templateId: templateId,
                  });
                }}
              >
                {menu.name}
              </div>
            </div>
          </>
        );
      })}
      <Button
        onClick={() => {
          console.log(selectedoptions);
          submission();
        }}
      >
        submit
      </Button>
      <br />
    </>
  );
};
function DummyPage() {
  let contextValues = useContext(providerContext);
  const [selectedMenus, setSelectedMenus] = useState({});
  useEffect(() => {
    console.clear();
    contextValues.allOpenedTemplates();
  }, []);
  useEffect(() => {
    console.log(contextValues.OpenedTemplates, "iam dummy page");
  }, [contextValues.OpenedTemplates]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {contextValues.OpenedTemplates.length === 0 ? (
              <div>Loading....</div>
            ) : (
              contextValues.OpenedTemplates.map((data) => {
                return (
                  <TemplateComponent
                    templateName={data.name}
                    options={data.options}
                    templateId={data._id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

let dummyProvider = () => {
  return (
    <Provider>
      <DummyPage />
    </Provider>
  );
};

export default dummyProvider;
