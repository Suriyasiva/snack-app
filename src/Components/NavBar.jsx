import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="nav-container">
        <Link to="home" className="home-container ">
          <i className="fa-solid fa-house"></i>&nbsp;
          <div className="home-nav">Home</div>
        </Link>
        <Link to="menu" className="menu-container ">
          <i className="fa-solid fa-rectangle-list"></i>&nbsp;
          <div className="home-nav">Menu</div>
        </Link>
        <Link to="sendMenu" className="sendmenu-container ">
          <i className="fa-solid fa-paper-plane"></i>&nbsp;
          <div className="home-nav">Send Menu</div>
        </Link>
        <Link to="submission" className="submission-container ">
          <i className="bi bi-ui-radios-grid"></i>&nbsp;
          <div className="home-nav">Submission</div>
        </Link>
        <Link to="users" className="users-container ">
          <i className="fa-solid fa-users"></i>&nbsp;
          <div className="home-nav">Users</div>
        </Link>
      </div>
    </>
  );
}
// let providedComponent = (props) => {
//   return (
//     <Provider>
//       <NavBar />
//     </Provider>
//   );
// };
export default NavBar;
