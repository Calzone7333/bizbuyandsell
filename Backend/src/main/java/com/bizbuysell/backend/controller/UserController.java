package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@AuthenticationPrincipal User user, @RequestBody User profileUpdates) {
        return ResponseEntity.ok(userService.updateProfile(user.getEmail(), profileUpdates));
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal User user, @RequestBody Map<String, String> request) {
        try {
            userService.changePassword(user.getEmail(), request.get("oldPassword"), request.get("newPassword"));
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/soft-delete")
    public ResponseEntity<?> softDelete(@AuthenticationPrincipal User user) {
        userService.softDelete(user.getEmail());
        return ResponseEntity.ok(Map.of("message", "Account deactivated. You can recover it within 30 days."));
    }

    @PostMapping("/reactivate")
    public ResponseEntity<?> reactivate(@RequestBody Map<String, String> request) {
        try {
            userService.reactive(request.get("email"));
            return ResponseEntity.ok(Map.of("message", "Account reactivated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
