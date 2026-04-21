package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.model.InterestRequest;
import com.bizbuysell.backend.model.RequestStatus;
import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.service.InterestRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interest")
@RequiredArgsConstructor
public class InterestRequestController {

    private final InterestRequestService interestRequestService;

    @PostMapping("/request/{listingId}")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<InterestRequest> requestAccess(
            @PathVariable Long listingId,
            @AuthenticationPrincipal User buyer,
            @RequestBody(required = false) String message) {
        return ResponseEntity.ok(interestRequestService.createRequest(listingId, buyer, message));
    }

    @PutMapping("/{requestId}/respond")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<InterestRequest> respondToRequest(
            @PathVariable Long requestId,
            @RequestParam RequestStatus status,
            @AuthenticationPrincipal User seller) {
        return ResponseEntity.ok(interestRequestService.respondToRequest(requestId, status, seller));
    }

    @GetMapping("/seller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<InterestRequest>> getMyReceivedRequests(
            @AuthenticationPrincipal User seller) {
        return ResponseEntity.ok(interestRequestService.getRequestsForSeller(seller.getId()));
    }

    @GetMapping("/buyer")
    @PreAuthorize("hasRole('BUYER')")
    public ResponseEntity<List<InterestRequest>> getMySentRequests(
            @AuthenticationPrincipal User buyer) {
        return ResponseEntity.ok(interestRequestService.getRequestsForBuyer(buyer.getId()));
    }
}
