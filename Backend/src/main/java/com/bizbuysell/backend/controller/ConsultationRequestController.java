package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.model.ConsultationRequest;
import com.bizbuysell.backend.model.User;
import com.bizbuysell.backend.repository.ConsultationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@RequiredArgsConstructor
public class ConsultationRequestController {

    private final ConsultationRequestRepository repository;

    @PostMapping("/book")
    public ResponseEntity<ConsultationRequest> bookConsultation(
            @RequestBody ConsultationRequest request,
            @AuthenticationPrincipal User user) {
        request.setRequester(user);
        return ResponseEntity.ok(repository.save(request));
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<ConsultationRequest>> getMyRequests(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(repository.findByRequesterId(user.getId()));
    }
}
