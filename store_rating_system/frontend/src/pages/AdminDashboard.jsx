import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


import { Link } from "react-router-dom";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({});

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res =
      await API.get(
        "/users/dashboard"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>Admin Dashboard</h2>

        <div className="cards">

          <div className="card">
            <h3>
              {stats.totalUsers}
            </h3>
            <p>Total Users</p>
          </div>

          <div className="card">
            <h3>
              {stats.totalStores}
            </h3>
            <p>Total Stores</p>
          </div>

          <div className="card">
            <h3>
              {stats.totalRatings}
            </h3>
            <p>Total Ratings</p>
          </div>

        </div>


      </div>

      <Link to="/add-user">
  <button>Add User</button>
</Link>

<Link to="/add-store">
  <button>Add Store</button>
</Link>

<Link to="/users">
  <button>View Users</button>
</Link>
    </>
  );
};

export default AdminDashboard;