package com.yorksolutions.memberbenefitsprojbe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // Add plan year, coverage type, etc. as needed
}
