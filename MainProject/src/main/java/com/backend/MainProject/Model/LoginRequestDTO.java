// src/main/java/com/backend/MainProject/Model/LoginRequestDTO.java
package com.backend.MainProject.Model;

public class LoginRequestDTO {
    private String walletAddress;
    private String username;

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
