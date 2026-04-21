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
@Table(name = "interest_requests")
public class InterestRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private RequestStatus status = RequestStatus.PENDING;

    @Column(length = 1000)
    private String message;
    
    private LocalDateTime requestedAt;
    private LocalDateTime respondedAt;

    @PrePersist
    protected void onCreate() {
        requestedAt = LocalDateTime.now();
    }
}
