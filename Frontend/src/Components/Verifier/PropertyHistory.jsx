// src/components/PropertyHistoryViewer.jsx
import React, { useState } from "react";
import Web3 from "web3";
import { id } from '../Utilities/deployedId';
import BuyerActionsABI from "../../abis/PropertyRegistry.json";
import "./PropertyHistory.css";
import { FaSearch, FaMapMarkedAlt, FaFileAlt, FaUserShield } from "react-icons/fa";

const CONTRACT_ADDRESS = id;

const PropertyHistoryViewer = () => {
  const [propertyId, setPropertyId] = useState("");
  const [history, setHistory] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!propertyId) return;

    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const instance = new web3.eth.Contract(BuyerActionsABI, CONTRACT_ADDRESS);

      const [prop, owners] = await instance.methods.getPropertyDetailsWithHistory(propertyId).call();

      if (!prop.id || prop.id === "0") {
        alert("❌ Property not found.");
        setDetails(null);
        setHistory([]);
      } else {
        setDetails(prop);
        setHistory(owners);
      }
    } catch (err) {
      alert("Failed to fetch history. Check property ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-container">
      <h1 className="history-title">📜 Property Ownership History</h1>
      <div className="input-section">
        <input
          type="number"
          placeholder="🔍 Enter Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
        />
        <button onClick={fetchHistory}>
          <FaSearch /> Fetch
        </button>
      </div>

      {loading ? (
        <p className="status-msg">Loading...</p>
      ) : details ? (
        <div className="property-card">
          <h2>🏠 Property #{details.id}</h2>
          <p><FaMapMarkedAlt /> <strong>Survey No:</strong> {details.surveyNumber}</p>
          <p><FaMapMarkedAlt /> <strong>Location:</strong> {details.location}</p>
          <p><FaMapMarkedAlt /> <strong>Area:</strong> {details.area} sq.ft</p>
          <p><FaUserShield /> <strong>Current Owner:</strong> {details.currentOwner}</p>
          <a
            href={`https://ipfs.io/ipfs/${details.ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link"
          >
            <FaFileAlt /> View Property Document
          </a>

          <div className="history-list">
            <h3>🧾 Ownership Transfers:</h3>
            {history.length === 0 ? (
              <p className="no-transfers">No transfers yet.</p>
            ) : (
              <ol>
                {history.map((owner, idx) => (
                  <li key={idx}>{owner}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PropertyHistoryViewer;
