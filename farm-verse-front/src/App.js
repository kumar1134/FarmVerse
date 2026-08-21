import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import FarmerMenu from "./Components/LoginComponent/FarmerMenu";
import FarmEntry from "./Components/FarmCropComponent/FarmEntry";
import CropEntry from "./Components/FarmCropComponent/CropEntry";
 import FarmList from "./Components/FarmCropComponent/FarmList";
 import CropList from "./Components/FarmCropComponent/CropList";
 import FarmCropReport from "./Components/FarmCropComponent/FarmCropReport";
 import Report from "./Components/ReportComponent/Report";
 import ExpenseList from "./Components/ExpenseComponent/ExpenseList";
 import ExpenseEntry from "./Components/ExpenseComponent/ExpenseEntry";
 import CropInputView from "./Components/ExpenseComponent/CropInputView";
 import FarmCropExpense from "./Components/ExpenseComponent/FarmCropExpense";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/farmer-menu" element={<FarmerMenu />} />
          <Route path="/farm-entry" element={<FarmEntry />} />
          <Route path="/crop-entry" element={<CropEntry />} />
          <Route path="/farm-list" element={<FarmList />} />
          <Route path="/crop-list" element={<CropList />} />
          <Route path="/crop-report/:cid" element={<FarmCropReport />} />
          <Route path="/report" element={<Report />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/expense-entry" element={<ExpenseEntry />} />
          <Route path="/crop-input/:id" element={<CropInputView />} />
          <Route path="/farm-crop-expense/:cid" element={<FarmCropExpense />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
 