import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import URLContext from '../../context/url/urlContext';
import AttendanceStatus from '../../components/AttendanceStatus/AttendanceStatus';

const Scanned = () => {
    // Setting up the context
    const context = useContext(URLContext);
    const {url} = context;

    // Setting up the host
    var host = url;

    let navigate = useNavigate();

    // Setting up useState to update info being sent to the user
    const [message, updateMessage] = useState("Waiting...");
    const [Attendance, updateAttendance] = useState({present: "", distance: "", name: "", employee_id: "", time: "", date: ""});
    useEffect(() => {
        if(!localStorage.getItem('vattend-token')) {
          navigate('/login');
        }else {
          scan();
        }
        // eslint-disable-next-line
      }, []);
    

    function scan(){
    // This check is if device/browser supports Geo-Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendRequest);
        console.log("Scanning...");
        setTimeout(() => {
            if(message==="Waiting..."){
                updateMessage("Sorry! Device/Browser doesn't support Geolocation/Permission denied!");
            }
        }, 10000);
        async function sendRequest(position){
            let latitude =  await position.coords.latitude;
            let longitude = await position.coords.longitude;

            let location = [latitude, longitude];

            const response = await fetch(host, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('vattend-token'),
                  "device-token": localStorage.getItem('vadevicetoken')
                },
                body: JSON.stringify({ location: location })
              });
          
            const json = await response.json();

            if(json.success){
                updateMessage("");
                updateAttendance({present: json.present?"Present":"Absent", distance: json.distance.toFixed(2), name: json.name, employee_id: json.employee_id, time: json.time, date: json.date})
            }else{
                updateMessage(json.error)
            }
        }
    }
    else{
        updateMessage("Sorry! Device/Browser doesn't support Geolocation/Permission denied!");
    }
    }

  return (
    <div className='container'>
      <div>{(message==="")?<AttendanceStatus Attendance={Attendance}/>:<h3>{message}</h3>}</div>
    </div>
  )
}

export default Scanned