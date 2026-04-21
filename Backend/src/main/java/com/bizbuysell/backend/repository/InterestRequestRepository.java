package com.bizbuysell.backend.repository;

import com.bizbuysell.backend.model.InterestRequest;
import com.bizbuysell.backend.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRequestRepository extends JpaRepository<InterestRequest, Long> {
    List<InterestRequest> findByListingId(Long listingId);
    List<InterestRequest> findByBuyerId(Long buyerId);
    List<InterestRequest> findByListingSellerId(Long sellerId);
    List<InterestRequest> findByBuyerIdAndStatus(Long buyerId, RequestStatus status);
}
