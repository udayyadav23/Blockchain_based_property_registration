import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { id } from '../Utilities/deployedId';
import PropertyRegistryABI from "../../abis/PropertyRegistry.json";
import "./MyPropertiesList.css";

function MyPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();
          setAccount(userAddress);
          console.log('Connected account:', userAddress);
          // Manually set your contract address here
          const contractAddress = id;
          const contract = new Contract(
            contractAddress,
            PropertyRegistryABI,
            signer // Use signer so msg.sender is correct
          );

          // Get only the properties owned by the connected user
          let myProps = await contract.getMyProperties();
          console.log('myProps (raw):', myProps);
          if (!Array.isArray(myProps)) {
            // If ethers returns an object with numeric keys, convert to array
            if (typeof myProps === 'object' && myProps !== null) {
              myProps = Object.values(myProps);
              console.log('Converted myProps to array:', myProps);
            } else {
              alert('getMyProperties did not return an array. Check contract address and ABI.');
              setProperties([]);
              return;
            }
          }
          // Debug: Show all returned properties in the UI for troubleshooting
          setProperties(myProps);
        } catch (err) {
          console.error('Error loading properties:', err);
          alert('Error loading properties: ' + (err?.message || err));
          setProperties([]);
        }
      }
    };

    loadProperties();
  }, []);

  // Add a function to list a property for sale
  const listForSale = async (propertyId) => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractAddress = id;
      const contract = new Contract(
        contractAddress,
        PropertyRegistryABI,
        signer
      );
      try {
        await contract.listPropertyForSale(propertyId);
        // Refresh the property list after listing
        // Call loadProperties again to update the UI
        let myProps = await contract.getMyProperties();
        setProperties(myProps);
      } catch (err) {
        alert("Failed to list property: " + (err?.message || err));
      }
    }
  };

  return (
    <div className="my-properties-container">
      <h2 className="page-title">🏠 My Properties</h2>
      <div className="properties-grid">
        {properties.length === 0 ? (
          <>
            <p>No properties found for this account.</p>
            <pre style={{color: 'red', fontSize: '0.9em'}}>Debug: {JSON.stringify(properties, null, 2)}</pre>
          </>
        ) : (
          properties.map((property, idx) => (
            <div className="property-card" key={property.id || idx}>
              <h4>Survey Number: {property.surveyNumber}</h4>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Area:</strong> {property.area} sq.ft</p>
              <p><strong>Current Owner:</strong> {property.currentOwner}</p>
              <p style={{color: 'red'}}><strong>Debug userAddress:</strong> {account}</p>
              <p><strong>IPFS Hash:</strong> {property.ipfsHash}</p>
              <p><strong>Is Verified:</strong> {property.isVerified ? <span className="badge verified">Verified</span> : <span className="badge not-verified">Not Verified</span>}</p>
              <p><strong>Is Listed:</strong> {property.isListed ? "Yes" : "No"}</p>
              <p>
                <strong>Docs:</strong>{" "}
                <a href={`https://ipfs.io/ipfs/${property.ipfsHash}`} target="_blank" rel="noreferrer">
                  View IPFS
                </a>
              </p>
              {/* Show List for Sale button if not listed and verified */}
              {!property.isListed && property.isVerified && (
                <button className="list-btn" onClick={() => listForSale(property.id)}>
                  List for Sale
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPropertiesList;
