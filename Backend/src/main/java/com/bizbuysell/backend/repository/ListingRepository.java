package com.bizbuysell.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bizbuysell.backend.model.Listing;
import com.bizbuysell.backend.model.VerificationStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {
    List<Listing> findBySellerId(Long sellerId);
    List<Listing> findByVerificationStatus(VerificationStatus status);
    List<Listing> findByCategory(String category);
    long countByVerificationStatus(VerificationStatus status);
    boolean existsByLegalBusinessName(String legalBusinessName);
    
    @Query("SELECT SUM(l.askingPrice) FROM Listing l WHERE l.verificationStatus = 'VERIFIED'")
    Double sumAskingPriceOfVerifiedListings();
}
