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
      setUsersFiltered(json.users);
    } else {
      updateAlert(json.error, "danger");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const [Search, setSearch] = useState("");
  const [usersFiltered, setUsersFiltered] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const searchUser = async () => {
    // search for user based on name or employee id
    setUsersFiltered(users.filter((user) => user.name.toLowerCase().includes(Search.toLowerCase()) || user.employee_id.toLowerCase().includes(Search.toLowerCase())));
  };

  const handleSearch = () => {
    searchUser(Search);
  };

  return (
    <>
      <div className="user">
        <h1>All Users</h1>

        <div className="filter">
          <input type="text" placeholder="Search" onChange={handleSearchChange}/>
          <button className="btn btn-dark btn-sm mx-2 my-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-dark btn-sm" onClick={fetchUsers}>Reset</button>
        </div>

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

            {usersFiltered.map((user, index) => {
              return <User user={user} key={index} fetchUsers={fetchUsers} />;
            })}

            {/* This is the EENNNDD individual users */}
          </table>

          <br />
        </div>

        <p>**Showing <strong>{usersFiltered.length}</strong> Results**</p>
      </div>
    </>
  );
};

export default Users;
