import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { id } from '../Utilities/deployedId';
import { BrowserProvider, Contract } from "ethers";
import PropertyRegistryABI from "../../abis/PropertyRegistry.json";
import "./RegisterProperty.css"; // Make sure this CSS file is created

const CONTRACT_ADDRESS = id; // Replace with your deployed contract address

const RegisterProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    surveyNumber: "",
    area: "",
    location: "",
    city: "",
    state: "",
    price: "",
    type: "",
  });

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [wallet, setWallet] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const connectWallet = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address);
    return { provider, signer };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a property document.");
      return;
    }
    try {
     // setStatus("📤 Uploading file to IPFS...");
    // const data = new FormData();
    // data.append("file", file);
    // const ipfsRes = await axios.post("http://localhost:8082/upload", data);
    // const ipfsHash = ipfsRes.data;

    // ✅ Using dummy hash instead of actual IPFS upload
    const ipfsHash = "QmDummyHash1234567890abcdef";

    setStatus("🔗 Connecting to MetaMask...");
    const { signer, provider } = await connectWallet();
    const contract = new Contract(CONTRACT_ADDRESS, PropertyRegistryABI, signer);

    setStatus("📝 Sending property to blockchain...");
    const tx = await contract.addPropertyAsVerified(
      form.surveyNumber,
      parseInt(form.area),
      form.location,
      ipfsHash
    );
    await tx.wait();

    setStatus("✅ Property registered on-chain!");
      // Fetch and log the property from the contract for verification
      try {
        const nextPropertyId = await contract.nextPropertyId();
        const propertyId = Number(nextPropertyId) - 1;
        const property = await contract.getProperty(propertyId);
        console.log("Fetched property from contract:", property);
      } catch (fetchErr) {
        console.error("Error fetching property from contract:", fetchErr);
      }
      // Reset form and file after success
      setForm({
        surveyNumber: "",
        area: "",
        location: "",
        city: "",
        state: "",
        price: "",
        type: "",
      });
      setFile(null);
      // Optionally reset file input value
      if (document.getElementById('property-file-input')) {
        document.getElementById('property-file-input').value = "";
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="register-form-wrapper">
      <button className="back-btn" style={{marginBottom: 16}} onClick={() => navigate("/seller")}>← Back to Dashboard</button>
      <form onSubmit={handleSubmit} className="register-form">
        <h2>🏠 Register New Property</h2>

        <input name="surveyNumber" placeholder="Survey Number" value={form.surveyNumber} onChange={handleChange} required className="input-field" />
        <input name="area" type="number" placeholder="Area (sq ft)" value={form.area} onChange={handleChange} required className="input-field" />
        <input name="location" placeholder="Full Location" value={form.location} onChange={handleChange} required className="input-field" />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required className="input-field" />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} required className="input-field" />
        <input name="price" type="number" placeholder="Price (ETH)" value={form.price} onChange={handleChange} required className="input-field" />

        <select name="type" value={form.type} onChange={handleChange} required className="input-field">
          <option value="">Select Property Type</option>
          <option value="Land">Land</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
        </select>

        <input id="property-file-input" type="file" accept="application/pdf,image/*" onChange={handleFileChange} required className="file-upload" />

        <button type="submit" className="submit-btn">Submit to Blockchain</button>

        {status && <p className="status-text">{status}</p>}
      </form>
    </div>
  );
};

export default RegisterProperty;
