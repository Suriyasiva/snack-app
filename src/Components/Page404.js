import React from "react";
import errorPage from "../assets/errorPage.gif";

function Page404() {
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-lg-12 d-flex justify-content-center align-item-center ">
            <img
              style={{ height: "100vh" }}
              className="img-fluid "
              src={errorPage}
              alt="error-404"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
//
