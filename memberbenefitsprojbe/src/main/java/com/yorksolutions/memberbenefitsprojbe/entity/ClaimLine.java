package com.yorksolutions.memberbenefitsprojbe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClaimLine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claim_id")
    private Claim claim;

    private Integer lineNumber;    // 1..n
    private String cptCode;        // e.g., "99213"
    private String description;

    private BigDecimal billedAmount;
    private BigDecimal allowedAmount;
    private BigDecimal deductibleApplied;
    private BigDecimal copayApplied;
    private BigDecimal coinsuranceApplied;
    private BigDecimal planPaid;
    private BigDecimal memberResponsibility;
}
