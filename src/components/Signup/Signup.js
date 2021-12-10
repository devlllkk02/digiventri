// ----- Signup -----
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageUrl] = useState("");

  //Sign Up
  const signup = () => {};

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__logo">
          <Link to="/" style={{ outline: "none" }}>
            <div className="signup__logo__container">
              <img
                src="./images/logos/DIGIVENTRI-Logo-02.png"
                alt="DIGIVENTRI"
              />
            </div>
          </Link>
        </div>
        <div className="signup__form">
          <div className="signup__inputfield">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="signup__inputfield">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="signup__inputfield">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup__inputfield">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup__inputfield">
            <input
              type="password"
              placeholder="Confirm Password"
              value={conpassword}
              onChange={(e) => setConPassword(e.target.value)}
            />
          </div>
          <div className="signup__imageUpload">
            <div className="signup__imageUpload__button">
              <label htmlFor="signupfile">CHOOSE IMAGE</label>
            </div>
            <input
              type="file"
              id="signupfile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
            <div className="signup__imageUpload__input">
              <input type="text" value={image.name} readOnly />
            </div>
          </div>
          <div className="signup__submit">
            <button>SIGN UP</button>
          </div>

          <div className="signup__alreadyHaveAccount">
            <p>Already have an account?</p>
          </div>
          <div className="signup__link">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
