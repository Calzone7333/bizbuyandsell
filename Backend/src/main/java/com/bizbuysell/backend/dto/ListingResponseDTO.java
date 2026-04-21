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
    private String businessName;
    private String exactAddress;
    
    private String city;
    private String state;
    private Double askingPrice;
    private Double annualRevenue;
    private Double netProfit;
    private Double assetsValue;
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
    private LocalDateTime createdAt;
    
    private boolean accessApproved; // Whether the current user has access to private details
}
