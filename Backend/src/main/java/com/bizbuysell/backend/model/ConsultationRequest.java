package com.bizbuysell.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "consultation_requests")
public class ConsultationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "ca_expert_id")
    private User caExpert;

    @ManyToOne
    @JoinColumn(name = "listing_id")
    private Listing listing;

    private String preferredTime;
    private String message;
    
    @Builder.Default
    private String status = "PENDING"; // PENDING, SCHEDULED, COMPLETED, CANCELLED
    
    private LocalDateTime requestedAt;

    @PrePersist
    protected void onCreate() {
        requestedAt = LocalDateTime.now();
    }
}
