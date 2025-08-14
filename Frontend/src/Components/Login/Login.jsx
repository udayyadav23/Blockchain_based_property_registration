// src/Components/Login/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [walletAddress, setWalletAddress] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accs[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!walletAddress || !username) {
      alert("Please connect wallet and enter username.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8082/api/user/login", {
        walletAddress,
        username,
      });
       console.log(res);
      const user = res.data;

      if (!user || user.username !== username) {
        setError("Wallet address and username do not match.");
        return;
      }

      const roles = user.roles;

      if (roles.length === 1) {
        navigate(`/${roles[0].toLowerCase()}`);
      } else if (roles.includes("BUYER") && roles.includes("SELLER")) {
        navigate("/select-role", { state: { roles } });
      } else {
        setError("Unsupported role combination.");
      }
    } catch (err) {
      setError("Login failed. Make sure you're registered.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🔑 Login to Property Registry</h2>

        <button className="connect-btn" onClick={connectWallet}>
          🔗 Connect Wallet
        </button>
        <p className="wallet-display">
          {walletAddress ? walletAddress : "Wallet not connected"}
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="👤 Enter Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <button type="submit" className="login-btn">
            🚀 Login
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
