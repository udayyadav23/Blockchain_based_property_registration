import React from "react";
import { useNavigate } from "react-router-dom";
import "./BuyersDashboard.css";

const BuyerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="buyer-dashboard">
      <h1>🏡 Buyer Dashboard</h1>
      <div className="dashboard-card-grid">
        <div className="dashboard-card" onClick={() => navigate("/verified-properties")}>
          <h2>✅ Verified Properties</h2>
          <p>View all verified properties available for purchase.</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/purchase-request")}>
          <h2>📋 My Requests</h2>
          <p>Check the status of your property purchase requests.</p>
        </div>


        <div className="dashboard-card" onClick={() => navigate("/buyer-payments")}>
          <h2>💸 Make Payment</h2>
          <p>Complete payment after seller accepts your request.</p>
        </div>

  
      </div>

      <div className="dashboard-card-grid second-row">
        <div className="dashboard-card" onClick={() => navigate("/owned-properties")}>
          <h2>🏠 My Properties</h2>
          <p>View and manage the properties you currently own.</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
