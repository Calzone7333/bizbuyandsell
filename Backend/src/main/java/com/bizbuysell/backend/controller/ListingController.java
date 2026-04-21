package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.dto.ListingResponseDTO;
import com.bizbuysell.backend.model.Listing;
import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.service.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping
    @PreAuthorize("hasAnyRole('SELLER', 'ADMIN')")
    public ResponseEntity<Listing> createListing(
            @RequestBody Listing listing,
            @AuthenticationPrincipal User seller) {
        return ResponseEntity.ok(listingService.createListing(listing, seller));
    }

    @GetMapping
    public ResponseEntity<List<ListingResponseDTO>> getAllListings(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(listingService.getAllPublicListings(currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDTO> getListing(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(listingService.getListingDetails(id, currentUser));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ListingResponseDTO>> getListingsByCategory(
            @PathVariable String category,
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(listingService.getListingsByCategory(category, currentUser));
    }

    @PostMapping("/{id}/verify")
    @PreAuthorize("hasAnyRole('ADMIN', 'CA_EXPERT')")
    public ResponseEntity<Listing> verifyListing(
            @PathVariable Long id,
            @RequestParam boolean financials,
            @RequestParam boolean gst,
            @RequestParam boolean profit,
            @RequestParam boolean identity,
            @RequestBody String summary) {
        return ResponseEntity.ok(listingService.verifyListing(id, financials, gst, profit, identity, summary));
    }

    @GetMapping("/calculate-valuation")
    public ResponseEntity<Double> calculateValuation(
            @RequestParam Double netProfit,
            @RequestParam Double assetsValue) {
        return ResponseEntity.ok(listingService.calculateEstimatedValue(netProfit, assetsValue));
    }
}
