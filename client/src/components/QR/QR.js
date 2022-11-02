import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URLContext from "../../context/url/urlContext";
import "./QR.css";

const QR = () => {

  let navigate = useNavigate();

  // Setting up the context
  const context = useContext(URLContext);
  const {updateURL} = context;
  
  // Calculating time
  let seconds = new Date().getSeconds() * 1000;
  let waitingTime = seconds<=30000?30000-seconds:60000-seconds;
  let refreshTime = 30000;

  const host = "http://192.168.43.233:9000";
  const [QR, updateQR] = useState({ imageURL: "", url: "" });

  const { imageURL, url } = QR;

  const getQR = async () => {
    const response = await fetch(`${host}/api/QR`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (json.success) {
      updateQR({ imageURL: json.imgurl, url: json.uri });
    }
  };
  
  const handleClick = (event) =>{
    event.preventDefault();
    updateURL(url);
    navigate('/scanned');
  }

  useEffect(() => {
    getQR();
    let comInterval;
    setTimeout(()=>{
    getQR();
    comInterval = setInterval(getQR, refreshTime); //This will refresh the data at regularIntervals of refreshTime
    }, waitingTime);
    return () => clearInterval(comInterval); //Clear interval on component unmount to avoid memory leak
  }, [refreshTime, waitingTime])

  return (
    <div className="qr-container">
      <h4>Scan Code To Mark Attendence</h4>
      <img className="qr-code" src={imageURL} alt="QRCode"/>
      <h4>OR</h4>
      <button
        className="btn btn-outline-light max-2 attendence-btn"
        onClick={handleClick}
      >
        Mark Attendence!
      </button>
    </div>
  );
};

export default QR;
