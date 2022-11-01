import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import URLContext from '../../context/url/urlContext';

const Scanned = () => {
    // Setting up the context
    const context = useContext(URLContext);
    const {url} = context;

    // Setting up the host
    var host = "http://192.168.29.73:9000/"+url;

    let navigate = useNavigate();

    // Setting up useState to update info being sent to the user
    const [message, updateMessage] = useState("Waiting...");

    useEffect(() => {
        if(!localStorage.getItem('token')) {
          navigate('/login');
        }else scan();
        // eslint-disable-next-line
      }, []);
    

    function scan(){
    // This check is if device/browser supports Geo-Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendRequest);
        async function sendRequest(position){
            let latitude =  await position.coords.latitude;
            let longitude = await position.coords.longitude;

            let location = [latitude, longitude];

            const response = await fetch(host, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ location: location })
              });
          
            const json = await response.json();

            if(json.success){
                updateMessage(json.message)
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
    <div>
        <h2>{message}</h2>
    </div>
  )
}

export default Scanned