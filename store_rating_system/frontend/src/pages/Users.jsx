import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Users = () => {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    const res =
    await API.get("/users/all");

    setUsers(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>Users</h2>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user.id}>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
};

export default Users;