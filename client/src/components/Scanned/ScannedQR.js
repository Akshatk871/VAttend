import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import URLContext from "../../context/url/urlContext";

const ScannedQR = () => {
  // Setting up the context
  const context = useContext(URLContext);
  const { updateURL } = context;
  const id = useLocation().pathname.split("/")[2];

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const hostt = process.env.REACT_APP_ADD_SERVER;
      const uri = hostt + "/api/scan/" + id;
      updateURL(uri);
      navigate("/scanned");
    }
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default ScannedQR;
