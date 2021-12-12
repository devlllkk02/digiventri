// ----- Login -----
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

import { auth, db, storage } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { ToastProperties } from "../../lib/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../../App";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(UserContext);

  //Login
  const handleLogin = () => {
    errorHandling();
  };

  //Stage 01 : Error Handling
  const errorHandling = () => {
    //----- Checking Empty Fields -----
    if (!email || !password) {
      return toast.error("Please enter all the fields!", ToastProperties);
    }

    //----- Checking the email format -----
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return toast.error("Invalid Email", ToastProperties);
    } else {
      login();
    }
  };

  //Stage 02 : Authentication
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // console.log(user.user.uid);
        getUser(user.user.uid);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message, ToastProperties);
      });
  };

  const getUser = (id) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", id));

    onSnapshot(q, (snapshot) => {
      const user = snapshot.docs[0].data();
      localStorage.setItem("user", JSON.stringify(user));
      // console.log(snapshot.docs[0].data());
      dispatch({ type: "USER", payload: user });
      // console.log(state);
    });
  };

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
            <button onClick={() => handleLogin()}>LOGIN</button>
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
      <ToastContainer />
    </div>
  );
}

export default Login;
