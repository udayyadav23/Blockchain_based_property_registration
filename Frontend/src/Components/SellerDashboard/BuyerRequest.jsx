import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { id } from '../Utilities/deployedId';
import PropertyRegistryABI from "../../abis/PropertyRegistry.json";
import "./BuyerRequest.css";

const CONTRACT_ADDRESS = id; // 🔁 Replace this

const BuyRequests = () => {
  const [properties, setProperties] = useState([]);
  const [requestsMap, setRequestsMap] = useState({});
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, PropertyRegistryABI, signer);

        // Fetch seller's properties
        const myProps = await contract.getMyProperties();

        setProperties(myProps);

        // For each property, fetch requests
        const requests = {};
        for (let prop of myProps) {
          const reqs = await contract.getRequestsForProperty(prop.id);
          requests[prop.id] = reqs;
        }

        setRequestsMap(requests);
      } else {
        alert("Please install MetaMask");
      }
    };

    loadData();
  }, []);

  const approveRequest = async (propertyId, buyerAddress) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PropertyRegistryABI, signer);
    try {
      const tx = await contract.approveRequest(propertyId, buyerAddress);
      await tx.wait();
      alert("Request Approved!");
      window.location.reload(); // Refresh to update status
    } catch (err) {
      alert("Approval failed: " + err.message);
    }
  };

  return (
    <div className="buy-requests-container">
      <h1 className="page-title">📨 Buyer Requests Received</h1>
      {properties.length === 0 ? (
        <p className="no-props">You have not added any properties.</p>
      ) : (
        properties.map((prop, index) => (
          <div className="property-card" key={index}>
            <h2>🏡 Property #{prop.id}</h2>
            <p><strong>Survey No:</strong> {prop.surveyNumber}</p>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Area:</strong> {parseInt(prop.area)} sq.ft</p>
            <a
              href={`https://ipfs.io/ipfs/${prop.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ipfs-link"
            >
              📄 View Documents
            </a>

            <div className="requests-section">
              {requestsMap[prop.id] && requestsMap[prop.id].length > 0 ? (
                requestsMap[prop.id].map((req, rIdx) => (
                  <div key={rIdx} className="request-box">
                    <p><strong>Buyer:</strong> {req.buyer}</p>
                    <p><strong>Status:</strong>{" "}
                      {req.isPaid ? (
                        <span className="sold">✅ Payment Completed – SOLD</span>
                      ) : req.isApproved ? (
                        <span className="approved">🟢 Approved – Awaiting Payment</span>
                      ) : (
                        <span className="pending">🕒 Waiting for Approval</span>
                      )}
                    </p>

                    {!req.isApproved && !req.isPaid && (
                      <button
                        className="approve-btn"
                        onClick={() => approveRequest(prop.id, req.buyer)}
                      >
                        ✅ Approve Request
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-reqs">No buyer requests yet.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyRequests;
