package com.backend.MainProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.MainProject.Model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByWalletAddressIgnoreCase(String walletAddress);
    Optional<User> findByWalletAddressAndUsernameIgnoreCase(String walletAddress, String username);
}
