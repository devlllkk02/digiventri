// ----- Login -----
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageUrl] = useState("");

  //Sign Up
  const login = () => {};

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <Link to="/" style={{ outline: "none" }}>
            <div className="login__logo__container">
              <img
                src="./images/logos/DIGIVENTRI-Logo-02.png"
                alt="DIGIVENTRI"
              />
            </div>
          </Link>
        </div>
        <div className="login__form">
          <div className="login__inputfield">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login__inputfield">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login__submit">
            <button>LOGIN</button>
          </div>

          <div className="login__dontHaveAccount">
            <p>Don't have an account?</p>
          </div>
          <div className="login__link">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <p>Signup</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
