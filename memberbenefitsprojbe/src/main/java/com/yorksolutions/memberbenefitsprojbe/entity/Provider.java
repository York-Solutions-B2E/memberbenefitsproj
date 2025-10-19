package com.yorksolutions.memberbenefitsprojbe.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String specialty;

    @Embedded
    private Address address;

    private String phone;
}
