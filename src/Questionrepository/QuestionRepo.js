const axios = require("axios").default;

// login--
export async function login(data) {
  try {
    let token = await axios.post("http://localhost:5000/login", data);
    return token;
  } catch (error) {
    console.log("--login-error--", error);
  }
}
console.log(window.localStorage.getItem("app_token"), "questionRepoToken");
export async function getTemplates() {
  try {
    let templates = await axios.get("http://localhost:5000/templates", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    return templates.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function addtemplate(data) {
  try {
    await axios.post("http://localhost:5000/addTemplate", data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function deleteTemplate(id) {
  try {
    await axios.delete(`http://localhost:5000/deleteTemplate/${id}`, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function singleTemplate(id) {
  try {
    let singletemp = await axios.get(`http://localhost:5000/template/${id}`, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    return singletemp.data;
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function editTemplate(id, data) {
  try {
    await axios.put(`http://localhost:5000/editTemplate/${id}`, data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("put--method--error", error);
  }
}
// -------user-------
export async function getUserData() {
  try {
    let userData = await axios.get("http://localhost:5000/users", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    return userData.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function deleteUser(id) {
  try {
    await axios.delete(`http://localhost:5000/deleteUser/${id}`, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("delete user error---", error);
  }
}
export async function addUser(data) {
  try {
    await axios.post("http://localhost:5000/addUsers", data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post data error", error);
  }
}
export async function singleUser(id) {
  try {
    let getSigleUser = await axios.get(`http://localhost:5000/user/${id}`, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    return getSigleUser.data;
  } catch (error) {
    console.log("---edit user error", error);
  }
}
export async function editUser(id, data) {
  try {
    await axios.put(`http://localhost:5000/editUser/${id}`, data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("---edit user error", error);
  }
}
// --opened template--
export async function getOpenedTemplate() {
  try {
    let openedTemplate = await axios.get("http://localhost:5000/templates", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    var opt = openedTemplate.data.find((menu) => {
      return menu.isOpened === true;
    });
    return opt;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
// submission----
export async function addSubMisssion(data) {
  try {
    console.log(data, "submission data");
    await axios.post("http://localhost:5000/addSnack", data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post menu error", error);
  }
}
// export async function logedUserDetails(id) {
//   try {
//     let logedUsers = await axios.get(
//       `https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers/${id}`
//     );
//     return logedUsers.data;
//   } catch (error) {
//     console.log("--api-getTemplates-error--", error);
//   }
// }

export async function getSubmissions() {
  try {
    let submissions = await axios.get("http://localhost:5000/submissions", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    return submissions.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function changeStatus(id, data) {
  try {
    console.log(id, data, "changeStatus");
    await axios.put(`http://localhost:5000/manageSubmission/${id}`, data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("put--method--error", error);
  }
}
export async function checkingStatus(logedUserId) {
  try {
    let submissions = await axios.get("http://localhost:5000/submissions", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
    let findUserStatus = submissions.data.filter((data) => {
      return data.userId === logedUserId;
    });
    // console.log(findUserStatus, "findUserStatus");
    return findUserStatus;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function getClosedStatus(userID) {
  try {
    console.log(userID, "getting id");
    let submissions = await axios.get("http://localhost:5000/submissions", {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });

    let findData = submissions.data.filter((data) => {
      return data.userId === userID;
    });
    console.log(findData[findData.length - 1], "findData");
    return findData[findData.length - 1];
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
