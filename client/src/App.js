
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Alert from "./components/Alert/Alert";

// Pages import
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Scanned from "./pages/Scanned/Scanned";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import AllAttendence from "./pages/AllAttendence/AllAttendence";
import ScannedQR from "./pages/Scanned/ScannedQR";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import SpecificUser from "./pages/SpecificUser/SpecificUser";

// State Imports
import AlertState from "./context/alerts/AlertState";
import SpecificuserState from "./context/specificuser/SpecificuserState";
import URLState from "./context/url/URLState";


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
