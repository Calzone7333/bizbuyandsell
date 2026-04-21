package com.bizbuysell.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String password;

    private String otp;

    private String firstName;
    private String lastName;
    private String jobTitle;
    @Column(length = 2000)
    private String bio;
    private String location;

    @Builder.Default
    private boolean enabled = false;

    @Builder.Default
    private boolean active = true;

    private java.time.LocalDateTime deletionRequestedAt;

    // Notification Preferences
    @Builder.Default
    private boolean emailNotifications = true;
    @Builder.Default
    private boolean pushNotifications = false;

    @Enumerated(EnumType.STRING)
    private Role role;

    // KYC / Identity Verification
    @Builder.Default
    private boolean kycVerified = false;
    private String idProofType; // e.g., PAN, Aadhar, Passport
    private String idProofUrl;
    private String gstNumber; // For sellers
    private String companyName;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled && active;
    }
}
