import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";

import {
  FaSeedling,
  FaTractor,
  FaSignOutAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaLeaf,
  FaArrowRight
} from "react-icons/fa";

import "./Dashboard.css";

const FarmerMenu = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="dashboard">

      {/* Background Decorations */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      {/* ================= HEADER ================= */}

      <header className="hero">

        {/* Left */}

        <div className="hero-left">

          <div className="logo">

            <div className="logo-icon">
              <FaLeaf />
            </div>

            <div className="logo-text">
              <h2>FarmVerse</h2>
              <span>Smart Farming • Better Future</span>
            </div>

          </div>

        </div>

        {/* Center */}

        <div className="hero-center">

          <h1>
            Smart Agriculture
            <br />
            Management Platform
          </h1>

          <p>
            Manage your farms, crops, expenses and reports
            from one beautiful dashboard.
          </p>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>

        {/* Right */}

        <div className="hero-right">

          <div className="hero-icon">
            🌾
          </div>

          <h2>Welcome Back 👋</h2>

          <p>
            Grow Better • Farm Smarter • Harvest More
          </p>

        </div>

      </header>

      {/* ================= DASHBOARD ================= */}

      <section className="dashboard-grid">

        {/* Farm */}

        <div className="dashboard-card farm-card">

          <div className="icon tractor">
            <FaTractor />
          </div>

          <h3>Farm Management</h3>

          <p>
            Add, update and manage your farm details easily.
          </p>

          <div className="card-buttons">

            <button
              onClick={() => navigate("/farm-entry")}
            >
              Add Farm
            </button>

            <button
              onClick={() => navigate("/farm-list")}
            >
              View Farms
            </button>

          </div>

        </div>

        {/* Crop */}

        <div className="dashboard-card crop-card">

          <div className="icon crop">
            <FaSeedling />
          </div>

          <h3>Crop Management</h3>

          <p>
            Track crops, cultivation and harvesting records.
          </p>

          <div className="card-buttons">

            <button
              onClick={() => navigate("/crop-entry")}
            >
              Add Crop
            </button>

            <button
              onClick={() => navigate("/crop-list")}
            >
              View Crops
            </button>

          </div>

        </div>

        {/* Expense */}

        <div className="dashboard-card expense-card">

          <div className="icon expense">
            <FaMoneyBillWave />
          </div>

          <h3>Expense Management</h3>

          <p>
            Record and monitor all agricultural expenses.
          </p>

          <div className="card-buttons">

            <button
              onClick={() => navigate("/expense-entry")}
            >
              Add Expense
            </button>

            <button
              onClick={() => navigate("/expense-list")}
            >
              View Expenses
            </button>

          </div>

        </div>

        {/* Reports */}

        <div className="dashboard-card report-card">

          <div className="icon report">
            <FaFileAlt />
          </div>

          <h3>Reports</h3>

          <p>
            Generate crop yield prediction and farm reports.
          </p>

          <div className="single-button">

            <button
              className="generate-btn"
              onClick={() => navigate("/report")}
            >
              Generate Report
              <FaArrowRight />
            </button>

          </div>

        </div>

      </section>
      <footer className="dashboard-footer">
        <h4>FarmVerse Dashboard</h4>
        <p>© 2026 FarmVerse. All Rights Reserved.</p>
      </footer>


    </div>
  );
};

export default FarmerMenu;