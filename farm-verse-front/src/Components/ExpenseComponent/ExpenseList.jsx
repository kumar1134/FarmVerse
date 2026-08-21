import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllAgroExpenses,
  deleteAgroExpense,
} from "../../Services/AgroExpenseService";
import "../../DisplayView.css";

function ExpenseList() {

  const [expenseList, setExpenseList] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {

    getAllAgroExpenses()
      .then((response) => {
        setExpenseList(response.data);
      })
      .catch((error) => {
        console.error("Error loading expenses:", error);
      });

  };


  const handleDelete = (expenseId) => {

  deleteAgroExpense(expenseId)

    .then(() => {

      setMessage("Expense deleted successfully.");

      loadExpenses();

      setTimeout(() => {
        setMessage("");
      }, 3000);

    })

    .catch((error) => {

      console.error("Error deleting expense:", error);

      setMessage("Unable to delete expense.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    });

};

  


  return (

    <div className="list-page">

      <div className="list-card">

        <h2 className="list-title">
          Expense Item List
        </h2>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <table className="list-table">

          <thead>

            <tr>
              <th>Expense Id</th>
              <th>Expense Name</th>
              <th>Unit</th>
              <th>Cost Per Unit (Rs)</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {expenseList.length > 0 ? (

              expenseList.map((expense) => (

                <tr key={expense.expenseId}>

                  <td>{expense.expenseId}</td>

                  <td>{expense.expenseName}</td>

                  <td>{expense.unitName}</td>

                  <td>₹ {expense.ratePerUnit}</td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(expense.expenseId)}
                      >
                        Delete Item
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="5">
                  No Expense Items Found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

        <div className="return-btn-container">

          <button
            className="return-btn"
            onClick={() => navigate("/farmer-menu")}
          >
            Return
          </button>

        </div>

      </div>

    </div>

  );

}

export default ExpenseList;