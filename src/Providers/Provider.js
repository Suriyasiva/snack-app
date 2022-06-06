import React from "react";
import { getTemplates } from "../Questionrepository/QuestionRepo";
import { addtemplate } from "../Questionrepository/QuestionRepo";
import { deleteTemplate } from "../Questionrepository/QuestionRepo";
import {
  singleTemplate,
  editTemplate,
} from "../Questionrepository/QuestionRepo";
export const providerContext = React.createContext(" ");
function Provider(props) {
  const [templateData, setTemplateData] = React.useState([]);
  const [singleTemplateData, setSingleTemplateData] = React.useState({});
  let menuData = () => {
    getTemplates()
      .then((res) => {
        setTemplateData([...res]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let singleMenu = (id) => {
    singleTemplate(id)
      .then((res) => {
        setSingleTemplateData(res);
      })
      .catch((err) => {
        console.log(" single -data- err", err);
      });
  };

  const contextObject = {
    templateData: templateData,
    menuData: menuData,
    addtemplate: addtemplate,
    deleteTemplate: deleteTemplate,
    singleMenu: singleMenu,
    singleTemplateData: singleTemplateData,
    setSingleTemplateData: setSingleTemplateData,
    editTemplate: editTemplate,
    // userData: userData,
    // user: user,
  };

  return (
    <>
      <providerContext.Provider value={contextObject}>
        {props.children}
      </providerContext.Provider>
    </>
  );
}

export default Provider;
