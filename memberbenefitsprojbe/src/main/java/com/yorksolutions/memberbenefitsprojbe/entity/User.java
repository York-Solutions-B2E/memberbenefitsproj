package com.yorksolutions.memberbenefitsprojbe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
// user table not showing up in db had to rename
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String authProvider; // e.g., "google", "okta"
    private String authSub;      // OIDC subject ("sub"), unique per provider
    private String email;        // from ID token

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    //    @JsonIgnore
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Member> members = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(nullable = false, name = "user_id")
    private List<Member> members;

    @PrePersist
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}
