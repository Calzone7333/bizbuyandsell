package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.dto.AuthenticationResponse;
import com.bizbuysell.backend.dto.LoginRequest;
import com.bizbuysell.backend.dto.RegisterRequest;
import com.bizbuysell.backend.dto.GoogleLoginRequest;
import com.bizbuysell.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthenticationResponse> verify(@RequestBody com.bizbuysell.backend.dto.VerificationRequest request) {
        return ResponseEntity.ok(service.verifyOtp(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody com.bizbuysell.backend.dto.ForgotPasswordRequest request) {
        service.forgotPassword(request.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthenticationResponse> resetPassword(@RequestBody com.bizbuysell.backend.dto.ResetPasswordRequest request) {
        return ResponseEntity.ok(service.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword()));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthenticationResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        return ResponseEntity.ok(service.googleLogin(request.getToken()));
    }
}
