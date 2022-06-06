import React from "react";
import Menu from "./Menu";
import { Outlet, Link } from "react-router-dom";
function MenuList() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end mt-3">
            <Link to="createMenu" className="menu-add-Button">
              <span className="button_top">
                <i className="fa-solid fa-plus"></i>Menu
              </span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MenuList;
