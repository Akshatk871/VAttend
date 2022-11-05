import React, {useState, useContext} from "react";
import "./UpdatePassword.css";
import AlertContext from "../../context/alerts/alertContext";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {

  let navigate = useNavigate();
  const host = process.env.REACT_APP_ADD_SERVER;

  // Context for alert
  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;

  const [password, updatePassword] = useState({currentpassword: "", newpassword: "", confirmnewpassword: ""});
  const {currentpassword, newpassword, confirmnewpassword} = password;

  const handleSubmit = async (event)=>{
    event.preventDefault();

    const response = await fetch(`${host}/api/profile/updatepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem('vattend-token')
      },
      body: JSON.stringify({ oldpassword: currentpassword, newpassword: newpassword })
    });
    const json = await response.json();
    
    if(json.success){
        navigate("/");
        updateAlert("Password Updated Successfully!!", "success");
    }
    else {
        updatePassword({currentpassword: "", newpassword: "", confirmnewpassword: ""});
        updateAlert(json.error, "danger");
      }
  }

  const handleChange = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    updatePassword({ ...password, [name]: value });
  }

  return (
    <>
    <div className='container'>
    <div className="addEmployee">
      <h3>Update Password</h3>
      <div className="addEmployeeForm">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="currentpassword" className="form-label">
              Current Password
            </label>
            <input
              name="currentpassword"
              type="password"
              className="form-control"
              id="currentpassword"
              required
              minLength = {6}
              onChange={handleChange}
              value={currentpassword}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="newpassword" className="form-label">
              New Password
            </label>
            <input
              name="newpassword"
              type="password"
              className="form-control"
              id="newpassword"
              required
              minLength = {6}
              onChange={handleChange}
              value={newpassword}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmnewpassword" className="form-label">
              Confirm New Password
            </label>
            <input
              name="confirmnewpassword"
              type="password"
              className="form-control"
              id="confirmnewpassword"
              required
              minLength = {6}
              onChange={handleChange}
              value={confirmnewpassword}
            />
          </div>
          
          <button type="submit" className="btn btn-dark d-flex addEmpBtn" disabled= {newpassword !== confirmnewpassword}>
            Update Password
          </button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default UpdatePassword;
