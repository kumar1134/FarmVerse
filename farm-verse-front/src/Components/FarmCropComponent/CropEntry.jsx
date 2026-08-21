import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCrop, generateCropId } from "../../Services/CropService";
import { getAllFarmIdsByUser } from "../../Services/FarmService";
import "../../DisplayView.css";
import MonthYearPicker from "../Common/MonthYearPicker";

import {
  FaSeedling,
  FaTractor,
  FaRulerCombined,
  FaCalendarAlt,
  FaIdCard,
  FaSave,
  FaRedo,
  FaArrowLeft
} from "react-icons/fa";

const CropEntry = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [crop, setCrop] = useState({
    cropId: "",
    farmId: "",
    cropName: "",
    cropArea: "",
    sownMonthYear: "",
    harvestMonthYear: "",
    yield: 0.0,
    username: "",
  });

  const [flag, setFlag] = useState(false);

  const [newId, setNewId] = useState("");

  const [idlist, setIdlist] = useState([]);

  const setCropId = () => {

    generateCropId()
      .then((response) => {

        setNewId(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const setFarmIds = () => {

    getAllFarmIdsByUser()
      .then((response) => {

        setIdlist(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  };

  useEffect(() => {

    setCropId();
    setFarmIds();
    setFlag(false);

  }, []);

  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setFlag(false);

    setCrop((values) => ({
      ...values,
      [name]: value
    }));

  };

  const saveCrop = (event) => {

    event.preventDefault();

    const cropData = {
      ...crop,
      cropId: newId
    };

    addCrop(cropData)
      .then(() => {

        setFlag(true);

      })
      .catch((error) => {

        console.log(error);

      });

  };

  const clearAll = () => {

    setCrop({

      cropId: newId,
      farmId: "",
      cropName: "",
      cropArea: "",
      sownMonthYear: "",
      harvestMonthYear: "",
      yield: 0.0,
      username: "",

    });

    setErrors({});
    setFlag(false);

  };

  const handleValidation = (event) => {

    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!String(crop.farmId).trim()) {

      tempErrors.farmId = "Farm ID is required";
      isValid = false;

    }

    if (!String(crop.cropName).trim()) {

      tempErrors.cropName = "Crop Name is required";
      isValid = false;

    }

    if (!String(crop.cropArea).trim()) {

      tempErrors.cropArea = "Crop Area is required";
      isValid = false;

    }

    if (!String(crop.sownMonthYear).trim()) {

      tempErrors.sownMonthYear = "Sown Month is required";
      isValid = false;

    }

    if (!String(crop.harvestMonthYear).trim()) {

      tempErrors.harvestMonthYear = "Harvest Month is required";
      isValid = false;

    }

    setErrors(tempErrors);

    if (isValid) {

      saveCrop(event);

    }

  };

  const returnBack = () => {

    navigate("/farmer-menu");

  };

  return (<div className="form-page">

    {/* ================= HEADER ================= */}

    <div className="page-header">

        <div className="page-header-content">

            <div>

                <h1>🌱 FarmVerse</h1>

                <p>Crop Management</p>

            </div>

        </div>

    </div>



    {/* ================= FORM ================= */}

    <div className="form-wrapper">

        <div className="form-card">

            <div className="form-title">

                <FaSeedling className="title-icon"/>

                <div>

                    <h2>Add New Crop</h2>

                    <p>
                        Add crop details for your selected farm.
                    </p>

                </div>

            </div>

            <form>



                {/* Crop ID */}

                <div className="form-group">

                    <label>

                        <FaIdCard className="label-icon"/>

                        Crop ID

                    </label>

                    <input

                        className="form-control readonly"

                        value={newId}

                        readOnly

                    />

                </div>



                {/* Farm ID */}

                <div className="form-group">

                    <label>

                        <FaTractor className="label-icon"/>

                        Farm ID

                    </label>

                    <select

                        name="farmId"

                        className="form-control"

                        value={crop.farmId}

                        onChange={onChangeHandler}

                    >

                        <option value="">

                            Select Farm ID

                        </option>

                        {idlist.map((farm)=>(

                            <option
                                key={farm}
                                value={farm}
                            >
                                {farm}
                            </option>

                        ))}

                    </select>

                    {errors.farmId &&

                        <p className="error-text">

                            {errors.farmId}

                        </p>

                    }

                </div>



                {/* Crop Name */}

                <div className="form-group">

                    <label>

                        <FaSeedling className="label-icon"/>

                        Crop Name

                    </label>

                    <input

                        type="text"

                        placeholder="Enter Crop Name"

                        name="cropName"

                        className="form-control"

                        value={crop.cropName}

                        onChange={onChangeHandler}

                    />

                    {errors.cropName &&

                        <p className="error-text">

                            {errors.cropName}

                        </p>

                    }

                </div>



                {/* Crop Area */}

                <div className="form-group">

                    <label>

                        <FaRulerCombined className="label-icon"/>

                        Crop Area (Acres)

                    </label>

                    <input

                        type="number"

                        placeholder="Enter Crop Area"

                        name="cropArea"

                        className="form-control"

                        value={crop.cropArea}

                        onChange={onChangeHandler}

                    />

                    {errors.cropArea &&

                        <p className="error-text">

                            {errors.cropArea}

                        </p>

                    }

                </div>



                {/* Sown Month */}

                <div className="form-group">

                    <label>

                        <FaCalendarAlt className="label-icon"/>

                        Sown Month & Year

                    </label>

                   <MonthYearPicker
    value={crop.sownMonthYear}
    onChange={(value)=>
        setCrop({
            ...crop,
            sownMonthYear:value
        })
    }
/>

                    {errors.sownMonthYear &&

                        <p className="error-text">

                            {errors.sownMonthYear}

                        </p>

                    }

                </div>



                {/* Harvest Month */}

                <div className="form-group">

                    <label>

                        <FaCalendarAlt className="label-icon"/>

                        Harvest Month & Year

                    </label>

                    <MonthYearPicker
    value={crop.harvestMonthYear}
    onChange={(value)=>
        setCrop({
            ...crop,
            harvestMonthYear:value
        })
    }
/>

                    {errors.harvestMonthYear &&

                        <p className="error-text">

                            {errors.harvestMonthYear}

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

                        Save Crop

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
                        {/* Success Message */}

            {flag && (

                <div className="success-message">

                    ✅ Crop Added Successfully

                </div>

            )}

        </div>

    </div>

</div>

);

};

export default CropEntry;