import React, { useState } from "react";
import {
  getUserData,
  deleteUser,
  addUser,
  singleUser,
  editUser,
  login,
  lookUp,
} from "../Questionrepository/QuestionRepo";
export const authProviderContext = React.createContext({
  isAuthDetermined: false,
  isAuthenticated: false,
  userLookup: async () => {},
});
function AuthProvider(props) {
  const [isAuthDetermined, setAuthDetermined] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = React.useState([]);
  const [singleUserData, setSingleUserData] = React.useState({});

  const userLookup = async () => {
    console.log("lookupcalled");
    try {
      const response = await lookUp();
      console.log("lookupsuccess");
      console.log("response", response);
      setAuthenticated(true);
    } catch (e) {
      console.log("lookup error :>>", e);
      //navigate to login screen
      setAuthenticated(false);
    } finally {
      setAuthDetermined(true);
    }
  };

  let userData = () => {
    getUserData()
      .then((res) => {
        setUser([...res]);
      })
      .catch((error) => {
        console.log("-----userData error----", error);
      });
  };
  let getUser = (id) => {
    singleUser(id)
      .then((res) => {
        console.log(res, "singleUser");
        setSingleUserData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const authContextObject = {
    userData: userData,
    user: user,
    deleteUser: deleteUser,
    addUser: addUser,
    getUser: getUser,
    singleUserData: singleUserData,
    editUser: editUser,
    login: login,

    isAuthDetermined,
    isAuthenticated,
    userLookup,
  };
  return (
    <>
      <authProviderContext.Provider value={authContextObject}>
        {props.children}
      </authProviderContext.Provider>
    </>
  );
}

export default AuthProvider;
