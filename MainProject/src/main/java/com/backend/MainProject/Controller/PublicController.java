package com.backend.MainProject.Controller;

import com.backend.MainProject.Model.LoginRequestDTO;
import com.backend.MainProject.Model.User;
import com.backend.MainProject.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")

public class PublicController {

    @Autowired
    private UserService userService;
    
    
    

    // ✅ Register user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            boolean exists = userService.isWalletRegistered(user.getWalletAddress());

            if (exists) {
                return ResponseEntity.status(409).body("❌ Wallet address already registered.");
            }

            User saved = userService.registerUser(user);
            return ResponseEntity.ok("✅ User registered successfully with wallet: " + saved.getWalletAddress());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("🚨 Internal error: " + e.getMessage());
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        try {
            Optional<User> optionalUser = userService.getUserByWalletAndUsername(
                loginRequest.getWalletAddress(),
                loginRequest.getUsername()
            );

            if (optionalUser.isPresent()) {
                return ResponseEntity.ok(optionalUser.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid wallet address or username.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Login error: " + e.getMessage());
        }
    }


    // ✅ Get all registered wallet addresses
    @GetMapping("/registered-wallets")
    public ResponseEntity<?> getAllWallets() {
        try {
            List<String> wallets = userService.getAllWallets();
            return ResponseEntity.ok(wallets);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("🚨 Could not fetch wallets: " + e.getMessage());
        }
    }
}
