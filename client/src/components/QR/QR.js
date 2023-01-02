import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URLContext from "../../context/url/urlContext";
import "./QR.css";

const QR = () => {
  let navigate = useNavigate();

  // Setting up the context
  const context = useContext(URLContext);
  const { updateURL } = context;

  // Calculating time
  let seconds = new Date().getSeconds() * 1000;
  let waitingTime = seconds <= 30000 ? 30000 - seconds : 60000 - seconds;
  let refreshTime = 30000;

  const host = process.env.REACT_APP_ADD_SERVER;

  const [QR, updateQR] = useState({ imageURL: "", url: "/" });

  const { imageURL, url } = QR;

  const getQR = async () => {
    try {
      const response = await fetch(`${host}/api/QR`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "anything",
        },
      });

      const json = await response.json();
      if (json.success) {
        updateQR({ imageURL: json.imgurl, url: json.uri });
      } else {
        console.log("Error in getting QR");
        updateQR({ imageURL: "/images/404.png", url: "/" });
      }
    } catch (err) {
      updateQR({ imageURL: "/images/404.png", url: "/error" });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    updateURL(url);
    navigate("/scanned");
  };

  useEffect(() => {
    updateQR({ imageURL: "/images/loading.gif", url: "/" });
    getQR();
    let comInterval;
    setTimeout(() => {
      getQR();
      comInterval = setInterval(getQR, refreshTime); //This will refresh the data at regularIntervals of refreshTime
    }, waitingTime);
    return () => clearInterval(comInterval); //Clear interval on component unmount to avoid memory leak
    // eslint-disable-next-line
  }, [refreshTime, waitingTime]);

  return (
    <div className="container">
      <div className="qr-container">
      {url !== "/" && (
        <h4>Scan Code To Mark Attendance</h4>)}
        <img className="qr-code" src={imageURL} alt="QRCode" />
        {url !== "/" && (
        <h4>OR</h4>)}
        {url !== "/" && (
        <button
          className="btn btn-outline-light max-2 attendence-btn"
          onClick={handleClick}
        >
          Mark Attendance!
        </button>)}
        {url === "/error" && (<h4>Something went wrong!</h4>)}
      </div>
    </div>
  );
};

export default QR;
