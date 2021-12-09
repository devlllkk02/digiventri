import React, { useState, useEffect } from "react";

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

function Auth() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [sigupEmail, setSignupEmail] = useState("");
  const [sigupPassword, setSignupPassword] = useState("");
  const [uid, setUid] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [file, setFile] = useState("");

  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    if (uid) {
      uploadImage(file);
    }
  }, [uid]);

  useEffect(() => {
    if (image) {
      createUser();
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: uid,
          email: sigupEmail,
          firstName: firstName,
          lastName: lastName,
          image: image,
        })
      );
      console.log(uid);
      console.log(image);
    }
  }, [image]);

  //User
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log(currentUser);
  });

  //Upload image to cloud
  const uploadImage = (file) => {
    const storageref = ref(storage, `/file/${file.name}`);
    const uploadTask = uploadBytesResumable(storageref, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setImage(url));
      }
    );
  };

  //Create User in DB
  const createUser = () => {
    const userCollectionRef = collection(db, "users");
    addDoc(userCollectionRef, {
      uid: uid,
      email: sigupEmail,
      firstName: firstName,
      lastName: lastName,
      image: image,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  //Signup
  const signup = () => {
    createUserWithEmailAndPassword(auth, sigupEmail, sigupPassword)
      .then((newUser) => {
        console.log(newUser.user.uid);
        setUid(newUser.user.uid);
        console.log(newUser);
      })
      .catch((error) => console.log(error));
  };

  //Login
  const login = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  };

  //Logout
  const logout = () => {
    signOut(auth)
      .then((user) => console.log(user))
      .catch((error) => console.log(error));
  };

  //Google Signin
  const googleProvider = () => {
    console.log("hi");

    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result);
        setUser(result);
        console.log("hi2");
      })
      .catch((error) => {
        console.log(error);
        console.log("failed");
      });
  };

  return (
    <div>
      <button onClick={() => console.log(user)}>Test user</button>
      <h2>SignUp</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={sigupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={sigupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={() => signup()}>Signup</button>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={() => login()}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <h2>Google Auth</h2>
      <button onClick={() => googleProvider()}>Google Sign In</button>
      <h2>User</h2>
      <p>{user?.email}</p>
    </div>
  );
}

export default Auth;
