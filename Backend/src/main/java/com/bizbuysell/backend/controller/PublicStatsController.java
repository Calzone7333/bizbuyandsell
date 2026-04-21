package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.model.Role;
import com.bizbuysell.backend.model.VerificationStatus;
import com.bizbuysell.backend.repository.ListingRepository;
import com.bizbuysell.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public/stats")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicStatsController {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPlatformStats(
            @RequestHeader(value = "X-Bizbuysell-Request", required = false) String requestHeader) {
        
        if (requestHeader == null || !requestHeader.equals("true")) {
            return ResponseEntity.status(403).build();
        }
        
        long activeListings = listingRepository.count();
        long verifiedAdvisors = userRepository.countByRole(Role.CA_EXPERT) + userRepository.countByRole(Role.ADMIN);
        long verifiedClosures = listingRepository.countByVerificationStatus(VerificationStatus.VERIFIED);
        Double volume = listingRepository.sumAskingPriceOfVerifiedListings();
        
        // Use a baseline volume of $4.2B as requested/shown in UI if volume is null
        double transactionVolume = (volume != null ? volume : 4200000000.0);

        return ResponseEntity.ok(Map.of(
            "activeListings", activeListings,
            "verifiedAdvisors", verifiedAdvisors,
            "verifiedClosures", verifiedClosures,
            "transactionVolume", transactionVolume
        ));
    }
}
