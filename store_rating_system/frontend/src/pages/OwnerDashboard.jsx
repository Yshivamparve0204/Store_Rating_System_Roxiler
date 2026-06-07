import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const OwnerDashboard = () => {

  const [data, setData] =
    useState({
      averageRating: 0,
      ratings: []
    });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    const res =
    await API.get(
      "/ratings/owner-dashboard"
    );

    setData(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>
          Owner Dashboard
        </h2>

        <h3>
          Average Rating:
          {data.averageRating}
        </h3>

        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>

            {data.ratings?.map(
              rating => (

              <tr key={rating.id}>
                <td>
                  {rating.userName}
                </td>

                <td>
                  {rating.rating}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
};

export default OwnerDashboard;