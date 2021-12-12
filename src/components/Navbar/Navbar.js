// ----- Navbar -----
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

import { auth, db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { UserContext } from "../../App";
import DIGIVENTRI_LOGO from "./DIGIVENTRI-Logo-01.png";
function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [uid, setUid] = useState();

  const { state, dispatch } = useContext(UserContext);

  //Fetching the User
  useEffect(() => {
    if (uid) {
      getUser(uid);
    }
  }, [uid]);

  //User
  onAuthStateChanged(auth, (currentUser) => {
    setUid(currentUser.uid);
  });

  const getUser = (id) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", id));

    onSnapshot(q, (snapshot) => {
      const u = snapshot.docs[0].data();
      // console.log(snapshot.docs[0].data());
      setUser(u);
    });
  };

  //Logout
  const handleLogout = () => {
    signOut(auth)
      .then((user) => {
        localStorage.removeItem("user");
        navigate("/login");
        dispatch({ type: "CLEAR" });
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {user ? (
        <div className="navbar">
          <div className="navbar__container">
            {/* Logo */}
            <div className="navbar__logo">
              <Link to="/dashboard">
                <img src={DIGIVENTRI_LOGO} alt="DIGIVENTRI" />
              </Link>
            </div>
            {/* Middle */}
            <div className="navbar__middle"></div>
            {/* User */}
            <div className="navbar__user">
              <div className="navbar__user__image">
                <img src={user.image} alt="" />
              </div>
              <div className="navbar__user__details">
                <div className="navbar__user__name">
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <div className="navbar__logout">
                  <p onClick={() => handleLogout()}>Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Navbar;
