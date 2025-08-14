package com.backend.MainProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.MainProject.Model.User;
import com.backend.MainProject.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean isWalletRegistered(String walletAddress) {
        return userRepository.findByWalletAddressIgnoreCase(walletAddress) != null;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByWallet(String walletAddress) {
        return userRepository.findByWalletAddressIgnoreCase(walletAddress);
    }

    public List<String> getAllWallets() {
        return userRepository.findAll()
                .stream()
                .map(u -> u.getWalletAddress())
                .toList();
    }
    
    public Optional<User> getUserByWalletAndUsername(String walletAddress, String username) {
        return userRepository.findByWalletAddressAndUsernameIgnoreCase(
            walletAddress.toLowerCase(),
            username.toLowerCase()
        );
    }

    
}
