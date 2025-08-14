import React, { useEffect, useState } from "react";
import Web3 from "web3";
import BuyerActionsABI from "../../abis/PropertyRegistry.json";
import "./VerifierDashboard.css";
import { id } from '../Utilities/deployedId';
import { FaCheckCircle, FaSearchLocation, FaFileAlt, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CONTRACT_ADDRESS = id;

const VerifierDashboard = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [unverifiedProperties, setUnverifiedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const instance = new web3.eth.Contract(BuyerActionsABI, CONTRACT_ADDRESS);
      setContract(instance);

      const total = await instance.methods.nextPropertyId().call();
      const props = [];

      for (let i = 1; i < total; i++) {
        const property = await instance.methods.properties(i).call();
        if (!property.isVerified) {
          props.push(property);
        }
      }

      setUnverifiedProperties(props);
      setLoading(false);
    };

    init();
  }, []);

  const handleVerify = async (id) => {
    try {
      await contract.methods.verifyProperty(id).send({ from: account });
      alert(`✅ Property #${id} verified!`);
      setUnverifiedProperties((prev) => prev.filter((p) => parseInt(p.id) !== parseInt(id)));
    } catch (error) {
      alert("❌ Verification failed. Are you the contract verifier?");
      console.error(error);
    }
  };

  const goToHistory = () => {
    navigate("/history");
  };

  return (
    <div className="verifier-dashboard">
      <div className="verifier-header">
        <h1>🛡️ Verifier Panel</h1>
        <button className="history-button" onClick={goToHistory}>
          <FaHistory /> Search Ownership History
        </button>
      </div>

      {loading ? (
        <p className="loading-text">Loading unverified properties...</p>
      ) : unverifiedProperties.length === 0 ? (
        <p className="empty-text">🎉 No properties waiting for verification.</p>
      ) : (
        <div className="verifier-grid">
          {unverifiedProperties.map((property, index) => (
            <div key={index} className="verifier-card">
              <FaSearchLocation className="icon" />
              <h2>🏠 Property #{property.id}</h2>
              <p><strong>Survey No:</strong> {property.surveyNumber}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Area:</strong> {property.area} sq.ft</p>
              <p>
                <strong>Document:</strong>{" "}
                <a
                  href={`https://ipfs.io/ipfs/${property.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ipfs-link"
                >
                  <FaFileAlt /> View
                </a>
              </p>
              <button className="verify-button" onClick={() => handleVerify(property.id)}>
                <FaCheckCircle /> Verify & List
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifierDashboard;
