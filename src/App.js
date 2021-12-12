// ----- App -----
import {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { initialState, reducer } from "./reducers/useReducer";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Ledger from "./components/Ledger/Ledger";

//Creating Context
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();

  //Checking the existance of the User
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
    } else {
      if (!window.location.pathname.endsWith("/")) {
        navigate("/login");
      }
    }
  }, []);

  return (
    <div className="app">
      <Routes>
        {/* Ledger */}
        <Route
          path="/ledger/:ledgerId"
          element={
            <>
              <Navbar />
              <Ledger />
            </>
          }
        ></Route>
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        ></Route>
        {/* Login */}
        <Route path="/login" element={<Login />}></Route>
        {/* Signup */}
        <Route path="/signup" element={<Signup />}></Route>
        {/* Home */}
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <Router>
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
