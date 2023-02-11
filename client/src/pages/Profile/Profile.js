import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import AlertContext from "../../context/alerts/alertContext";
import Records from "../../components/Records/Records";
import { useNavigate } from "react-router-dom";
import Leaflet from "../../components/Leaflet/Leaflet";
import RecordsContext from "../../context/records/recordsContext";

const Profile = (props) => {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_ADD_SERVER;
  var route = '/api/profile'

  // This will get triggered if other user profile is visited
  if(props.user !== "self") route = props.route;

  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;

  // context for records maps
  const mapContext = useContext(RecordsContext);
  const { locations } = mapContext;

  const [account, updateAccount] = useState({
    name: "",
    employee_id: "",
    date: "",
    time: "",
    admin: "",
  });
  const { name, employee_id, date, time, admin, present } = account;

  // State for MAP
  const [map, updateMap] = useState(false);

  // This will get triggered if self profile is visited
  const getProfile = async () => {
    const response = await fetch(`${host}${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        'auth-token': localStorage.getItem('vattend-token')
      },
    });

    const json = await response.json();
    if (json.success) {
      updateAccount(json.details);
    }else{
      updateAlert(json.error, "danger");
    }
  };

  // This will get triggered if other user's profile is visited
  const getSpecificUser = async () => {
    const response = await fetch(`${host}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        'auth-token': localStorage.getItem('vattend-token')
      },
      body: JSON.stringify({ id: props.user })
    });

    const json = await response.json();
    if (json.success) {
      updateAccount(json.details);
    }else{
      updateAlert(json.error, "danger");
    }
  };

  /// FUNCTIONS FOR MAP
  function showMap(){
    updateMap(!map);
  }

  useEffect(() => {
    if(props.user === "self") getProfile();
    else getSpecificUser();
     // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div className="account-section">
        <div className="account">
          <div className="account-left">
            <img
              className="profile-pic"
              src="./images/profile.webp"
              alt="profile-pic"
            />
          </div>

          <div className="account-right">
            <h5>
              Name: <span className="info"> {name} </span>
            </h5>
            <h5>
              Employee ID: <span className="info"> {employee_id} </span>
            </h5>
            <h5>
              Date Added: <span className="info"> {date}</span>
            </h5>
            <h5>
              Time Added: <span className="info"> {time}</span>
            </h5>
            <h5>
              Admin: <span className="info"> {admin?"Yes":"No"} </span>
            </h5>
            <h5>
              TODAY: <span className="info"> {present?"Present":"Absent"} </span>
            </h5>
          </div>
        </div>
        <div className="center">
          <input
            className={(props.user !== "self")?"d-none":"btn btn-warning d-flex"}
            type="button"
            value="Update Password"
            onClick={()=>{
              navigate('/updatepassword')
            }}
          />

          <input
            className="btn btn-success d-flex"
            type="button"
            value="Show Map"
            onClick={()=>{
              showMap();
            }}
          />

        </div>
      </div>

      {map&&(
        <>
        <Leaflet marks={locations} />
        </>
      )}

      <Records user={props.user} route='/api/admin/fetchuserrecords' />
    </div>
  );
};

export default Profile;
