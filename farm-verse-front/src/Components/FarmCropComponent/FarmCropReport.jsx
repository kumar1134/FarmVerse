import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpectedYield } from "../../Services/AIService";
import "./FarmCropReport.css";

import {
  FaSeedling,
  FaMapMarkerAlt,
  FaMountain,
  FaRulerCombined,
  FaCalendarAlt,
  FaChartLine,
  FaRobot,
  FaArrowLeft,
  FaPrint,
  FaLeaf,
  FaCheckCircle
} from "react-icons/fa";

const FarmCropReport = () => {

    const navigate = useNavigate();
    const { cid } = useParams();

    const [farmCrop, setFarmCrop] = useState({
        farmId: 0,
        farmName: "",
        soil: "",
        cropId: "",
        cropName: "",
        cropArea: 0,
        sownMonthYear: "",
        harvestMonthYear: "",
        yield: 0,
        comments: ""
    });

    useEffect(() => {

        getExpectedYield(cid)
            .then((response) => {
                setFarmCrop(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Unable to predict crop yield.");
            });

    }, [cid]);

    const returnBack = () => {
        navigate("/crop-list");
    };

    return (

        <div className="report-page">

            {/* ================= HEADER ================= */}

            <div className="top-header">

                <div>

                    <h1>🌱 FarmVerse AI Analytics</h1>

                    <p>AI Powered Smart Farming Dashboard</p>

                </div>

                <div className="status-chip">

                    <FaCheckCircle />

                    <span>AI Generated</span>

                </div>

            </div>

            {/* ================= TITLE ================= */}

            <div className="page-title">

                <h2>Crop Yield Prediction Report</h2>

                <p>
                    {farmCrop.cropName} • {farmCrop.farmName}
                </p>

            </div>

            {/* ================= MAIN GRID ================= */}

            <div className="dashboard-grid">

                {/* LEFT */}

                <div className="left-panel">

                    <div className="card">

                        <h3>Crop Overview</h3>

                        <div className="info-row">

                            <FaSeedling className="icon"/>

                            <div>

                                <small>Crop</small>

                                <h4>{farmCrop.cropName}</h4>

                            </div>

                        </div>

                        <div className="info-row">

                            <FaMapMarkerAlt className="icon"/>

                            <div>

                                <small>Farm</small>

                                <h4>{farmCrop.farmName}</h4>

                            </div>

                        </div>

                        <div className="info-row">

                            <FaMountain className="icon"/>

                            <div>

                                <small>Soil</small>

                                <h4>{farmCrop.soil}</h4>

                            </div>

                        </div>

                        <div className="info-row">

                            <FaRulerCombined className="icon"/>

                            <div>

                                <small>Cultivated Area</small>

                                <h4>{farmCrop.cropArea} Acres</h4>

                            </div>

                        </div>

                    </div>
                                        {/* Harvest Timeline */}

                    <div className="card">

                        <h3>Harvest Timeline</h3>

                        <div className="timeline">

                            <div className="timeline-box">

                                <FaCalendarAlt className="icon"/>

                                <div>

                                    <small>Sown Month</small>

                                    <h4>{farmCrop.sownMonthYear}</h4>

                                </div>

                            </div>

                            <div className="timeline-box">

                                <FaCalendarAlt className="icon"/>

                                <div>

                                    <small>Harvest Month</small>

                                    <h4>{farmCrop.harvestMonthYear}</h4>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="right-panel">

                    <div className="yield-card">

                        <FaChartLine className="yield-icon"/>

                        <h3>Predicted Yield</h3>

                        <h1>{farmCrop.yield}</h1>

                        <p>Bales / Acre</p>

                        <div className="confidence">

                            AI Confidence : High

                        </div>

                    </div>

                    <div className="summary-card">

                        <div>

                            <FaLeaf className="summary-icon"/>

                            <span>Crop Health</span>

                            <h4>Healthy</h4>

                        </div>

                        <div>

                            <FaCheckCircle className="summary-icon"/>

                            <span>Status</span>

                            <h4>Successful</h4>

                        </div>

                    </div>

                </div>

            </div>

            {/* AI Recommendation */}

            <div className="ai-card">

                <div className="ai-header">

                    <FaRobot/>

                    <h3>FarmVerse AI Recommendation</h3>

                </div>

                <p>

                    {farmCrop.comments}

                </p>

            </div>

            {/* Bottom Buttons */}

            <div className="button-group">

                <button

                    className="back-btn"

                    onClick={returnBack}

                >

                    <FaArrowLeft/>

                    &nbsp; Back to Crop List

                </button>

                <button

                    className="print-btn"

                    onClick={() => window.print()}

                >

                    <FaPrint/>

                    &nbsp; Print Report

                </button>

            </div>

        </div>

    );

};

export default FarmCropReport;