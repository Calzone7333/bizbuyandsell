package com.bizbuysell.backend.service;

import com.bizbuysell.backend.dto.AuthenticationResponse;
import com.bizbuysell.backend.dto.LoginRequest;
import com.bizbuysell.backend.dto.RegisterRequest;
import com.bizbuysell.backend.dto.VerificationRequest;
import com.bizbuysell.backend.model.Role;
import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        String otp = generateOtp();
        Role userRole = Role.USER;
        if (request.getRole() != null) {
            try {
                userRole = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                userRole = Role.USER;
            }
        }

        var user = User.builder()
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .otp(otp)
                .enabled(false)
                .build();
        repository.save(user);
        
        // Send OTP email
        try {
            emailService.sendOtpEmail(user.getEmail(), otp);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
        }

        return AuthenticationResponse.builder()
                .email(user.getEmail())
                .build();
    }

    public AuthenticationResponse verifyOtp(VerificationRequest request) {
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp().equals(request.getOtp())) {
            user.setEnabled(true);
            user.setOtp(null);
            repository.save(user);

            // Send Welcome Email
            try {
                emailService.sendWelcomeEmail(user.getEmail());
            } catch (Exception e) {
                System.err.println("Failed to send welcome email: " + e.getMessage());
            }

            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .email(user.getEmail())
                    .role(user.getRole().name())
                    .kycVerified(user.isKycVerified())
                    .build();
        } else {
            throw new RuntimeException("Invalid OTP code");
        }
    }

    public AuthenticationResponse authenticate(LoginRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your OTP.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .kycVerified(user.isKycVerified())
                .build();
    }

    public void forgotPassword(String email) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        
        String otp = generateOtp();
        user.setOtp(otp);
        repository.save(user);
        
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
        }
    }

    public AuthenticationResponse resetPassword(String email, String otp, String newPassword) {
        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP code");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setOtp(null);
        user.setEnabled(true);
        user.setActive(true); // Ensure account is active
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .kycVerified(user.isKycVerified())
                .build();
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }
}
