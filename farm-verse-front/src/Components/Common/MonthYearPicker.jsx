import React, { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MonthYearPicker.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MonthYearPicker = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const arr = value.split(" ");

      if (arr.length === 2) {
        setSelectedMonth(arr[0]);
        setSelectedYear(parseInt(arr[1]));
      }
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const previousYear = () => {
    setSelectedYear((year) => year - 1);
  };

  const nextYear = () => {
    setSelectedYear((year) => year + 1);
  };

  const selectMonth = (month) => {
    setSelectedMonth(month);
    onChange(`${month} ${selectedYear}`);
    setShowPicker(false);
  };

  return (
    <div className="month-picker" ref={pickerRef}>
      <div
        className="picker-input"
        onClick={() => setShowPicker(!showPicker)}
      >
        <span>
          {selectedMonth
            ? `${selectedMonth} ${selectedYear}`
            : "Select Month & Year"}
        </span>

        <FaCalendarAlt />
      </div>
            {showPicker && (
        <div className="picker-popup">

          <div className="picker-header">

            <button
              type="button"
              className="year-btn"
              onClick={previousYear}
            >
              <FaChevronLeft />
            </button>

            <span className="year-title">
              {selectedYear}
            </span>

            <button
              type="button"
              className="year-btn"
              onClick={nextYear}
            >
              <FaChevronRight />
            </button>

          </div>

          <div className="month-grid">

            {months.map((month) => (

              <button
                key={month}
                type="button"
                className={
                  selectedMonth === month
                    ? "month-btn active-month"
                    : "month-btn"
                }
                onClick={() => selectMonth(month)}
              >
                {month}
              </button>

            ))}

          </div>

        </div>
      )}
          </div>
  );
};

export default MonthYearPicker;