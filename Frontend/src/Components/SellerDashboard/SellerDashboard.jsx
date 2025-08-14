import React from 'react';
import './SellerDashboard.css';
import { id } from '../Utilities/deployedId';
import { FaPlus, FaListAlt, FaHandshake, FaEthereum } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-dashboard-container">
      <h1 className="dashboard-title">🏡 Seller Dashboard</h1>

      <div className="dashboard-grid">
        {/* Add Property */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/add-property")}
        >
          <FaPlus className="dashboard-icon" />
          <h2>Add New Property</h2>
          <p>Submit your property details and documents to list for sale.</p>
        </div>

        {/* My Properties */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/show-property")}
        >
          <FaListAlt className="dashboard-icon" />
          <h2>My Properties</h2>
          <p>View and manage all properties you've listed.</p>
        </div>

        {/* Buyer Requests */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/buy-request")}
        >
          <FaHandshake className="dashboard-icon" />
          <h2>Buyer Requests</h2>
          <p>See and respond to requests from interested buyers.</p>
        </div>

        {/* Payments & Transfers */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/payment")}
        >
          <FaEthereum className="dashboard-icon" />
          <h2>Payments & Transfers</h2>
          <p>Monitor Ether payments and transfer ownership securely.</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
