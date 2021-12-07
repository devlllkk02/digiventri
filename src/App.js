import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Ledger from "./components/Ledger/Ledger";

function App() {
  return(
    <Router>
      <Navbar/>
      <Ledger/>
    </Router>
  );
}

export default App;
