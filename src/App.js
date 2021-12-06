// ----- App -----
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
