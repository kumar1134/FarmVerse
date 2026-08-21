import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFarmsByUsername,
  deleteFarmById,
} from "../../Services/FarmService";
import "../../DisplayView.css";

const FarmList = () => {

  const [farms, setFarms] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = () => {

    getFarmsByUsername()

      .then((response) => {
        setFarms(response.data);
      })

      .catch((error) => {
        console.error(error);
      });

  };

  const removeFarm = (id) => {

    deleteFarmById(id)

      .then(() => {

        setMessage("Farm deleted successfully.");

        loadFarms();

        setTimeout(() => {
          setMessage("");
        }, 3000);

      })

      .catch((error) => {

        console.error(error);

        setMessage("Unable to delete farm.");

        setTimeout(() => {
          setMessage("");
        }, 3000);

      });

  };

  const returnBack = () => {
    navigate("/farmer-menu");
  };

  return (

    <div className="list-page">

      <div className="page-banner">

        <h1>🚜 Farm Management</h1>

        <p>
          Manage and monitor all your farm records efficiently
        </p>

      </div>

      <div className="list-card">

        <h2 className="list-title">
          Farm List By User
        </h2>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <table className="list-table">

          <thead>

            <tr>
              <th>Farm Id</th>
              <th>Farm Name</th>
              <th>Farm Area</th>
              <th>Farm Soil</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {farms.length > 0 ? (

              farms.map((farm) => (

                <tr key={farm.farmId}>

                  <td>{farm.farmId}</td>

                  <td>{farm.farmName}</td>

                  <td>{farm.area}</td>

                  <td>{farm.soil}</td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="delete-btn"
                        onClick={() => removeFarm(farm.farmId)}
                      >
                        Delete Farm
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="5">
                  No Farms Found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

        <div className="return-btn-container">

          <button
            className="return-btn"
            onClick={returnBack}
          >
            ← Return to Dashboard
          </button>

        </div>

      </div>

    </div>

  );

};

export default FarmList;