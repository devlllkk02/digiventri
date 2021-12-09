// ----- Navbar -----
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  
  return (
    <div className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/">
            <img src="./images/logos/DIGIVENTRI-Logo-01.png" alt="DIGIVENTRI" />
          </Link>
        </div>
        {/* Middle */}
        <div className="navbar__middle"></div>
        {/* User */}
        <div className="navbar__user">
          <div className="navbar__user__image">
            <img src="./images/Profile.png" alt="" />
          </div>
          <div className="navbar__user__details">
            <div className="navbar__user__name">
              <p>Milindi Senevirathne</p>
            </div>
            <div className="navbar__logout">
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
