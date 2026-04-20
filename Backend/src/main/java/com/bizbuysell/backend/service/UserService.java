package com.bizbuysell.backend.service;

import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateProfile(String email, User profileUpdates) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setFirstName(profileUpdates.getFirstName());
        user.setLastName(profileUpdates.getLastName());
        user.setJobTitle(profileUpdates.getJobTitle());
        user.setBio(profileUpdates.getBio());
        user.setLocation(profileUpdates.getLocation());
        user.setPhone(profileUpdates.getPhone());
        user.setEmailNotifications(profileUpdates.isEmailNotifications());
        user.setPushNotifications(profileUpdates.isPushNotifications());
        
        return userRepository.save(user);
    }

    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Original password does not match");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword)); 
        userRepository.save(user);
    }

    public void softDelete(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setActive(false);
        user.setDeletionRequestedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public void reactive(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getDeletionRequestedAt() != null && 
            user.getDeletionRequestedAt().plusDays(30).isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Account cannot be recovered after 30 days");
        }
        
        user.setActive(true);
        user.setDeletionRequestedAt(null);
        userRepository.save(user);
    }
}
