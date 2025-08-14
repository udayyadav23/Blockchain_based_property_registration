import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { id } from '../Utilities/deployedId';
import BuyerActionsABI from "../../abis/PropertyRegistry.json";
import "./BuyersPayments.css";

const CONTRACT_ADDRESS = id; // Replace

const BuyerPayments = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const instance = new web3.eth.Contract(BuyerActionsABI, CONTRACT_ADDRESS);
        setContract(instance);

        const requests = await instance.methods.getMyRequests().call({ from: accounts[0] });

        const approvedUnpaid = requests.filter(req => req.isApproved && !req.isPaid);
        const details = await Promise.all(
          approvedUnpaid.map(req =>
            instance.methods.properties(req.propertyId).call()
          )
        );

        setApprovedRequests(approvedUnpaid);
        setPropertyDetails(details);
      } else {
        alert("Please install MetaMask.");
      }
    };

    init();
  }, []);

  const handlePayment = async (propertyId) => {
    try {
      await contract.methods.makePayment(propertyId).send({
        from: account,
        value: Web3.utils.toWei("1", "ether") // You can make this dynamic if needed
      });

      alert("✅ Payment successful!");
      window.location.reload();
    } catch (error) {
      alert("❌ Transaction failed.");
      console.error(error);
    }
  };

  return (
    <div className="buyer-payment-container">
      <h1 className="payment-title">💰 Pending Payments</h1>

      {approvedRequests.length === 0 ? (
        <p className="no-payments">No approved requests to pay for.</p>
      ) : (
        <div className="payment-grid">
          {approvedRequests.map((req, index) => (
            <div key={index} className="payment-card">
              <h2>Property #{req.propertyId}</h2>
              <p><strong>Survey No:</strong> {propertyDetails[index].surveyNumber}</p>
              <p><strong>Location:</strong> {propertyDetails[index].location}</p>
              <p><strong>Area:</strong> {propertyDetails[index].area} sq.ft</p>
              <p>
                <strong>IPFS Doc:</strong>{" "}
                <a
                  href={`https://ipfs.io/ipfs/${propertyDetails[index].ipfsHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 View
                </a>
              </p>

              <button className="pay-button" onClick={() => handlePayment(req.propertyId)}>
                🚀 Proceed to Pay
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerPayments;
