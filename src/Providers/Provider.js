import React from "react";
import { getTemplates } from "../Questionrepository/QuestionRepo";
import { addtemplate } from "../Questionrepository/QuestionRepo";
import { deleteTemplate } from "../Questionrepository/QuestionRepo";
import {
  singleTemplate,
  editTemplate,
  getOpenedTemplate,
  addSubMisssion,
  getSubmissions,
  changeStatus,
  checkingStatus,
  getClosedStatus,
  getTodaySubmits,
  getAllOpenedTemplates,
  getClosedSubmissions,
  statusActive,
} from "../Questionrepository/QuestionRepo";
export const providerContext = React.createContext(" ");
function Provider(props) {
  const [templateData, setTemplateData] = React.useState([]);
  const [singleTemplateData, setSingleTemplateData] = React.useState({});
  const [isOpenedMenu, setIsOpenedMenu] = React.useState({});
  const [submissionData, setSubmissionData] = React.useState([]);
  const [submissionUserstatus, setSubmissionUserStatus] = React.useState([]);
  const [closedUserData, setClosedUserData] = React.useState({});
  const [recentSubmits, setRecentSubmits] = React.useState({});
  // -----
  const [OpenedTemplates, setAllopenedTemplates] = React.useState([]);
  // ----
  const [userSubmissions, setUserSubmissions] = React.useState([]);
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

  let submissions = () => {
    getSubmissions()
      .then((res) => {
        setSubmissionData([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let checkStatus = (id) => {
    checkingStatus(id)
      .then((res) => {
        // console.log(res, "--------checkStatus res-------");
        setSubmissionUserStatus([...res]);
        // console.log(res, "--------checkStatus res-------");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let getRecentSubmission = (userID) => {
    // console.log(userID, "userID");
    getClosedStatus(userID)
      .then((res) => {
        // console.log(res, "getRecentSubmission");
        setClosedUserData(res);
      })
      .catch((err) => {
        console.log(err, "finding error");
      });
  };
  let todaySubmits = () => {
    getTodaySubmits()
      .then((res) => {
        setRecentSubmits(res);
      })
      .catch((err) => {
        console.log(err, "finding error");
      });
  };
  // ---------------------------------------------------------------
  let allOpenedTemplates = () => {
    getAllOpenedTemplates()
      .then((res) => {
        setAllopenedTemplates(res);
      })
      .catch((err) => {
        console.log(err, "getAllOpenedTemplates");
      });
  };

  let getUserClosedSubmissions = (data) => {
    getClosedSubmissions(data)
      .then((res) => {
        // console.log(res, "---getUserClosedSubmissions--");
        setUserSubmissions(res);
      })
      .catch((err) => {
        console.log(err, "getUserSubmits error");
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
    submissions: submissions,
    submissionData: submissionData,
    changeStatus: changeStatus,
    checkStatus: checkStatus,
    submissionUserstatus: submissionUserstatus,
    getRecentSubmission: getRecentSubmission,
    closedUserData: closedUserData,
    todaySubmits: todaySubmits,
    recentSubmits: recentSubmits,
    // ---------
    allOpenedTemplates: allOpenedTemplates,
    OpenedTemplates: OpenedTemplates,

    getUserClosedSubmissions: getUserClosedSubmissions,
    userSubmissions: userSubmissions,

    statusActive: statusActive,
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
