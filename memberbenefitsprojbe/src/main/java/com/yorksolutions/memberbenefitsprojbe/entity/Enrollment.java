package com.yorksolutions.memberbenefitsprojbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "plan_id")
    private Plan plan;

    private LocalDate coverageStart;
    private LocalDate coverageEnd;
    private Boolean active;

    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Accumulator> accumulators;

    // Add plan year, coverage type, etc. as needed
}
