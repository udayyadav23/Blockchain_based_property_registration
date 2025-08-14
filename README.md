# 🏠 Blockchain-Based Property Registration - Frontend & Backend

This is a decentralized property registration and transfer system built using **Ethereum blockchain**, **Ethers.js**, **Spring Boot**, **MongoDB**, and **IPFS**.  
It allows secure, transparent, and immutable property transactions with distinct user roles: **Buyer**, **Seller**, and **Verifier**.

---

## 🚀 Features

### 🔐 Role-Based Access
- Buyer: View verified properties, send purchase requests, make payments, and receive documents.
- Seller: Register properties, upload documents, list for sale, approve requests, and transfer ownership.
- Verifier: Verify or reject property registrations.

### 📜 Blockchain-Powered
- On-chain property registration & verification
- Immutable transaction history
- Ether-based secure payments

### 📂 Document Storage
- IPFS integration for decentralized file storage  
- Upload property-related documents and store their IPFS hashes on-chain

### 💳 MetaMask Integration
- Ethers.js-based wallet connection
- Transaction signing & payment handling

### 🎨 Modern UI
- React-based responsive design
- Separate dashboards for Buyers, Sellers, and Verifiers

---

## 🛠️ Tech Stack

| Layer        | Tech Used |
|--------------|-----------|
| Blockchain   | Ethereum (Ganache / Sepolia via Infura) |
| Smart Contract | Solidity |
| Frontend     | React.js + Ethers.js + MetaMask |
| Backend      | Spring Boot (Java) |
| Database     | MongoDB Atlas |
| File Storage | IPFS |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/blockchain-property-registration.git
cd blockchain-property-registration
