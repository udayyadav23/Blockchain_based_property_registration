# 🏠 Blockchain-Based Property Registration - Frontend & Backend

This is a decentralized property registration and transfer system built using **Ethereum blockchain**, **Ethers.js**, **Spring Boot**, **MongoDB**, and **IPFS**.  
It allows secure, transparent, and immutable property transactions with distinct user roles: **Buyer**, **Seller**, and **Verifier**.

📌 Description

Blockchain-Based Property Registration is a decentralized web application that leverages blockchain technology to make property transactions transparent, secure, and tamper-proof.
In traditional property registration systems, records are stored in centralized databases, making them prone to fraud, forgery, and unauthorized changes. This project solves these issues by storing ownership details, transaction history, and verification records on the Ethereum blockchain, ensuring immutability and public verifiability.

The system introduces three user roles:

Seller – Registers properties, uploads related documents to IPFS, and lists them for sale after verification.

Verifier (Government Authority) – Validates property details and approves or rejects registrations.

Buyer – Views verified properties, sends purchase requests, makes secure Ether payments, and receives proof of ownership.

Documents such as property deeds and verification certificates are stored decentrally on IPFS with only their content hashes recorded on-chain. This ensures the data is accessible but cannot be altered.

By integrating Ethers.js with a React frontend and Spring Boot backend, the platform provides a seamless, role-based property registration and transfer workflow. MongoDB Atlas is used for storing additional metadata and user authentication details, while the blockchain handles ownership proof and transaction finality.

This approach eliminates middlemen, reduces the risk of fraud, and makes the entire property transfer process trustless, transparent, and globally accessible.
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
