import React, { useState } from "react";
import SpecificuserContext from "./specificuserContext.js";

const SpecificuserState = (props) => {

  const [user, setUser] = useState("");

  // Set Alert
  const updateUser = (id)=> {
    setUser(id);
  };

  return (
    <SpecificuserContext.Provider value={{ user, updateUser}}>
      {props.children}
    </SpecificuserContext.Provider>
  );
};

export default SpecificuserState;