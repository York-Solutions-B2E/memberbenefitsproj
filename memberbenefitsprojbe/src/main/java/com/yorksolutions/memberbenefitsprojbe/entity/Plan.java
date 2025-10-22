package com.yorksolutions.memberbenefitsprojbe.entity;

import com.yorksolutions.memberbenefitsprojbe.enums.PlanType;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name; // e.g., "Gold PPO"

    @Enumerated(EnumType.STRING)
    private PlanType type; // e.g., PPO/HMO/...

    private String networkName; // e.g., "Prime"

    private Integer planYear; // e.g., 2025

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> accumulators;
}