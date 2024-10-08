package com.neatstreets.backend.repository;

import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LeaderboardRepository extends JpaRepository<User, UUID> {
    Optional<List<User>> findByRoleOrderByPointsDesc(Role role);
}
