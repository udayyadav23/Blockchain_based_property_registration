# 🏠 Blockchain-Based Property Registration - Frontend & Backend

This is a decentralized property registration and transfer system built using **Ethereum blockchain**, **Ethers.js**, **Spring Boot**, **MongoDB**, and **IPFS**.  
It allows secure, transparent, and immutable property transactions with distinct user roles: **Buyer**, **Seller**, and **Verifier**.

# 📌 Description

Blockchain-Based Property Registration is a decentralized web application that leverages blockchain technology to make property transactions transparent, secure, and tamper-proof.
In traditional property registration systems, records are stored in centralized databases, making them prone to fraud, forgery, and unauthorized changes. This project solves these issues by storing ownership details, transaction history, and verification records on the Ethereum blockchain, ensuring immutability and public verifiability.

The system introduces three user roles:

Seller – Registers properties, uploads related documents to IPFS, and lists them for sale after verification.

Verifier (Government Authority) – Validates property details and approves or rejects registrations.

Buyer – Views verified properties, sends purchase requests, makes secure Ether payments, and receives proof of ownership.

Documents such as property deeds and verification certificates are stored decentrally on IPFS with only their content hashes recorded on-chain. This ensures the data is accessible but cannot be altered.

By integrating Ethers.js with a React frontend and Spring Boot backend, the platform provides a seamless, role-based property registration and transfer workflow. MongoDB Atlas is used for storing additional metadata and user authentication details, while the blockchain handles ownership proof and transaction finality.

This approach eliminates middlemen, reduces the risk of fraud, and makes the entire property transfer process trustless, transparent, and globally accessible.

# 🚀 Execution Process for Blockchain-Based Property Registration
# 1️⃣ Start Ganache

Open Ganache (GUI or CLI).

Create a New Workspace or use Quickstart.

Copy the RPC Server URL (e.g., HTTP://127.0.0.1:7545).

Note down private keys or account addresses — you’ll need them for MetaMask.

# 2️⃣ Connect MetaMask to Ganache

Open MetaMask → Go to Settings → Networks → Add Network.

Enter:

Network Name: Ganache Local

New RPC URL: HTTP://127.0.0.1:7545

Chain ID: 1337 (or as shown in Ganache)

Currency Symbol: ETH

Import Ganache accounts into MetaMask:

Click Import Account.

Paste private key from Ganache.

# 3️⃣ Deploy Smart Contract using Remix IDE

Open Remix IDE.

Upload your Land.sol contract.

Compile the contract (Solidity Compiler → Select version → Compile).

Deploy:

Go to Deploy & Run Transactions.

Environment: Injected Web3 (to use MetaMask & Ganache).

Select account from MetaMask.

Deploy the contract.

Copy the contract address and ABI.

# 4️⃣ Setup IPFS for Document Storage

Install IPFS Desktop or use Infura IPFS.

If using Infura:

Create a project → Copy Project ID & Secret Key.

Use these in your backend for file uploads.

Test by uploading a file and retrieving it via IPFS gateway (https://ipfs.io/ipfs/<hash>).

# 5️⃣ Configure Spring Boot Backend

Open your backend project.

Add:

Ganache RPC URL

Smart contract ABI & address

Infura IPFS credentials

Start backend:

mvn spring-boot:run

# 6️⃣ Run React Frontend

Open your React project folder.

Install dependencies:

npm install


Create .env with:

REACT_APP_CONTRACT_ADDRESS=<your_contract_address>
REACT_APP_CONTRACT_ABI=<your_contract_abi>
REACT_APP_BACKEND_URL=http://localhost:8080


Start frontend:

npm run dev

# 7️⃣ Workflow in the Application

Seller → Registers property → Uploads documents → Files go to IPFS → Metadata + hash stored on Blockchain.

Verifier → Approves property → Becomes visible to Buyers.

Buyer → Sends request → Seller approves → Buyer pays via MetaMask → Ownership transferred on-chain.

# 8️⃣ Testing the Full Flow

Use different MetaMask accounts for Buyer, Seller, and Verifier.

Check transactions in Ganache’s block explorer.

Verify document retrieval from IPFS gateway.

Confirm property ownership change in the blockchain via Remix contract functions.
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
