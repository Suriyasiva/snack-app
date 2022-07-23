import { Button } from "@mui/material";
import React from "react";
import undraw_coffee_with_friends_3cbj from "../assets/undraw_coffee_with_friends_3cbj (1).svg";

function DummyPage() {
  return (
    <>
      <div className="container-fluid user-page">
        <div className="row">
          <div className="col-lg-12">
            {/* --top bar-- */}
            <div className="row">
              <div className="collg-12 d-flex justify-content-between align-items-center mt-3">
                <img
                  src="https://www.tesark.com/wp-content/uploads/2019/11/TESARK_Royal.svg"
                  alt="logoWithName"
                  className="ms-3 img-fluid tesark-logo2"
                />
                <div className="me-2 user-box">
                  <i className="fa-solid fa-user-large border border-white p-2 text-white me-2"></i>
                  <b className="user-name ">userName</b>
                  <Button
                    color="secondary"
                    className="me-3 ms-3"
                    variant="outlined"
                    sx={{ color: "#fff" }}
                  >
                    LogOut
                  </Button>
                </div>
              </div>
            </div>
            {/*-- main-- */}
            <div className="row user-content">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <p className="user-welcome-greet">Welcome to tesark</p>
                      <p className="snack-qoute m-0 p-0">
                        Keep Clam & Order your <br /> Favourite{" "}
                        <span className="snack-name"> drink</span>
                      </p>
                    </div>
                    <div
                      className="mt-2"
                      style={{ width: "200px", display: "flex" }}
                    >
                      <input type={"text"} />
                      <Button variant="contained" color="secondary">
                        Order
                      </Button>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-center">
                    <img
                      src={undraw_coffee_with_friends_3cbj}
                      className="img-fluid user-r-imag"
                      alt="coffee-user"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --footer-- */}
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DummyPage;
