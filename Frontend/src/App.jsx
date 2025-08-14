// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Components/Registration/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import RoleSelector from "./Components/Roles/RoleSelector.jsx";
import SellerDashboard from "./Components/SellerDashboard/SellerDashboard.jsx";
import RegisterProperty from "./Components/SellerDashboard/RegisterProperty.jsx";
import MyPropertiesList from "./Components/SellerDashboard/MyPropertiesList.jsx";
import BuyerDashboard from "./Components/BuyersDashboard/BuyersDashboard.jsx";
import VerifiedProperties from "./Components/BuyersDashboard/VerifiedProperties.jsx";
import SentRequests from "./Components/BuyersDashboard/SentRequests.jsx";
import BuyerPayments from "./Components/BuyersDashboard/BuyersPayments.jsx";
import MyProperties from "./Components/BuyersDashboard/MyProperties.jsx";
import VerifierDashboard from "./Components/Verifier/VerifierDashboard.jsx";
import BuyRequests from "./Components/SellerDashboard/BuyerRequest.jsx";
import Payments from "./Components/SellerDashboard/PaymentStatus.jsx";
import PropertyHistoryViewer from "./Components/Verifier/PropertyHistory.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-role" element={<RoleSelector />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/add-property" element={<RegisterProperty />} /> 
        <Route path="/show-property" element={<MyPropertiesList />} />
        <Route path="/buy-request" element={<BuyRequests  />} />
         <Route path="/payment" element={<Payments />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/verified-properties" element={<VerifiedProperties />} />
        <Route path="/purchase-request" element={<SentRequests />} />
        <Route path="/buyer-payments" element={<BuyerPayments />} />
        <Route path="/owned-properties" element={<MyProperties/>} />
        <Route path="/verifier" element={<VerifierDashboard/>} />
        <Route path="/history" element={<PropertyHistoryViewer/>} />
      </Routes>
    </Router>
  );
}

export default App;
