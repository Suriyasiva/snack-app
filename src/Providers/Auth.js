import React from "react";
import { lookUp } from "../Questionrepository/QuestionRepo";

// create context--
export const authenticateToken = React.createContext(" ");
function Auth(prpos) {
  const contextData = {
    lookUp: lookUp,
  };
  return (
    <>
      <authenticateToken.Provider value={contextData}>
        {prpos.children}
      </authenticateToken.Provider>
    </>
  );
}

export default Auth;
