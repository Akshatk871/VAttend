import React, { useState } from "react";
import SpecificuserContext from "./specificuserContext.js";

const SpecificuserState = (props) => {
  const host = process.env.REACT_APP_ADD_SERVER;

    // This is for Alert Context
   // const contextAlert = useContext(AlertContext);
   // const { updateAlert } = contextAlert;

  const [user, setUser] = useState("");

  // Set Alert
  const updateUser = (id)=> {
    setUser(id);
  };

  const deleteUser = async (id)=>{
      const response = await fetch(`${host}/api/admin/deleteuser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Bypass-Tunnel-Reminder": "anything",
          "auth-token": localStorage.getItem('vattend-token'),
        },
        body: JSON.stringify({id: id})
      });
  
      const json = await response.json();
      if (json.success) {
        //updateAlert('Person Deleted!', "success");
      } else {
        //updateAlert(json.error, "danger");
      }
      return true;
  }

  return (
    <SpecificuserContext.Provider value={{ user, updateUser, deleteUser}}>
      {props.children}
    </SpecificuserContext.Provider>
  );
};

export default SpecificuserState;