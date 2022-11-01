import React, { useState } from "react";
import URLContext from "./urlContext";

const URLState = (props) => {

  const [url, updateURL] = useState("");

  return (
    <URLContext.Provider value={{ url, updateURL}}>
      {props.children}
    </URLContext.Provider>
  );
};

export default URLState;