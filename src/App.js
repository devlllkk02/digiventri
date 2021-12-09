// ----- App -----
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

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
          {/* Signup */}
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
