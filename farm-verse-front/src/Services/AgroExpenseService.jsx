import axios from "axios";

const BASE_URL = "http://localhost:9696/farmverse";

// ================= GET ALL =================

export function getAllAgroExpenses() {
    return axios.get(`${BASE_URL}/agroexpense`, {
        withCredentials: true,
    });
}

// ================= GET BY ID =================

export function getAgroExpenseById(expenseId) {
    return axios.get(`${BASE_URL}/exp/${expenseId}`, {
        withCredentials: true,
    });
}

// ================= ADD =================

export function addAgroExpense(agroExpense) {
    return axios.post(`${BASE_URL}/exp`, agroExpense, {
        withCredentials: true,
    });
}

// ================= UPDATE =================

export function updateAgroExpense(agroExpense) {
    return axios.put(`${BASE_URL}/exp`, agroExpense, {
        withCredentials: true,
    });
}

// ================= DELETE =================

export function deleteAgroExpense(expenseId) {
    return axios.delete(`${BASE_URL}/exp/${expenseId}`, {
        withCredentials: true,
    });
}

// ================= GENERATE ID =================

export function generateExpenseId() {
    return axios.get(`${BASE_URL}/exp-id`, {
        withCredentials: true,
    });
}