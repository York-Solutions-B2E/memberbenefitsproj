package com.yorksolutions.memberbenefitsprojbe.entity;

import com.yorksolutions.memberbenefitsprojbe.enums.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClaimStatusEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claim_id")
    private Claim claim;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private OffsetDateTime occurredAt;
    private String note; // optional
}
