// ----- Navbar -----
import React from 'react'
import { Link, Navigate } from "react-router-dom";


function Navbar() {
    return (
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
                                <img src={Test} alt="" />
                            </Link>
                        </div>
                        <div className="user__details">
                            <div className="user__name">

                                <p>Milindi Senevirathne</p>

                            </div>
                            <div className="Logout">
                                <p onClick={() => Logout()}>Logout</p>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default Navbar
