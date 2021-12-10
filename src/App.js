// ----- App -----
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
              </>
            }
          ></Route>
          {/* Login */}
          <Route path="/login" element={<Login />}></Route>

          {/* Signup */}
          <Route path="/signup" element={<Signup />}></Route>
          {/* Home */}
          <Route path="/" element={<Home />}></Route>
          {/* Auth test */}
          <Route path="/register" element={<Auth />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
