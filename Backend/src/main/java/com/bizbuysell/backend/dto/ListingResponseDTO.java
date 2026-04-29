package com.bizbuysell.backend.dto;

import com.bizbuysell.backend.model.VerificationStatus;
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
public class ListingResponseDTO {
    private Long id;
    private Long sellerId;
    private String title;
    private String description;

    // Privacy Logic: These will be null if the buyer is not approved
    private String legalBusinessName;
    private String brandName;
    private boolean hideBusinessName;
    private boolean hideExactAddress;
    private String gstNumber;
    private String companyPan;
    private String businessLicenses;
    private String contactNumber;
    private String contactEmail;

    private String businessMode;
    private String city;
    private String state;
    private String pinCode;

    private Double askingPrice;
    private Double averageDailyTurnover;
    private Double averageMonthlyTurnover;
    private Double annualRevenue;
    private Double businessValue;
    private Double rentAndMaintenance;
    private Double physicalSqft;

    private String assetList;
    private String clientBase;
    private String leaseAgreementUrl;
    private Double securityDeposit;
    private String lockInPeriod;
    private String growthOpportunities;

    private String category;

    private VerificationStatus verificationStatus;
    private boolean isVerified; // For "CA-Verified" badge logic

    private boolean financialStatementChecked;
    private boolean gstBankValidated;
    private boolean profitVerified;
    private boolean identityVerified;

    private String caAuditSummary;
    private String verificationReportUrl;

    private List<String> imageUrls;
    private String panImageUrl;
    private String coiUrl;
    private String moaUrl;
    private String aoaUrl;
    private String financialsUrl;
    private String gstCertUrl;
    private LocalDateTime createdAt;

    private boolean accessApproved; // Whether the current user has access to private details
}
