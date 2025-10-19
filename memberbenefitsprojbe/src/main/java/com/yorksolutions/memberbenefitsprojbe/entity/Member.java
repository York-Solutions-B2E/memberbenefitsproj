package com.yorksolutions.memberbenefitsprojbe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID userId; // FK to User (can also be a @ManyToOne)

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    private String email; // optional
    private String phone; // optional

    @Embedded
    private Address mailingAddress;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments; // one active per plan year
}
