import React, { useState, useContext, useEffect } from "react";
import User from "./User";
import "./Users.css";
import AlertContext from "../../context/alerts/alertContext";

const Users = () => {
  const host = process.env.REACT_APP_ADD_SERVER;

  // This is for Alert Context
  const contextAlert = useContext(AlertContext);
  const { updateAlert } = contextAlert;

  const [users, updateUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(`${host}/api/admin/fetchallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem('vattend-token'),
      },
    });

    const json = await response.json();
    if (json.success) {
      updateUsers(json.users);
    } else {
      updateAlert(json.error, "danger");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="user">
        <h1>All Users</h1>
        <div className="user-section table-responsive-sm">
          <table className="table table-bordered">
            <thead class="thead-dark">
              <tr className="table-dark">
                <th>Name</th>
                <th>Employee ID</th>
                <th>Admin</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>

            {/* This is the individual users */}

            {users.map((user, index) => {
              return <User user={user} key={index} fetchUsers={fetchUsers} />;
            })}

            {/* This is the EENNNDD individual users */}
          </table>

          <br />
        </div>
      </div>
    </>
  );
};

export default Users;
