import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { id } from '../Utilities/deployedId';
import PropertyRegistryABI from "../../abis/PropertyRegistry.json";
import "./PaymentStatus.css";

const CONTRACT_ADDRESS = id; // Your contract

const Payments = () => {
  const [soldProperties, setSoldProperties] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadSoldProperties = async () => {
      if (!window.ethereum) return alert("Install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, PropertyRegistryABI, signer);
      const allProps = await contract.getAllProperties();

      const sold = [];

      for (const p of allProps) {
        const [property, owners] = await contract.getPropertyDetailsWithHistory(p.id);

        if (
          owners.length >= 2 &&
          owners[owners.length - 2].toLowerCase() === address.toLowerCase()
        ) {
          sold.push({
            id: property.id.toString(),
            surveyNumber: property.surveyNumber,
            location: property.location,
            area: Number(property.area),
            ipfsHash: property.ipfsHash,
            buyer: owners[owners.length - 1],
            seller: owners[owners.length - 2],
          });
        }
      }

      setSoldProperties(sold);
    };

    loadSoldProperties();
  }, []);

  return (
    <div className="payments-container">
      <h1>💼 Properties You Sold</h1>
      {soldProperties.length === 0 ? (
        <p>No properties sold yet.</p>
      ) : (
        soldProperties.map((prop, idx) => (
          <div className="payment-card" key={idx}>
            <h3>🏠 Property #{prop.id}</h3>
            <p><strong>Survey No:</strong> {prop.surveyNumber}</p>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Area:</strong> {prop.area} sq.ft</p>
            <p><strong>New Owner (Buyer):</strong> {prop.buyer}</p>
            <p><strong>Transferred From (You):</strong> {prop.seller}</p>
            <p>
              <strong>Documents:</strong>{" "}
              <a href={`https://ipfs.io/ipfs/${prop.ipfsHash}`} target="_blank" rel="noreferrer">
                📄 View IPFS
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Payments;
