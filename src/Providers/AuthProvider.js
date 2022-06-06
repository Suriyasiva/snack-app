import React from "react";
import {
  getUserData,
  deleteUser,
  addUser,
  singleUser,
  editUser,
} from "../Questionrepository/QuestionRepo";
export const authProviderContext = React.createContext(" ");
function AuthProvider(props) {
  const [user, setUser] = React.useState([]);
  const [singleUserData, setSingleUserData] = React.useState({});
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
