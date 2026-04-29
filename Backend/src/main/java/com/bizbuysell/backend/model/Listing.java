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

    // 1. Legal Business Name
    private String legalBusinessName;

    // 2. Brand Name
    private String brandName;

    @Builder.Default
    private boolean hideBusinessName = false;

    @Builder.Default
    private boolean hideExactAddress = false;

    // 3. Mode of Business
    private String businessMode; // e.g., Online, Offline, Hybrid

    // 4. Business Category
    private String category;

    // 5. Location
    private String city;
    private String state;
    private String pinCode;

    // 6. Average Daily/Monthly Turnover
    private Double averageDailyTurnover;
    private Double averageMonthlyTurnover;
    private Double annualRevenue;

    // 7. Asking Price
    private Double askingPrice;

    // 8. Value of Business
    private Double businessValue;

    // 9. Rent & Maintenance
    private Double rentAndMaintenance;

    // 10. Asset List
    @Column(columnDefinition = "TEXT")
    private String assetList;

    // 11. Client
    @Column(columnDefinition = "TEXT")
    private String clientBase;

    // 12. GST Number
    private String gstNumber;

    // 13. Company PAN Card
    private String companyPan;

    // 14. Business Licenses
    @Column(columnDefinition = "TEXT")
    private String businessLicenses;

    // 15. Lease Agreement, Security Deposit, Lock-in Period
    @Column(columnDefinition = "TEXT")
    private String leaseAgreementUrl;
    private Double securityDeposit;
    private String lockInPeriod;

    // Statutory Documents
    @Column(columnDefinition = "TEXT")
    private String panImageUrl;
    @Column(columnDefinition = "TEXT")
    private String coiUrl;
    @Column(columnDefinition = "TEXT")
    private String moaUrl;
    @Column(columnDefinition = "TEXT")
    private String aoaUrl;
    @Column(columnDefinition = "TEXT")
    private String financialsUrl;
    @Column(columnDefinition = "TEXT")
    private String gstCertUrl;

    // 16. Clear Photos (already handled by imageUrls)
    @ElementCollection
    private List<String> imageUrls;

    // 17. Compelling Description(Reason)
    @Column(columnDefinition = "TEXT")
    private String description;

    // 18. Contact
    private String contactNumber;
    private String contactEmail;

    // 19. Physical (SQFT)
    private Double physicalSqft;

    // 20. Growth Opportunities
    @Column(columnDefinition = "TEXT")
    private String growthOpportunities;

    // Verification Status
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    private boolean financialStatementChecked;
    private boolean gstBankValidated;
    private boolean profitVerified;
    private boolean identityVerified;

    @Column(columnDefinition = "TEXT")
    private String caAuditSummary;
    @Column(columnDefinition = "TEXT")
    private String verificationReportUrl;

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
