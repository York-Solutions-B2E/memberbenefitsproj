package com.yorksolutions.memberbenefitsprojbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yorksolutions.memberbenefitsprojbe.enums.AccumulatorType;
import com.yorksolutions.memberbenefitsprojbe.enums.NetworkTier;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accumulator {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(nullable = false, name = "enrollment_id")
    private Enrollment enrollment;

    @Enumerated(EnumType.STRING)
    private AccumulatorType type; // DEDUCTIBLE or OOP_MAX

    @Enumerated(EnumType.STRING)
    private NetworkTier tier; // IN_NETWORK or OUT_OF_NETWORK

    private BigDecimal limitAmount;   // e.g., 1500.00
    private BigDecimal usedAmount;    // e.g., 300.00
}

