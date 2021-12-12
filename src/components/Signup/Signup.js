// ----- Signup -----
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";

import { auth, db, storage } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { ToastProperties } from "../../lib/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageurl, setImageUrl] = useState("");

  const [user, setUser] = useState({});
  const [uid, setUid] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [mouse, setMouse] = useState(false);

  //Sign Up
  const handleSignup = () => {
    setDisabled(true);
    errorHandling();
  };

  //Stage 01 : Error Handling
  const errorHandling = () => {
    //----- Checking Empty Fields -----
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !conpassword ||
      !image
    ) {
      setDisabled(false);
      return toast.error("Please enter all the fields!", ToastProperties);
    }

    //----- Checking the email format -----
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setDisabled(false);
      return toast.error("Invalid Email", ToastProperties);
    }

    //------ Password Length ------
    if (password.length < 6 || conpassword.length < 6) {
      setDisabled(false);
      return toast.error(
        "Password should be more than 6 characters in length!",
        ToastProperties
      );
    }

    //------ Password Mismatch -----
    if (password != conpassword) {
      setDisabled(false);
      return toast.error("Passwords Missmatch!", ToastProperties);
    } else {
      signup();
    }
  };

  //Stage 02 : Authentication
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((newUser) => {
        setUid(newUser.user.uid);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (uid) {
      uploadImage(image);
    }
  }, [uid]);

  //Stage 02 : Upload image to cloud
  const uploadImage = (image) => {
    const storageref = ref(storage, `/file/${image.name}`);
    const uploadTask = uploadBytesResumable(storageref, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setImageUrl(url));
      }
    );
  };

  useEffect(() => {
    if (imageurl) {
      createUser();
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: uid,
          email: email,
          firstName: firstName,
          lastName: lastName,
          image: image,
        })
      );
      console.log(uid);
      console.log(image);
    }
  }, [imageurl]);

  //Stage 03 : Create User in DB
  const createUser = () => {
    const userCollectionRef = collection(db, "users");
    addDoc(userCollectionRef, {
      uid: uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      image: imageurl,
    })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const ButtonStyles = () => {
    if (disabled) {
      if (mouse) {
        return {
          backgroundColor: "#904c05",
          color: "#ffffff",
          borderColor: "transparent",
          cursor: "progress",
        };
      } else {
        return {
          backgroundColor: "#904c05",
          borderColor: "transparent",
        };
      }
    } else {
      if (mouse) {
        return { backgroundColor: "transparent", borderColor: "#f07f08" };
      } else {
        return { backgroundColor: "#f07f08", borderColor: "#f07f08" };
      }
    }
  };
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
            <button
              disabled={disabled}
              onClick={() => handleSignup()}
              onMouseOver={() => setMouse(true)}
              onMouseLeave={() => setMouse(false)}
              style={ButtonStyles()}
            >
              SIGN UP
            </button>
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
      <ToastContainer />
    </div>
  );
}

export default Signup;
