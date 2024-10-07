package com.neatstreets.backend.service;

import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.LeaderboardRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LeaderboardService {
    private final LeaderboardRepository leaderboardRepository;

    public LeaderboardService(LeaderboardRepository leaderboardRepository){
        this.leaderboardRepository = leaderboardRepository;
    }

    public ResponseEntity<?> getTopUsersByRole(Role role) {
        return ResponseEntity.ok(leaderboardRepository.findByRoleOrderByPoints(role));
    }

    public ResponseEntity<?> addPointsToUser(UUID userId, int points) {
        User user = leaderboardRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoints(user.getPoints() + points);
        leaderboardRepository.save(user);
        return ResponseEntity.ok("Successfully added point for user " + user.getFullname());
    }
}
