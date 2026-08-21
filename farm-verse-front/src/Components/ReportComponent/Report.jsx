import React, { useEffect, useState } from "react";
import "./Report.css";
import { useNavigate } from "react-router-dom";
import { getFarmsByUsername } from "../../Services/FarmService";
import { getCropsByUsername } from "../../Services/CropService";
import {
    FaFileAlt,
    FaPrint,
    FaArrowLeft,
    FaTractor,
    FaSeedling
} from "react-icons/fa";

import "../../DisplayView.css";

const Report = () => {

    const navigate = useNavigate();

    const [farmList, setFarmList] = useState([]);
    const [cropList, setCropList] = useState([]);

    useEffect(() => {

        loadFarms();
        loadCrops();

    }, []);

    const loadFarms = () => {

       getFarmsByUsername()
            .then((response) => {

                setFarmList(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    const loadCrops = () => {
getCropsByUsername()
            .then((response) => {

                setCropList(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    };

    const printReport = () => {

        window.print();

    };

   

    return (

<div className="report-container">


    <div className="report-card">


        {/* ================= HEADER ================= */}

        <div className="report-header">

            <FaFileAlt className="report-main-icon"/>

            <h1 className="report-title">
                FarmVerse Report
            </h1>

            <p className="report-subtitle">
                Farm & Crop Summary Report
            </p>

        </div>



        {/* ================= SUMMARY ================= */}

        <div className="summary-section">


            <div className="summary-card">

                <FaTractor className="summary-icon"/>

                <h2>
                    Total Farms
                </h2>

                <div className="summary-count">
                    {farmList.length}
                </div>

            </div>



            <div className="summary-card">

                <FaSeedling className="summary-icon"/>

                <h2>
                    Total Crops
                </h2>

                <div className="summary-count">
                    {cropList.length}
                </div>

            </div>


        </div>




        {/* ================= FARM DETAILS ================= */}


        <div className="detail-card">


            <h2 className="detail-title">
                🚜 Farm Details
            </h2>



            <table className="report-table">

                <thead>

                    <tr>

                        <th>Farm ID</th>
                        <th>Farm Name</th>
                        <th>Soil Type</th>
                        <th>Area (Acres)</th>

                    </tr>

                </thead>



                <tbody>


                {
                    farmList.length > 0 ?

                    farmList.map((farm)=>(

                        <tr key={farm.farmId}>

                            <td>{farm.farmId}</td>

                            <td>{farm.farmName}</td>

                            <td>{farm.soil}</td>

                            <td>{farm.area}</td>

                        </tr>

                    ))

                    :

                    <tr>

                        <td colSpan="4">
                            No Farm Records Found
                        </td>

                    </tr>

                }


                </tbody>


            </table>


        </div>





        {/* ================= CROP DETAILS ================= */}



        <div className="detail-card">


            <h2 className="detail-title">
                🌱 Crop Details
            </h2>



            <table className="report-table">


                <thead>

                    <tr>

                        <th>Crop ID</th>
                        <th>Crop Name</th>
                        <th>Farm ID</th>
                        <th>Area</th>
                        <th>Yield</th>

                    </tr>

                </thead>



                <tbody>


                {

                    cropList.length > 0 ?

                    cropList.map((crop)=>(


                        <tr key={crop.cropId}>


                            <td>
                                {crop.cropId}
                            </td>


                            <td>
                                {crop.cropName}
                            </td>


                            <td>
                                {crop.farmId}
                            </td>


                            <td>
                                {crop.cropArea}
                            </td>


                            <td>

                            {
                                crop.yield > 0
                                ?
                                crop.yield
                                :
                                "Not Predicted"
                            }

                            </td>


                        </tr>


                    ))

                    :

                    <tr>

                        <td colSpan="5">
                            No Crop Records Found
                        </td>

                    </tr>

                }


                </tbody>


            </table>



        </div>





        {/* ================= FOOTER ================= */}


        <div className="generated-date">


            <p>

                <strong>
                    Generated On :
                </strong>

                {" "}

                {new Date().toLocaleDateString()}


            </p>


        </div>






        {/* ================= BUTTONS ================= */}



        <div className="report-buttons">


            <button

                className="print-btn"

                onClick={printReport}

            >

                <FaPrint /> &nbsp;
                Print Report

            </button>




            <button

                className="back-btn"

                onClick={()=>navigate("/farmer-menu")}

            >

                <FaArrowLeft /> &nbsp;
                Back

            </button>



        </div>



    </div>


</div>

);
};

export default Report;