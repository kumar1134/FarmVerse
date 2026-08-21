import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addFarm, generateFarmId } from "../../Services/FarmService";
import "../../DisplayView.css";

import {
  FaTractor,
  FaSeedling,
  FaRulerCombined,
  FaIdCard,
  FaArrowLeft,
  FaSave,
  FaRedo
} from "react-icons/fa";

const FarmEntry = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [farm, setFarm] = useState({
    farmId: 0,
    farmName: "",
    area: "",
    soil: "",
    username: "abcd",
  });

  const [flag, setFlag] = useState(false);

  const [newId, setNewId] = useState(0);

  const setFarmId = () => {

    generateFarmId()
      .then((response) => {

        setNewId(response.data);

      });

  };

  useEffect(() => {

    setFarmId();
    setFlag(false);

  }, []);

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setFlag(false);

    setFarm((values) => ({
      ...values,
      [name]: value
    }));

  };

  const saveFarm = (event) => {

    event.preventDefault();

    const farmData = {
      ...farm,
      farmId: newId
    };

    addFarm(farmData)
      .then(() => {

        setFlag(true);

      });

  };

  const clearAll = () => {

    setFarm({
      farmId: 0,
      farmName: "",
      area: "",
      soil: "",
      username: "abcd",
    });

    setErrors({});
    setFlag(false);

  };

  const handleValidation = (event) => {

    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!farm.farmName.trim()) {

      tempErrors.farmName = "Farm Name is required";
      isValid = false;

    }

    if (!String(farm.area).trim()) {

      tempErrors.area = "Farm Area is required";
      isValid = false;

    }

    if (!farm.soil.trim()) {

      tempErrors.soil = "Soil Type is required";
      isValid = false;

    }

    setErrors(tempErrors);

    if (isValid) {

      saveFarm(event);

    }

  };

  const returnBack = () => {

    navigate("/farmer-menu");

  };

  return (<div className="form-page">

    {/* Top Header */}

    <div className="page-header">

        <div className="page-header-content">

            <div>

                <h1>🌱 FarmVerse</h1>

                <p>Farm Management</p>

            </div>

        </div>

    </div>



    {/* Form Section */}

    <div className="form-wrapper">

        <div className="form-card">

            <div className="form-title">

                <FaSeedling className="title-icon"/>

                <div>

                    <h2>Add New Farm</h2>

                    <p>
                        Enter your farm information to start managing crops.
                    </p>

                </div>

            </div>



            <form>



                {/* Farm ID */}

                <div className="form-group">

                    <label>

                        <FaIdCard className="label-icon"/>

                        Farm ID

                    </label>

                    <input

                        className="form-control readonly"

                        value={newId}

                        readOnly

                    />

                </div>



                {/* Farm Name */}

                <div className="form-group">

                    <label>

                        <FaTractor className="label-icon"/>

                        Farm Name

                    </label>

                    <input

                        type="text"

                        placeholder="Enter Farm Name"

                        name="farmName"

                        className="form-control"

                        value={farm.farmName}

                        onChange={onChangeHandler}

                    />

                    {errors.farmName &&

                        <p className="error-text">

                            {errors.farmName}

                        </p>

                    }

                </div>



                {/* Farm Area */}

                <div className="form-group">

                    <label>

                        <FaRulerCombined className="label-icon"/>

                        Farm Area (Acres)

                    </label>

                    <input

                        type="number"

                        placeholder="Enter Farm Area"

                        name="area"

                        className="form-control"

                        value={farm.area}

                        onChange={onChangeHandler}

                    />

                    {errors.area &&

                        <p className="error-text">

                            {errors.area}

                        </p>

                    }

                </div>



                {/* Soil */}

                <div className="form-group">

                    <label>

                        <FaSeedling className="label-icon"/>

                        Soil Type

                    </label>

                    <select

                        name="soil"

                        className="form-control"

                        value={farm.soil}

                        onChange={onChangeHandler}

                    >

                        <option value="">

                            Select Soil Type

                        </option>

                        <option value="Alluvial">

                            Alluvial

                        </option>

                        <option value="Black">

                            Black

                        </option>

                        <option value="Red">

                            Red

                        </option>

                        <option value="Laterite">

                            Laterite

                        </option>

                        <option value="Peaty and Marshy">

                            Peaty and Marshy

                        </option>

                    </select>

                    {errors.soil &&

                        <p className="error-text">

                            {errors.soil}

                        </p>

                    }

                </div>



                {/* Buttons */}

                <div className="form-buttons">

                    <button

                        className="primary-btn"

                        onClick={handleValidation}

                    >

                        <FaSave/>

                        &nbsp;

                        Save Farm

                    </button>



                    <button

                        type="button"

                        className="secondary-btn"

                        onClick={clearAll}

                    >

                        <FaRedo/>

                        &nbsp;

                        Reset

                    </button>



                    <button

                        type="button"

                        className="secondary-btn"

                        onClick={returnBack}

                    >

                        <FaArrowLeft/>

                        &nbsp;

                        Dashboard

                    </button>

                </div>

            </form>



            {flag &&

                <div className="success-message">

                    ✅ Farm Added Successfully

                </div>

            }

        </div>

    </div>

</div>

);

};

export default FarmEntry;