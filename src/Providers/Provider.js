import React from "react";
import { getTemplates } from "../Questionrepository/QuestionRepo";
import { addtemplate } from "../Questionrepository/QuestionRepo";
import { deleteTemplate } from "../Questionrepository/QuestionRepo";
import {
  singleTemplate,
  editTemplate,
  getOpenedTemplate,
  addSubMisssion,
  // logedUserDetails,
  getSubmissions,
} from "../Questionrepository/QuestionRepo";
export const providerContext = React.createContext(" ");
function Provider(props) {
  const [templateData, setTemplateData] = React.useState([]);
  const [singleTemplateData, setSingleTemplateData] = React.useState({});
  const [isOpenedMenu, setIsOpenedMenu] = React.useState({});
  const [logedUserData, setLogedUserData] = React.useState({});
  const [submissionData, setSubmissionData] = React.useState([]);
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
  let openedTemplate = () => {
    getOpenedTemplate()
      .then((res) => {
        setIsOpenedMenu(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // let logedUser = (id) => {
  //   logedUserDetails(id)
  //     .then((res) => {
  //       setLogedUserData(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  let submissions = () => {
    getSubmissions()
      .then((res) => {
        setSubmissionData([...res]);
      })
      .catch((err) => {
        console.log(err);
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
    openedTemplate: openedTemplate,
    isOpenedMenu: isOpenedMenu,
    addSubMisssion: addSubMisssion,
    // logedUser: logedUser,
    // logedUserData: logedUserData,
    submissions: submissions,
    submissionData: submissionData,
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
