import React, {useState, useContext, useEffect} from "react";
import Record from "./Record";
import "./Records.css";
import RecordContext from "../../context/records/recordsContext";

const Records = (props) => {

    const profileContext = useContext(RecordContext);
    const {records, fetchRecords, fetchSpecificRecords} = profileContext;

    const [recordsFiltered, setRecords] = useState(records);

      useEffect(() => {
        async function fetchRecord() {
          await fetchRecords();
          setRecords(limitRecords(filterRecords(records)));
        }
        async function fetchSpecificRecord() {
          await fetchSpecificRecords(props.route, props.user);
          setRecords(limitRecords(filterRecords(records)));
        }
        
        if(props.user === "self") {
          fetchRecord();
        }
        else {
          fetchSpecificRecord();
        }
         // eslint-disable-next-line
      }, [records])

      


      const [filter, setFilter] = useState("all");
      const [limit, setLimit] = useState(10);

      const handleFilter = (e) => {
        setFilter(e.target.value);
      };

      const handleLimit = (e) => {
        setLimit(e.target.value);
      };

      const filterRecords = (records) => {
        if (filter === "all") {
          return records;
        } else if (filter === "present") {
          return records.slice(0).reverse().filter((record) => record.present);
        } else if (filter === "absent") {
          return records.filter((record) => record.present === false);
        }
      };

      const limitRecords = (records) => {
        return records.slice(0).reverse().slice(0, limit);
      };

      const handleFilterRecords = () => {
        setRecords(limitRecords(filterRecords(records)));
      };



  return (
    <>
    <div className="record">
      <div className="filter-section">
        <select onChange={handleFilter}>
          <option value="all">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <select onChange={handleLimit}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>

        <button className="btn btn-dark btn-sm mx-2" onClick={handleFilterRecords}>Filter</button>
      </div>
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

          
        
          {recordsFiltered.map((record, index) => {
          return <Record record={record} key={index} />;
            })}

          {/* This is the EENNNDD individual records */}
        </table>

        <br />
        <p>**Showing <strong>{recordsFiltered.length}</strong> Records**</p>
      </div>
    </div>
    </>
  )
};

export default Records;
