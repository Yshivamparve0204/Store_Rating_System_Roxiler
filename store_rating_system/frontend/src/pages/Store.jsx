import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const Store = () => {

  const [stores, setStores] =
    useState([]);

  useEffect(() => {

    loadStores();

  }, []);

  const loadStores = async () => {

    const res =
    await API.get("/stores");

    setStores(res.data);
  };

  const submitRating =
  async (storeId, rating) => {

    try {

      await API.post(
        "/ratings",
        {
          storeId,
          rating
        }
      );

      alert("Rating Submitted");

      loadStores();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>Stores</h2>

        {stores.map(store => (

          <div
            key={store.id}
            className="card"
          >

            <h3>
              {store.name}
            </h3>

            <p>
              {store.address}
            </p>

            <p>
              Rating:
              {store.averageRating}
            </p>

            <select
              onChange={(e) =>
                submitRating(
                  store.id,
                  e.target.value
                )
              }
            >
              <option>
                Rate
              </option>

              <option value="1">
                1
              </option>

              <option value="2">
                2
              </option>

              <option value="3">
                3
              </option>

              <option value="4">
                4
              </option>

              <option value="5">
                5
              </option>

            </select>

          </div>

        ))}

      </div>
    </>
  );
};


export default Store;