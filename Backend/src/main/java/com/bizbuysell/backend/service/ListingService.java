package com.bizbuysell.backend.service;

import com.bizbuysell.backend.dto.ListingResponseDTO;
import com.bizbuysell.backend.model.*;
import com.bizbuysell.backend.repository.ListingRepository;
import com.bizbuysell.backend.repository.InterestRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final InterestRequestRepository interestRequestRepository;

    public Listing createListing(Listing listing, User seller) {
        listing.setSeller(seller);
        listing.setVerificationStatus(VerificationStatus.PENDING);
        
        // Auto-calculate annual revenue for database storage if not provided
        if (listing.getAverageMonthlyTurnover() != null) {
            listing.setAnnualRevenue(listing.getAverageMonthlyTurnover() * 12);
        }
        
        return listingRepository.save(listing);
    }

    public List<ListingResponseDTO> getAllPublicListings(User currentUser) {
        return listingRepository.findAll().stream()
                .map(listing -> mapToListingResponse(listing, currentUser))
                .collect(Collectors.toList());
    }

    public List<ListingResponseDTO> getListingsByCategory(String category, User currentUser) {
        return listingRepository.findByCategory(category).stream()
                .map(listing -> mapToListingResponse(listing, currentUser))
                .collect(Collectors.toList());
    }

    public ListingResponseDTO getListingDetails(Long id, User currentUser) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        return mapToListingResponse(listing, currentUser);
    }

    private ListingResponseDTO mapToListingResponse(Listing listing, User currentUser) {
        boolean isOwner = currentUser != null && listing.getSeller().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser != null && currentUser.getRole() == Role.ADMIN;
        boolean isCA = currentUser != null && currentUser.getRole() == Role.CA_EXPERT;
        
        boolean isApproved = false;
        if (currentUser != null) {
            isApproved = interestRequestRepository.findByBuyerIdAndStatus(currentUser.getId(), RequestStatus.APPROVED)
                    .stream().anyMatch(req -> req.getListing().getId().equals(listing.getId()));
        }

        boolean hasFullAccess = isOwner || isAdmin || isCA || isApproved;

        return ListingResponseDTO.builder()
                .id(listing.getId())
                .sellerId(listing.getSeller().getId())
                .title(listing.getBrandName() != null ? listing.getBrandName() : "Confidential Listing")
                .description(listing.getDescription())
                .legalBusinessName(hasFullAccess ? listing.getLegalBusinessName() : "**********")
                .brandName(listing.getBrandName())
                .hideBusinessName(listing.isHideBusinessName())
                .hideExactAddress(listing.isHideExactAddress())
                .gstNumber(hasFullAccess ? listing.getGstNumber() : "HIDDEN")
                .companyPan(hasFullAccess ? listing.getCompanyPan() : "HIDDEN")
                .businessLicenses(hasFullAccess ? listing.getBusinessLicenses() : "HIDDEN")
                .contactNumber(hasFullAccess ? listing.getContactNumber() : "HIDDEN")
                .contactEmail(hasFullAccess ? listing.getContactEmail() : "HIDDEN")
                .businessMode(listing.getBusinessMode())
                .city(listing.getCity())
                .state(listing.getState())
                .pinCode(hasFullAccess ? listing.getPinCode() : "****")
                .askingPrice(listing.getAskingPrice())
                .averageDailyTurnover(listing.getAverageDailyTurnover())
                .averageMonthlyTurnover(listing.getAverageMonthlyTurnover())
                .annualRevenue(listing.getAnnualRevenue())
                .businessValue(listing.getBusinessValue())
                .rentAndMaintenance(listing.getRentAndMaintenance())
                .physicalSqft(listing.getPhysicalSqft())
                .assetList(hasFullAccess ? listing.getAssetList() : "Hidden Assets")
                .clientBase(hasFullAccess ? listing.getClientBase() : "Hidden Client Details")
                .leaseAgreementUrl(hasFullAccess ? listing.getLeaseAgreementUrl() : null)
                .securityDeposit(hasFullAccess ? listing.getSecurityDeposit() : null)
                .lockInPeriod(hasFullAccess ? listing.getLockInPeriod() : null)
                .growthOpportunities(listing.getGrowthOpportunities())
                .category(listing.getCategory())
                .verificationStatus(listing.getVerificationStatus())
                .isVerified(listing.getVerificationStatus() == VerificationStatus.VERIFIED)
                .financialStatementChecked(listing.isFinancialStatementChecked())
                .gstBankValidated(listing.isGstBankValidated())
                .profitVerified(listing.isProfitVerified())
                .identityVerified(listing.isIdentityVerified())
                .caAuditSummary(listing.getCaAuditSummary())
                .verificationReportUrl(hasFullAccess ? listing.getVerificationReportUrl() : null)
                .imageUrls(listing.getImageUrls())
                .panImageUrl(hasFullAccess ? listing.getPanImageUrl() : null)
                .coiUrl(hasFullAccess ? listing.getCoiUrl() : null)
                .moaUrl(hasFullAccess ? listing.getMoaUrl() : null)
                .aoaUrl(hasFullAccess ? listing.getAoaUrl() : null)
                .financialsUrl(hasFullAccess ? listing.getFinancialsUrl() : null)
                .gstCertUrl(hasFullAccess ? listing.getGstCertUrl() : null)
                .createdAt(listing.getCreatedAt())
                .accessApproved(hasFullAccess)
                .build();
    }
    
    public Listing verifyListing(Long id, boolean financials, boolean gst, boolean profit, boolean identity, String summary) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        
        listing.setFinancialStatementChecked(financials);
        listing.setGstBankValidated(gst);
        listing.setProfitVerified(profit);
        listing.setIdentityVerified(identity);
        listing.setCaAuditSummary(summary);
        
        if (financials && gst && profit && identity) {
            listing.setVerificationStatus(VerificationStatus.VERIFIED);
        } else {
            listing.setVerificationStatus(VerificationStatus.REJECTED);
        }
        
        return listingRepository.save(listing);
    }

    // Valuation Logic: Multiply Net Profit by a standard multiplier (e.g. 3-5x)
    public Double calculateEstimatedValue(Double netProfit, Double assetsValue) {
        if (netProfit == null) return 0.0;
        double multiplier = 4.0; // Standard multiplier
        return (netProfit * multiplier) + (assetsValue != null ? assetsValue : 0.0);
    }
}
