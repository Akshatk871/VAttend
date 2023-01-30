import React, { useState, useContext } from "react";
import RecordsContext from "./recordsContext";
import AlertContext from "../alerts/alertContext";

const RecordState = (props) => {
  const host = process.env.REACT_APP_ADD_SERVER;

  var route = "/api/records/fetchallrecords"

  const [records, updateRecords] = useState([]);
  const [locations, updateLocations] = useState([]);
  // TODO - CONNECT LOCATIONS and records


  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const {updateAlert} = contextAlert;

  const fetchRecords = async () => {
    const response = await fetch(`${host}${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        'auth-token': localStorage.getItem('vattend-token')
      },
    });

    const json = await response.json();
    if (json.success) {
      updateRecords(json.records);
      updateLocations(json.records.map(record => record.location));
    }else{
      updateAlert(json.error, "danger");
    }
  };

  // This will get triggered if other user profile is visited
  const fetchSpecificRecords = async (route, user) => {
    const response = await fetch(`${host}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        'auth-token': localStorage.getItem('vattend-token')
      },
      body: JSON.stringify({ id: user })
    });

    const json = await response.json();
    if (json.success) {
      updateRecords(json.records);
      updateLocations(json.records.map(record => record.location));
    }else{
      updateAlert(json.error, "danger");
    }
  };

  return (
    <RecordsContext.Provider value={{ fetchRecords, fetchSpecificRecords, records, locations}}>
      {props.children}
    </RecordsContext.Provider>
  );
};

export default RecordState;