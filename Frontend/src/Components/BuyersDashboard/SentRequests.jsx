import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { id } from '../Utilities/deployedId';
import BuyerActionsABI from "../../abis/PropertyRegistry.json";
import "./SentRequests.css";

const CONTRACT_ADDRESS = id; // Replace this

const SentRequests = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [requests, setRequests] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Connect MetaMask and fetch data
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(BuyerActionsABI, CONTRACT_ADDRESS);
        setContract(instance);

        const userRequests = await instance.methods.getMyRequests().call({ from: accounts[0] });

        const props = await Promise.all(
          userRequests.map(req => instance.methods.properties(req.propertyId).call())
        );

        setRequests(userRequests);
        setPropertyDetails(props);
        setLoading(false);
      } else {
        alert("Install MetaMask to use this DApp");
      }
    };

    init();
  }, []);

  return (
    <div className="sent-requests-container">
      <h1 className="sent-title">📨 Sent Purchase Requests</h1>

      {loading ? (
        <p className="loading-text">Loading your requests...</p>
      ) : requests.length === 0 ? (
        <p className="loading-text">You haven’t sent any purchase requests yet.</p>
      ) : (
        <div className="request-grid">
          {requests.map((req, index) => (
            <div key={index} className="request-card">
              <h2>Property #{req.propertyId}</h2>
              <p><strong>Survey No:</strong> {propertyDetails[index].surveyNumber}</p>
              <p><strong>Location:</strong> {propertyDetails[index].location}</p>
              <p><strong>Area:</strong> {propertyDetails[index].area} sq.ft</p>
              <p>
                <strong>IPFS Document:</strong>{" "}
                <a
                  href={`https://ipfs.io/ipfs/${propertyDetails[index].ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View
                </a>
              </p>
              <div className="status-badge">
                {req.isPaid ? (
                  <span className="paid">✅ Payment Completed</span>
                ) : req.isApproved ? (
                  <span className="approved">🟢 Approved - Awaiting Payment</span>
                ) : (
                  <span className="pending">🕒 Waiting for Approval</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SentRequests;
