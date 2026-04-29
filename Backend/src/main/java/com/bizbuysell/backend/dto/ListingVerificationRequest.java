package com.bizbuysell.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListingVerificationRequest {
    private boolean financials;
    private boolean gst;
    private boolean profit;
    private boolean identity;
    private String summary;
}
