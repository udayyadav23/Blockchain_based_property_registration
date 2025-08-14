package com.backend.MainProject.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "properties")
public class Property {

    @Id
    private String id;

    private String surveyNumber;
    private double area;
    private String location;
    private String city;
    private String state;
    private double price;
    private String type;

    private String documentCID;   // CID from IPFS
    private String ownerWallet; // Wallet address
    private String txHash;        // Blockchain transaction hash
    private boolean onChain;      // True if recorded on-chain

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSurveyNumber() {
        return surveyNumber;
    }

    public void setSurveyNumber(String surveyNumber) {
        this.surveyNumber = surveyNumber;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDocumentCID() {
        return documentCID;
    }

    public void setDocumentCID(String documentCID) {
        this.documentCID = documentCID;
    }

    public String getOwnerWallet() {
        return ownerWallet;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public String getTxHash() {
        return txHash;
    }

    public void setTxHash(String txHash) {
        this.txHash = txHash;
    }

    public boolean isOnChain() {
        return onChain;
    }

    public void setOnChain(boolean onChain) {
        this.onChain = onChain;
    }
}
