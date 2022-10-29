
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import About from "./components/About/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
