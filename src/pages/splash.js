import React from "react";
import tesarkTechnologiesSquarelogo from "../assets/tesarkTechnologiesSquarelogo.png";

const SplashPage = (props) => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-center align-items-center ">
            <div class="progress-loader">
              <img
                className="img-fluid splash-logo"
                src={tesarkTechnologiesSquarelogo}
                alt="tsark-logo"
              ></img>
              <div class="progress mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SplashPage;
