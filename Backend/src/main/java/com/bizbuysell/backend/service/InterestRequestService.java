package com.bizbuysell.backend.service;

import com.bizbuysell.backend.model.*;
import com.bizbuysell.backend.repository.InterestRequestRepository;
import com.bizbuysell.backend.repository.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterestRequestService {

    private final InterestRequestRepository interestRequestRepository;
    private final ListingRepository listingRepository;

    public InterestRequest createRequest(Long listingId, User buyer, String message) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
        
        // Security Protocol: institutional grade listings require verified identities
        if (listing.getVerificationStatus() == VerificationStatus.VERIFIED && !buyer.isKycVerified()) {
            throw new RuntimeException("Security Protocol: You must complete your KYC verification to request detail access for CA-Verified institutional listings.");
        }

        InterestRequest request = InterestRequest.builder()
                .listing(listing)
                .buyer(buyer)
                .message(message)
                .status(RequestStatus.PENDING)
                .build();
        
        return interestRequestRepository.save(request);
    }

    public InterestRequest respondToRequest(Long requestId, RequestStatus status, User seller) {
        InterestRequest request = interestRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        
        if (!request.getListing().getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("Unauthorized: You are not the seller of this listing");
        }
        
        request.setStatus(status);
        request.setRespondedAt(LocalDateTime.now());
        
        return interestRequestRepository.save(request);
    }

    public List<InterestRequest> getRequestsForSeller(Long sellerId) {
        return interestRequestRepository.findByListingSellerId(sellerId);
    }

    public List<InterestRequest> getRequestsForBuyer(Long buyerId) {
        return interestRequestRepository.findByBuyerId(buyerId);
    }
}
