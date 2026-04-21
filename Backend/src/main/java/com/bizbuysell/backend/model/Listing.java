package com.bizbuysell.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "listings")
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private String title;
    @Column(length = 2000)
    private String description;
    
    // Identity Masking: By default, hide the Business Name and exact Address from public view.
    private String businessName; 
    private String exactAddress; 
    private String city;
    private String state;
    
    @Builder.Default
    private boolean hideBusinessName = true;
    @Builder.Default
    private boolean hideExactAddress = true;

    // Financials for Valuation and listing
    private Double askingPrice;
    private Double annualRevenue;
    private Double netProfit;
    private Double assetsValue;
    
    // Franchise & Investment categories
    private String category; // e.g., "Business", "Franchise", "Startup Investment"
    
    // Verification Status
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    // Verification Checklist: (1) Financial Statement Check, (2) GST/Bank Validation, (3) Basic Profit Verification, and (4) Business Identity.
    private boolean financialStatementChecked;
    private boolean gstBankValidated;
    private boolean profitVerified;
    private boolean identityVerified;
    
    @Column(length = 2000)
    private String caAuditSummary;
    private String verificationReportUrl;

    @ElementCollection
    private List<String> imageUrls;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
