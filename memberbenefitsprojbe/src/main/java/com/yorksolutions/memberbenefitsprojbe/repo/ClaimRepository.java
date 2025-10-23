package com.yorksolutions.memberbenefitsprojbe.repo;

import com.yorksolutions.memberbenefitsprojbe.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClaimRepository extends JpaRepository<Claim, UUID> {
}
