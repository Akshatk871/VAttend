
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import AlertState from "./context/alerts/AlertState";
import Alert from "./components/Alert/Alert";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
    <AlertState>
      <Router>
        <Navbar />
        <Alert />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Router>
      </AlertState>
    </>
  );
}

export default App;
