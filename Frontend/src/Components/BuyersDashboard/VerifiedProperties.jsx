import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { id } from '../Utilities/deployedId';
import BuyerActionsABI from "../../abis/PropertyRegistry.json"; // ✅ Your ABI path
import "./VerifiedProperties.css";

const CONTRACT_ADDRESS = id; // ✅ Replace with actual address

const VerifiedProperties = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [verifiedProperties, setVerifiedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState({});

  // Connect to MetaMask and initialize contract
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(BuyerActionsABI, CONTRACT_ADDRESS);
        setContract(instance);

        loadVerifiedProperties(instance);
      } else {
        alert("Please install MetaMask to use this dApp");
      }
    };

    init();
  }, []);

  // Load verified and listed properties
  const loadVerifiedProperties = async (contractInstance) => {
    setLoading(true);
    try {
      const allProps = await contractInstance.methods.getAllProperties().call();
      const filtered = allProps.filter(p => p.isVerified && p.isListed);
      setVerifiedProperties(filtered);
    } catch (err) {
      console.error("Error loading properties:", err);
    }
    setLoading(false);
  };

  // Send Purchase Request
  const handleSendRequest = async (propertyId) => {
    try {
      await contract.methods.sendPurchaseRequest(propertyId).send({ from: account });
      setSentRequests(prev => ({ ...prev, [propertyId]: true }));
      alert(`Request sent for property ID ${propertyId}`);
    } catch (err) {
      console.error("Request failed:", err);
      alert("Failed to send request. You might have already sent one.");
    }
  };

  return (
    <div className="verified-properties-container">
      <h1 className="verified-title">🏠 Verified Properties</h1>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <div className="properties-grid">
          {verifiedProperties.length === 0 ? (
            <p>No verified properties found.</p>
          ) : (
            verifiedProperties.map((property) => (
              <div key={property.id} className="property-card">
                <h2>Property #{property.id}</h2>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Survey No:</strong> {property.surveyNumber}</p>
                <p><strong>Area:</strong> {property.area} sq.ft</p>
                <a href={`https://ipfs.io/ipfs/${property.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                  📄 View Documents
                </a>
                <button
                  className="send-request-btn"
                  onClick={() => handleSendRequest(property.id)}
                  disabled={sentRequests[property.id]}
                >
                  {sentRequests[property.id] ? "Request Sent" : "Send Purchase Request"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VerifiedProperties;
