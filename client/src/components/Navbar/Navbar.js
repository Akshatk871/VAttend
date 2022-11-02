import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          VAttend
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={` nav-link ${location.pathname === "/" && "active"}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={` nav-link ${
                  location.pathname === "/profile" && "active"
                }`}
                to={localStorage.getItem("token")?"/profile":"/login"}
              >
                Profile
              </Link>
            </li>

            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
            <li><Link className="dropdown-item" to="/addemployee">Add Employees</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/allattendence">All Attendence</Link></li>
          </ul>
        </li>

            <li className="nav-item">
              <Link
                className={` nav-link ${
                  location.pathname === "/about" && "active"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link
                className="btn btn-outline-light mx-1"
                to="/login"
                role="button"
              >
                Login
              </Link>
            </div>
          ) : (
            <button
              className="btn btn-outline-light max-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
