import React from "react";
import "./AttendanceStatus.css"

const AttendanceStatus = (props) => {
  return (
    <>
      <div className="card">
        <img
          src="./images/profile.webp"
          className="card-img-top"
          alt="profile-pic"
        />
        <div className="card-body">
          <p className="card-text">
            <strong>Name: </strong>{props.Attendance.name}<br />
            <strong>Employee Id: </strong> {props.Attendance.employee_id}
            <br />
            <strong>Time:</strong> {props.Attendance.time}
            <br />
            <strong>Distance:</strong> {props.Attendance.distance} KM
          </p>
        </div>
        <hr />
        <div className={props.Attendance.present+" status"}>
          <p>{props.Attendance.present}</p>
        </div>
      </div>
    </>
  );
};

export default AttendanceStatus;
