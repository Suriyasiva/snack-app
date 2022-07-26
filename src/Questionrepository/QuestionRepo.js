const axios = require("axios").default;

// lookup--
export async function lookUp(token) {
  // console.log(token, "token");
  try {
    let isValidtoken = await axios.post(
      "https://tesark-server.herokuapp.com/lookUp/authToken",
      " ",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return isValidtoken.data;
  } catch (error) {
    console.log("--lookup-error--", error);
  }
}

// login--
export async function login(data) {
  try {
    let token = await axios.post(
      "https://tesark-server.herokuapp.com/login",
      data
    );
    return token;
  } catch (error) {
    console.log("--login-error--", error);
    throw error;
    // return error;
  }
}
export async function getTemplates() {
  try {
    let templates = await axios.get(
      "https://tesark-server.herokuapp.com/templates",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return templates.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function addtemplate(data) {
  try {
    await axios.post("https://tesark-server.herokuapp.com/addTemplate", data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post menu error", error);
    throw error;
  }
}
export async function deleteTemplate(id) {
  try {
    await axios.delete(
      `https://tesark-server.herokuapp.com/deleteTemplate/${id}`,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
  } catch (error) {
    console.log("post menu error", error);
    throw error;
  }
}
export async function singleTemplate(id) {
  try {
    let singletemp = await axios.get(
      `https://tesark-server.herokuapp.com/template/${id}`,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return singletemp.data;
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function editTemplate(id, data) {
  try {
    await axios.put(
      `https://tesark-server.herokuapp.com/editTemplate/${id}`,
      data,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
  } catch (error) {
    console.log("put--method--error", error);
    throw error;
  }
}
// -------user-------
export async function getUserData() {
  try {
    let userData = await axios.get(
      "https://tesark-server.herokuapp.com/users",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return userData.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function deleteUser(id) {
  try {
    await axios.delete(`https://tesark-server.herokuapp.com/deleteUser/${id}`, {
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
    await axios.post("https://tesark-server.herokuapp.com/addUsers", data, {
      headers: {
        authorization: window.localStorage.getItem("app_token"),
      },
    });
  } catch (error) {
    console.log("post data error", error);
    throw error;
  }
}
export async function singleUser(id) {
  try {
    let getSigleUser = await axios.get(
      `https://tesark-server.herokuapp.com/user/${id}`,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return getSigleUser.data;
  } catch (error) {
    console.log("---edit user error", error);
  }
}
export async function editUser(id, data) {
  try {
    await axios.put(
      `https://tesark-server.herokuapp.com/editUser/${id}`,
      data,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
  } catch (error) {
    console.log("---edit user error", error);
    throw error;
  }
}
// --opened template--
export async function getOpenedTemplate() {
  try {
    let openedTemplate = await axios.get(
      "https://tesark-server.herokuapp.com/templates",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    var opt = openedTemplate.data.find((menu) => {
      return menu.isOpened === true;
    });
    console.log(opt, "opt");
    return opt;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
// submission----
export async function addSubMisssion(data) {
  try {
    console.log(data, "submission data");
    let placeOrder = await axios.post(
      "https://tesark-server.herokuapp.com/addSnack",
      data,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    console.log(placeOrder, "placeOrder");
  } catch (error) {
    console.log("post menu error", error);
    throw error;
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
    let submissions = await axios.get(
      "https://tesark-server.herokuapp.com/submissions",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
    return submissions.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function changeStatus(id, data) {
  try {
    console.log(id, data, "changeStatus");
    await axios.put(
      `https://tesark-server.herokuapp.com/manageSubmission/${id}`,
      data,
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
  } catch (error) {
    console.log("put--method--error", error);
  }
}
export async function checkingStatus(logedUserId) {
  try {
    let submissions = await axios.get(
      "https://tesark-server.herokuapp.com/submissions",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );
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
    let submissions = await axios.get(
      "https://tesark-server.herokuapp.com/submissions",
      {
        headers: {
          authorization: window.localStorage.getItem("app_token"),
        },
      }
    );

    let findData = submissions.data.filter((data) => {
      return data.userId === userID;
    });
    // console.log(findData[findData.length - 1], "findData");
    return findData[findData.length - 1];
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
