import React, { useState } from "react";
import AlertContext from "./alertContext.js";

const AlertState = (props) => {

  const [alert, setAlert] = useState("");
  const [visible, setVisible] = useState("d-none");
  const [type, setType] = useState("primary");

  // Set Alert
  const updateAlert = (text, type)=> {
    setAlert(text);
    setVisible("");
    if(type) setType(type);
    setTimeout(()=>{
      setAlert("");
      setType("primary");
      setVisible("d-none")
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, updateAlert, visible, type}}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;