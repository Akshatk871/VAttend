import React, {useState, useContext, useEffect} from "react";
import Record from "./Record";
import "./Records.css";
import RecordContext from "../../context/records/recordsContext";

const Records = (props) => {

    const profileContext = useContext(RecordContext);
    const {records, fetchRecords, fetchSpecificRecords, locations} = profileContext;

      useEffect(() => {
        async function fetchRecord() {
          await fetchRecords();
        }
        async function fetchSpecificRecord() {
          await fetchSpecificRecords(props.route, props.user);
        }
        
        if(props.user === "self") {
          fetchRecord();
        }
        else {
          fetchSpecificRecord();
        }
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
