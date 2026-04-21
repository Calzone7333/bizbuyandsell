package com.bizbuysell.backend.repository;

import com.bizbuysell.backend.model.ConsultationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Long> {
    List<ConsultationRequest> findByRequesterId(Long requesterId);
    List<ConsultationRequest> findByCaExpertId(Long caExpertId);
}
