import React, {useState, useContext} from "react";
import "./AddEmployee.css";
import AlertContext from "../../context/alerts/alertContext";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {

  let navigate = useNavigate();
  const host = process.env.REACT_APP_ADD_SERVER;

  // Context for alert
  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;

  const [signup, updateSignup] = useState({name: "", employee_id: "", password: "", admin: ""});
  const {name, employee_id, password, admin} = signup;

  const handleSubmit = async (event)=>{
    event.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem('vattend-token')
      },
      body: JSON.stringify({ name: name, employee_id: employee_id, password: password, admin: (admin === "Yes")?true:false })
    });
    const json = await response.json();
    
    if(json.success){
        navigate("/");
        updateAlert("Employee Added Successfully!!", "success");
    }
    else {
        updateSignup({name: "", employee_id: "", password: "", admin: ""});
        updateAlert(json.error, "danger");
      }
  }

  const handleChange = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    updateSignup({ ...signup, [name]: value });
  }

  return (
    <>
    <div className='container'>
    <div className="addEmployee">
      <h3>Add a New Employee</h3>
      <div className="addEmployeeForm">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              aria-describedby="Name"
              required
              autocomplete="off"
              minLength={3}
              onChange={handleChange}
              value={signup.name}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="employee_id" className="form-label">
              Employee ID
            </label>
            <input
              name="employee_id"
              type="text"
              className="form-control"
              id="employee_id"
              aria-describedby="employee-id"
              required
              autocomplete="off"
              onChange={handleChange}
              minLength = {4}
              value={signup.employee_id}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              required
              minLength = {6}
              onChange={handleChange}
              value={signup.password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin">Admin</label>
            <select
              name="admin"
              className="form-control"
              id="admin"
              onChange={handleChange}
              value={signup.admin}
              required
            >
              <option>NO</option>
              <option>Yes</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-dark d-flex addEmpBtn">
            Add Employee
          </button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};

export default AddEmployee;
