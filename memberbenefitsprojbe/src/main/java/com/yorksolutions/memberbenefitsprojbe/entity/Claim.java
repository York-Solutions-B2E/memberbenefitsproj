package com.yorksolutions.memberbenefitsprojbe.entity;

import com.yorksolutions.memberbenefitsprojbe.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String claimNumber; // human-friendly key for UI
    private UUID memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private Provider provider;

    private LocalDate serviceStartDate;
    private LocalDate serviceEndDate;
    private LocalDate receivedDate;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private BigDecimal totalBilled;
    private BigDecimal totalAllowed;
    private BigDecimal totalPlanPaid;
    private BigDecimal totalMemberResponsibility;

    @OneToMany(mappedBy = "claim", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClaimLine> lines = new ArrayList<>();

    @OneToMany(mappedBy = "claim", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClaimStatusEvent> statusHistory = new ArrayList<>();

    private OffsetDateTime updatedAt;
}
