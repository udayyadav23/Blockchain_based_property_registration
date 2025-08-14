import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./MyProperties.css";
import { id } from '../Utilities/deployedId';
import { FaHome, FaFileContract, FaUser } from "react-icons/fa";
import BuyerActionsABI from "../../abis/PropertyRegistry.json";

const CONTRACT_ADDRESS = id;

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  const fetchMyProperties = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, BuyerActionsABI, signer);

      try {
        const result = await contract.getOwnedProperties();
        setProperties(result);
      } catch (error) {
        console.error("Error fetching owned properties:", error);
      }
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return (
    <div className="buyer-dashboard-container">
      <h1 className="dashboard-title">🏠 Owned Properties</h1>

      <div className="dashboard-grid">
        {properties.length === 0 ? (
          <div className="dashboard-card no-properties">
            <FaHome className="dashboard-icon" />
            <h2>No Properties Yet</h2>
            <p>You haven't purchased any properties yet.</p>
          </div>
        ) : (
          properties.map((property, index) => (
            <div key={index} className="dashboard-card property-card">
              <FaHome className="dashboard-icon" />
              <h2>{property.location}</h2>
              <p><strong>Survey Number:</strong> {property.surveyNumber}</p>
              <p><strong>Area:</strong> {parseInt(property.area)} sq.ft</p>
              <p><strong>Property ID:</strong> {parseInt(property.id)}</p>
              <p><strong>Listed:</strong> {property.isListed ? "Yes" : "No"}</p>
              <p><strong>Verified:</strong> {property.isVerified ? "Yes" : "No"}</p>
              <p><strong>Current Owner:</strong></p>
              <p className="mono-text">{property.currentOwner}</p>
              <p><strong>IPFS Document:</strong></p>
              <a
                href={`https://ipfs.io/ipfs/${property.ipfsHash}`}
                target="_blank"
                rel="noreferrer"
                className="document-link mono-text"
              >
                {property.ipfsHash.substring(0, 12)}... 📄
              </a>
              <div className="status success">✅ Verified & Paid</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProperties;
