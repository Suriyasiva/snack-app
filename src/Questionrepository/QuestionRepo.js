const axios = require("axios").default;
export async function getTemplates() {
  try {
    let templates = await axios.get(
      "https://61f0e50b072f86001749eedf.mockapi.io/tesark"
    );
    return templates.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function addtemplate(data) {
  try {
    await axios.post(
      "https://61f0e50b072f86001749eedf.mockapi.io/tesark",
      data
    );
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function deleteTemplate(id) {
  try {
    await axios.delete(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesark/${id}`
    );
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function singleTemplate(id) {
  try {
    let singletemp = await axios.get(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesark/${id}`
    );
    return singletemp.data;
  } catch (error) {
    console.log("post menu error", error);
  }
}
export async function editTemplate(id, data) {
  try {
    await axios.put(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesark/${id}`,
      data
    );
  } catch (error) {
    console.log("put--method--error", error);
  }
}
export async function getUserData() {
  try {
    let userData = await axios.get(
      "https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers"
    );
    return userData.data;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
export async function deleteUser(id) {
  try {
    await axios.delete(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers/${id}`
    );
  } catch (error) {
    console.log("delete user error---", error);
  }
}
export async function addUser(data) {
  try {
    await axios.post(
      "https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers",
      data
    );
  } catch (error) {
    console.log("post data error", error);
  }
}
export async function singleUser(id) {
  try {
    let getSigleUser = await axios.get(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers/${id}`
    );
    return getSigleUser.data;
  } catch (error) {
    console.log("---edit user error", error);
  }
}
export async function editUser(id, data) {
  try {
    await axios.put(
      `https://61f0e50b072f86001749eedf.mockapi.io/tesarkUsers/${id}`,
      data
    );
  } catch (error) {
    console.log("---edit user error", error);
  }
}
export async function getOpenedTemplate() {
  try {
    let openedTemplate = await axios.get(
      "https://61f0e50b072f86001749eedf.mockapi.io/tesark"
    );
    var opt = openedTemplate.data.find((menu) => {
      return menu.isOpened === true;
    });
    return opt;
  } catch (error) {
    console.log("--api-getTemplates-error--", error);
  }
}
