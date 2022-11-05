import React, {useState, useContext, useEffect} from "react";
import Record from "./Record";
import "./Records.css";
import AlertContext from "../../context/alerts/alertContext";

const Records = (props) => {

    const host = process.env.REACT_APP_ADD_SERVER;

    var route = '/api/records/fetchallrecords'

    // This will get triggered if other user profile is visited
    if(props.user !== "self") route = props.route;

    // This is for Alert Context
    const contextAlert = useContext(AlertContext);
    const {updateAlert} = contextAlert;

    const [records, updateRecords] = useState([]);

    // This will get triggered if self profile is visited
    const fetchRecords = async () => {
        const response = await fetch(`${host}${route}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Bypass-Tunnel-Reminder": "anything",
            'auth-token': localStorage.getItem('token')
          },
        });
    
        const json = await response.json();
        if (json.success) {
          updateRecords(json.records);
        }else{
          updateAlert(json.error, "danger");
        }
      };

      // This will get triggered if other user profile is visited
      const fetchSpecificRecords = async () => {
        const response = await fetch(`${host}${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Bypass-Tunnel-Reminder": "anything",
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ id: props.user })
        });
    
        const json = await response.json();
        if (json.success) {
          updateRecords(json.records);
        }else{
          updateAlert(json.error, "danger");
        }
      };

      useEffect(() => {
        if(props.user === "self") fetchRecords();
        else fetchSpecificRecords();
         // eslint-disable-next-line
      }, [])



  return (
    <>
    <div className="record">
      <div className="record-section table-responsive-sm">
        <table className="table table-bordered">
          <thead class="thead-dark">
            <tr className="table-dark">
              <th>Time</th>
              <th>Date</th>
              <th>Distance</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* This is the individual records */}

          {records.slice(0).reverse().map((record, index) => {
          return <Record record={record} key={index} />;
            })}

          {/* This is the EENNNDD individual records */}
        </table>

        <br />
      </div>
    </div>
    </>
  )
};

export default Records;
