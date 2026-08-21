import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpectedExpenses } from "../../Services/AIService";
import { addCropInputs } from "../../Services/CropInputsService";
import "../../DisplayView.css";

const CropInputView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cropInputs, setCropInputs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        console.log("Predicting crop inputs for:", id);

        setLoading(true);
        setError("");
        setSuccessMessage("");

        getExpectedExpenses(id)
            .then((response) => {
                console.log("AI Response:", response.data);
                setCropInputs(response.data);
            })
            .catch((error) => {
                console.error("Prediction Error:", error);

                if (error.response) {
                    console.error("Status:", error.response.status);
                    console.error("Data:", error.response.data);
                }

                setError("Unable to predict crop inputs.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleBack = () => {
        navigate("/crop-list");
    };

    const handleSave = async () => {
        if (!cropInputs) {
            setError("No crop input data available to save.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            console.log("Saving crop input details:", cropInputs);

            const response = await addCropInputs(cropInputs);

            console.log("Save Response:", response);

            setSuccessMessage("Crop input details saved successfully!");

        } catch (error) {
            console.error("Save Error:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            }

            setError("Failed to save crop input details.");

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="list-page">
                <div className="page-banner">
                    <h1>🌱 Crop Input Prediction</h1>
                    <p>
                        AI is predicting the required crop inputs...
                    </p>
                </div>
            </div>
        );
    }

    if (error && !cropInputs) {
        return (
            <div className="list-page">

                <div className="page-banner">
                    <h1>❌ Prediction Failed</h1>
                    <p>{error}</p>
                </div>

                <div className="return-btn-container">
                    <button
                        className="return-btn"
                        onClick={handleBack}
                    >
                        ← Return
                    </button>
                </div>

            </div>
        );
    }

    if (!cropInputs) {
        return (
            <div className="list-page">

                <div className="page-banner">
                    <h1>No Crop Input Data</h1>
                    <p>No prediction data was returned.</p>
                </div>

                <div className="return-btn-container">
                    <button
                        className="return-btn"
                        onClick={handleBack}
                    >
                        ← Return
                    </button>
                </div>

            </div>
        );
    }

    return (
        <div className="list-page">

            <div className="page-banner">
                <h1>🌱 Crop Input Prediction</h1>
                <p>
                    AI predicted resource requirements
                </p>
            </div>

            <div className="list-card">

                <h2 className="list-title">
                    {cropInputs.cropId} - Input List
                </h2>

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="success-message">
                        ✓ {successMessage}
                    </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                    <div className="error-message">
                        ❌ {error}
                    </div>
                )}

                <table className="list-table">
                    <tbody>

                        <tr>
                            <th>Crop ID</th>
                            <td>
                                {cropInputs.cropId || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Crop Name</th>
                            <td>
                                {cropInputs.cropName || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Soil Type</th>
                            <td>
                                {cropInputs.soil || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Crop Area</th>
                            <td>
                                {cropInputs.cropArea ?? "-"} acres
                            </td>
                        </tr>

                        <tr>
                            <th>Sown Month / Year</th>
                            <td>
                                {cropInputs.sownMonthYear || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Harvest Month / Year</th>
                            <td>
                                {cropInputs.harvestMonthYear || "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Expected Yield</th>
                            <td>
                                {cropInputs.yield ?? "-"}
                            </td>
                        </tr>

                        <tr>
                            <th>Water Required</th>
                            <td>
                                {cropInputs.waterGallon ?? "-"} Gallons
                            </td>
                        </tr>

                        <tr>
                            <th>Fertilizer Required</th>
                            <td>
                                {cropInputs.fertilizer ?? "-"} kg
                            </td>
                        </tr>

                        <tr>
                            <th>Pesticides Required</th>
                            <td>
                                {cropInputs.pesticides ?? "-"} kg
                            </td>
                        </tr>

                        <tr>
                            <th>Tractor Usage</th>
                            <td>
                                {cropInputs.tractorHour ?? "-"} hours
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div className="return-btn-container">

                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "💾 Save Details"}
                    </button>

                    <button
                        className="return-btn"
                        onClick={handleBack}
                        disabled={saving}
                    >
                        ← Return
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CropInputView;