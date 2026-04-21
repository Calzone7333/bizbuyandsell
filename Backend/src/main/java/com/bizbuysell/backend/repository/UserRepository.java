package com.bizbuysell.backend.repository;

import com.bizbuysell.backend.model.Role;
import com.bizbuysell.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(Role role);
}
