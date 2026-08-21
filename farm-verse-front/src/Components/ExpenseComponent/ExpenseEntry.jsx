import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addAgroExpense,
  generateExpenseId,
} from "../../Services/AgroExpenseService";
import "../../DisplayView.css";

import {
  FaMoneyBillWave,
  FaIdCard,
  FaTag,
  FaBalanceScale,
  FaSave,
  FaRedo,
  FaArrowLeft,
} from "react-icons/fa";

function ExpenseEntry() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [expense, setExpense] = useState({
    expenseId: "",
    expenseName: "",
    unitName: "",
    ratePerUnit: "",
  });

  useEffect(() => {
    loadExpenseId();
  }, []);

  const loadExpenseId = () => {
    generateExpenseId()
      .then((response) => {
        setExpense((prev) => ({
          ...prev,
          expenseId: response.data,
        }));
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAgroExpense(expense)
      .then(() => {
        setMessage("Expense Added Successfully");

        setTimeout(() => {
          navigate("/expense-list");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to Add Expense");
      });
  };

  const handleReset = () => {
    setExpense({
      expenseId: expense.expenseId,
      expenseName: "",
      unitName: "",
      ratePerUnit: "",
    });

    setMessage("");
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1>🌱 FarmVerse</h1>
            <p>Agro Expense Management</p>
          </div>
        </div>
      </div>

      <div className="form-wrapper">
        <div className="form-card">

          <div className="form-title">
            <FaMoneyBillWave className="title-icon expense-icon" />
            <div>
              <h2>Add New Expense</h2>
              <p>Add agro expense details.</p>
            </div>
          </div>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>
                <FaIdCard className="label-icon" />
                Expense ID
              </label>

              <input
                type="text"
                className="form-control readonly"
                value={expense.expenseId}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>
                <FaTag className="label-icon" />
                Expense Name
              </label>

              <input
                type="text"
                name="expenseName"
                className="form-control"
                value={expense.expenseName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaBalanceScale className="label-icon" />
                Unit
              </label>

              <input
                type="text"
                name="unitName"
                className="form-control"
                value={expense.unitName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaMoneyBillWave className="label-icon" />
                Rate Per Unit (₹)
              </label>

              <input
                type="number"
                step="0.01"
                name="ratePerUnit"
                className="form-control"
                value={expense.ratePerUnit}
                onChange={handleChange}
                required
              />
            </div>

     <div className="form-buttons">

<button
type="submit"
style={{
    background:"#2e7d32",
    color:"#fff",
    width:"160px",
    height:"52px",
    border:"none",
    borderRadius:"10px",
    fontSize:"16px",
    fontWeight:"600",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:"10px",
    cursor:"pointer"
}}
>
<FaSave />
Save
</button>


<button
type="button"
onClick={handleReset}
style={{
    background:"#fff",
    color:"#2e7d32",
    width:"160px",
    height:"52px",
    border:"1px solid #2e7d32",
    borderRadius:"10px",
    fontSize:"16px",
    fontWeight:"600",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:"10px",
    cursor:"pointer"
}}
>
<FaRedo />
Reset
</button>


<button
type="button"
onClick={() => navigate("/farmer-menu")}
style={{
    background:"#fff",
    color:"#2e7d32",
    width:"160px",
    height:"52px",
    border:"1px solid #2e7d32",
    borderRadius:"10px",
    fontSize:"16px",
    fontWeight:"600",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:"10px",
    cursor:"pointer"
}}
>
<FaArrowLeft />
Dashboard
</button>

</div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ExpenseEntry;