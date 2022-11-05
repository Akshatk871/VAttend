
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import AlertState from "./context/alerts/AlertState";
import SpecificuserState from "./context/specificuser/SpecificuserState";
import URLState from "./context/url/URLState";
import Alert from "./components/Alert/Alert";
import Profile from "./components/Profile/Profile";
import Scanned from "./components/Scanned/Scanned";
import Dashboard from "./components/Dashboard/Dashboard";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import AllAttendence from "./components/AllAttendence/AllAttendence";
import ScannedQR from "./components/Scanned/ScannedQR";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import SpecificUser from "./components/SpecificUser/SpecificUser";

function App() {
  return (
    <>
    <AlertState>
    <URLState>
      <SpecificuserState>
      <Router>
        <Navbar />
        <Alert />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/profile" element={<Profile user="self"/>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/scanned" element={<Scanned />}></Route>
            <Route path="/scanned/:id" element={<ScannedQR />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/addemployee" element={<AddEmployee />}></Route>
            <Route path="/allattendence" element={<AllAttendence />}></Route>
            <Route path="/updatepassword" element={<UpdatePassword />}></Route>
            <Route path="/specificprofile" element={<SpecificUser />}></Route>
          </Routes>
        </div>
      </Router>
      </SpecificuserState>
      </URLState>
      </AlertState>
    </>
  );
}

export default App;
