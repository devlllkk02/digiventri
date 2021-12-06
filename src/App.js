import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return(
    <Router>
      <Navbar/>
    </Router>
  );
}

export default App;
