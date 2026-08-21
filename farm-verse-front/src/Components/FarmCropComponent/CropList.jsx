import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
    getCropsByUsername,
    deleteCropById
} from "../../Services/CropService";
import "../../DisplayView.css";

const CropList = () => {

    const [crops, setCrops] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();


    // Load crops
    const setCropData = () => {

        getCropsByUsername()
            .then((response) => {
                setCrops(response.data);
            })
            .catch((error) => {
                console.error("Error loading crops:", error);
            });

    };


    useEffect(() => {
        setCropData();
    }, [location]);


    // Delete crop
    const removeCrop = (id) => {

        deleteCropById(id)
            .then(() => {
                setCropData();
            })
            .catch((error) => {
                console.error(error);
            });

    };


    // Return to dashboard
    const returnBack = () => {
        navigate("/farmer-menu");
    };


    return (

        <div className="list-page">

            {/* Banner */}

            <div className="page-banner">

                <h1>🌱 Crop Management</h1>

                <p>
                    Manage and monitor all your crop records efficiently
                </p>

            </div>


            {/* Main Card */}

            <div className="list-card">

                <h2 className="list-title">
                    Crop List By User
                </h2>


                <table className="list-table">

                    <thead>

                        <tr>

                            <th>Crop Id</th>
                            <th>Farm Id</th>
                            <th>Crop Name</th>
                            <th>Crop Area</th>
                            <th>Sown Month & Year</th>
                            <th>Harvest Month & Year</th>
                            <th>Yield</th>
                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>

                        {crops.length > 0 ? (

                            crops.map((crop) => (

                                <tr key={crop.cropId}>

                                    <td>
                                        {crop.cropId}
                                    </td>

                                    <td>
                                        {crop.farmId}
                                    </td>

                                    <td>
                                        {crop.cropName}
                                    </td>

                                    <td>
                                        {crop.cropArea}
                                    </td>

                                    <td>
                                        {crop.sownMonthYear}
                                    </td>

                                    <td>
                                        {crop.harvestMonthYear}
                                    </td>

                                    <td>

                                        <span className="yield-badge">
                                            🌾 {crop.yield}
                                        </span>

                                    </td>


                                    <td>

                                        <div className="action-buttons">

                                            {/* Crop Yield Report */}

                                            <Link
                                                to={`/crop-report/${crop.cropId}`}
                                            >

                                                <button className="predict-btn">
                                                    📈 Crop Yield
                                                </button>

                                            </Link>


                                            {/* Crop Inputs */}

                                            <Link
                                                to={`/crop-input/${crop.cropId}`}
                                            >

                                                <button className="input-btn">
                                                    Crop Inputs
                                                </button>

                                            </Link>


                                            {/* Crop Expense Report */}

                                            <Link
                                                to={`/farm-crop-expense/${crop.cropId}`}
                                            >

                                                <button className="expense-btn">
                                                    💰 Crop Expense Report
                                                </button>

                                            </Link>


                                            {/* Delete */}

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    removeCrop(crop.cropId)
                                                }
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="8">
                                    No crops found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>


                {/* Return Button */}

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

export default CropList;