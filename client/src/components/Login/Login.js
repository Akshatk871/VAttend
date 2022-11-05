import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AlertContext from "../../context/alerts/alertContext";

const Login = () => {

  const host = process.env.REACT_APP_ADD_SERVER;
  let navigate = useNavigate();

  // Context for alert
  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;
  const [hidden, setHidden] = useState("d-none");

  const [login, updateLogin] = useState({employee_id: "", password: ""})
  const {employee_id, password} = login;


  const handleClick = async (event) => {
    event.preventDefault();
    
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything"
      },
      body: JSON.stringify({ employee_id: employee_id, password: password })
    });
    const json = await response.json();
    
    if(json.success){
        // Save auth-token
        localStorage.setItem('token', json.authtoken);
        // Save device-token
        if(!localStorage.getItem('devicetoken')){
          localStorage.setItem('devicetoken', json.devicetoken);
        }
        navigate("/");
        updateAlert("Logged In Successfully!!", "success");
    }
    else {
        updateLogin({employee_id: "", password: ""})
        setHidden("");
        // updateAlert("Login Failed", "danger");
        setTimeout(()=>{
            setHidden("d-none");
        }, 5000);
    }

  };




  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    updateLogin({ ...login, [name]: value });
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Employee ID"
                name="employee_id"
                value={login.employee_id}
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={handleChange}
              />
            </div>
            <div className={hidden+" form-group"}>
            <h6 style={{color: "red"}}>Invalid Credentials</h6>
            </div>
            <button className="button login__submit" onClick={handleClick}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="https://www.google.com" className="social-login__icon fab fa-instagram"> </a>
              <a href="https://www.google.com" className="social-login__icon fab fa-facebook"> </a>
              <a href="https://www.google.com" className="social-login__icon fab fa-twitter"> </a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
