import React from "react";
import "./Navbar.scss";
import Logo from './Logo.png';
import User from './user.png';
import { Link, Navigate } from "react-router-dom";

const Logout = () => {
    Navigate("/login");
};

function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="DIGIVENTRI" />
                        </Link>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="user">
                        <div className="user__image">
                            <Link to="/">
                                <img src={User} alt="" />
                            </Link>
                        </div>
                        <div className="user__details">
                            <div className="user__name">

                                <p>Gayan Kodithuwakku</p>

                            </div>
                            <div className="Logout">
                                <p onClick={() => Logout()}>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav"></div>
        </>
    );
}

export default Navbar;