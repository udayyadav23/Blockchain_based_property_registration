import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [accounts, setAccounts] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [registeredWallets, setRegisteredWallets] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const navigate = useNavigate();

  const fetchRegisteredWallets = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/registered-wallets");
      setRegisteredWallets(response.data.map(addr => addr.toLowerCase()));
    } catch (err) {
      console.error("Error fetching registered wallets", err);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccounts(accs);
      setWalletAddress(accs[0]);
      fetchRegisteredWallets();
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accs) => {
        setAccounts(accs);
        setWalletAddress(accs[0] || "");
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const handleRoleChange = (e) => {
    const value = e.target.value;
    let updatedRoles = [...selectedRoles];

    if (updatedRoles.includes(value)) {
      updatedRoles = updatedRoles.filter((role) => role !== value);
    } else {
      updatedRoles.push(value);
    }

    setSelectedRoles(updatedRoles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your wallet.");
      return;
    }

    if (registeredWallets.includes(walletAddress.toLowerCase())) {
      alert("This wallet is already registered. Please use another.");
      return;
    }

    if (selectedRoles.length === 0) {
      alert("Please select at least one role.");
      return;
    }

    try {
      await axios.post("http://localhost:8082/api/register", {
        username,
        email,
        walletAddress,
        roles: selectedRoles,
      });

      alert("Registration successful!");

      if (selectedRoles.length === 1) {
        navigate(`/${selectedRoles[0].toLowerCase()}`);
      } else if (
        selectedRoles.includes("BUYER") &&
        selectedRoles.includes("SELLER")
      ) {
        navigate("/select-role", { state: { roles: selectedRoles } });
      } else {
        alert("Unsupported role combination.");
      }
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">🔐 Blockchain Property Registry</h2>

        <button className="connect-btn" onClick={connectWallet}>🔗 Connect Wallet</button>
        <p className="wallet-display">
          <strong>Wallet:</strong> {walletAddress ? walletAddress : "Not Connected"}
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="role-checkboxes">
            <label>
              <input
                type="checkbox"
                value="BUYER"
                checked={selectedRoles.includes("BUYER")}
                onChange={handleRoleChange}
              />
              Buyer
            </label>
            <label>
              <input
                type="checkbox"
                value="SELLER"
                checked={selectedRoles.includes("SELLER")}
                onChange={handleRoleChange}
              />
              Seller
            </label>
          </div>

          <button type="submit" className="register-btn">
            🚀 Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
