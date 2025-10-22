package com.yorksolutions.memberbenefitsprojbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "claim_id")
    private Claim claim;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private OffsetDateTime occurredAt;

    @PrePersist
    public void prePersist() {
        this.occurredAt = OffsetDateTime.now();
    }
    private String note; // optional
}
