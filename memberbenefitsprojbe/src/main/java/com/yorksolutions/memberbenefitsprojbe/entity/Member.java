package com.yorksolutions.memberbenefitsprojbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

//    @Column(nullable = false)
//    private UUID userId; // FK to User (can also be a @ManyToOne)
//    similar coding but bottom one provide a relationship e.g. FK === id of user table

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(nullable = false, name = "user_id")
//    private User user;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth; // yyyy-mm-dd

    private String email; // optional
    private String phone; // optional

    @Embedded
    private Address mailingAddress;

    @JsonManagedReference
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments; // one active per plan year

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Claim> claims;
}
